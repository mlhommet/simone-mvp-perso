const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const mysql = require('mysql2/promise');

const PORT = 3456;
const DATA_DIR = __dirname;
const BD = 'C:\\Users\\mlhom\\bin\\bd.exe';

const DOLT_CONFIG = {
  host: '127.0.0.1',
  port: 3307,
  user: 'root',
  database: 'beads_SIMONE-MVP',
};

let pool;
async function getPool() {
  if (!pool) {
    pool = mysql.createPool({ ...DOLT_CONFIG, waitForConnections: true, connectionLimit: 5 });
  }
  return pool;
}

// MIME types for static files
const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
};

function serveStatic(res, filePath) {
  const ext = path.extname(filePath);
  const mime = MIME[ext] || 'application/octet-stream';
  try {
    const content = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': mime });
    res.end(content);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
}

function jsonResponse(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      try { resolve(JSON.parse(body)); } catch { resolve({}); }
    });
  });
}

// ── API: GET all issues ──
async function apiGetIssues(res) {
  try {
    const db = await getPool();
    const [issues] = await db.query(`
      SELECT i.id, i.title, i.description, i.notes, i.status, i.priority,
             i.issue_type, i.close_reason, i.created_at, i.updated_at
      FROM issues i WHERE i.id LIKE 'SIMONE-MVP%'
      ORDER BY i.priority, i.created_at
    `);
    const [labels] = await db.query(`SELECT issue_id, label FROM labels WHERE issue_id LIKE 'SIMONE-MVP%'`);
    const [deps] = await db.query(`SELECT issue_id, depends_on_id, type FROM dependencies WHERE issue_id LIKE 'SIMONE-MVP%'`);

    const labelMap = {};
    for (const l of labels) {
      if (!labelMap[l.issue_id]) labelMap[l.issue_id] = [];
      labelMap[l.issue_id].push(l.label);
    }
    const depMap = {}, parentMap = {};
    for (const d of deps) {
      if (d.type === 'parent-child') {
        parentMap[d.issue_id] = d.depends_on_id;
      } else {
        if (!depMap[d.issue_id]) depMap[d.issue_id] = [];
        depMap[d.issue_id].push({ type: d.type, depends_on_id: d.depends_on_id });
      }
    }

    const result = issues.map(i => ({
      id: i.id, title: i.title, description: i.description || '', notes: i.notes || '',
      status: i.status, priority: i.priority, issue_type: i.issue_type,
      close_reason: i.close_reason || '', created_at: i.created_at, updated_at: i.updated_at,
      labels: labelMap[i.id] || [], parent: parentMap[i.id] || null, dependencies: depMap[i.id] || [],
    }));
    jsonResponse(res, 200, result);
  } catch (err) {
    console.error('GET /api/issues error:', err.message);
    jsonResponse(res, 500, { error: err.message });
  }
}

// ── API: PATCH status ──
async function apiUpdateStatus(res, id, body) {
  const { status, close_reason } = body;
  if (!status) return jsonResponse(res, 400, { error: 'status required' });
  try {
    if (status === 'closed') {
      const reason = (close_reason || 'Closed from dashboard').replace(/"/g, '\\"');
      execSync(`"${BD}" close ${id} --reason "${reason}"`, { cwd: process.cwd(), timeout: 10000 });
    } else {
      execSync(`"${BD}" update ${id} -s ${status}`, { cwd: process.cwd(), timeout: 10000 });
    }
    jsonResponse(res, 200, { ok: true, id, status });
  } catch (err) {
    console.error('PATCH status error:', err.message);
    jsonResponse(res, 500, { error: err.stderr?.toString() || err.message });
  }
}

// ── API: PATCH priority ──
async function apiUpdatePriority(res, id, body) {
  const { priority } = body;
  if (priority == null) return jsonResponse(res, 400, { error: 'priority required' });
  try {
    execSync(`"${BD}" update ${id} -p ${priority}`, { cwd: process.cwd(), timeout: 10000 });
    jsonResponse(res, 200, { ok: true, id, priority });
  } catch (err) {
    console.error('PATCH priority error:', err.message);
    jsonResponse(res, 500, { error: err.stderr?.toString() || err.message });
  }
}

// ── API: POST create issue ──
async function apiCreateIssue(res, body) {
  const { title, issue_type, priority, label, description } = body;
  if (!title) return jsonResponse(res, 400, { error: 'title required' });
  try {
    let cmd = `"${BD}" create "${title.replace(/"/g, '\\"')}"`;
    if (issue_type) cmd += ` -t ${issue_type}`;
    if (priority != null) cmd += ` -p ${priority}`;
    if (label) cmd += ` -l ${label}`;
    if (description) cmd += ` --description="${description.replace(/"/g, '\\"')}"`;
    const output = execSync(cmd, { cwd: process.cwd(), timeout: 10000 }).toString();
    const match = output.match(/Created issue:\s+(SIMONE-MVP-\S+)/);
    jsonResponse(res, 200, { ok: true, id: match ? match[1] : null, output: output.trim() });
  } catch (err) {
    console.error('POST create error:', err.message);
    jsonResponse(res, 500, { error: err.stderr?.toString() || err.message });
  }
}

// ── API: PATCH issue fields (title, description, notes) — direct SQL ──
async function apiUpdateFields(res, id, body) {
  const allowed = ['title', 'description', 'notes'];
  const updates = [];
  const values = [];
  for (const key of allowed) {
    if (body[key] !== undefined) {
      updates.push(`${key} = ?`);
      values.push(body[key]);
    }
  }
  if (updates.length === 0) return jsonResponse(res, 400, { error: 'No valid fields to update' });
  try {
    const db = await getPool();
    await db.query(`UPDATE issues SET ${updates.join(', ')}, updated_at = NOW() WHERE id = ?`, [...values, id]);
    await db.query(`CALL DOLT_COMMIT('-Am', 'dashboard: update ${id}');`);
    jsonResponse(res, 200, { ok: true, id });
  } catch (err) {
    console.error('PATCH fields error:', err.message);
    jsonResponse(res, 500, { error: err.message });
  }
}

// ── API: GET comments for an issue ──
async function apiGetComments(res, id) {
  try {
    const db = await getPool();
    const [rows] = await db.query(`SELECT id, author, text, created_at FROM comments WHERE issue_id = ? ORDER BY created_at ASC`, [id]);
    jsonResponse(res, 200, rows);
  } catch (err) {
    console.error('GET comments error:', err.message);
    jsonResponse(res, 500, { error: err.message });
  }
}

// ── API: POST comment ──
async function apiAddComment(res, issueId, body) {
  const { text, author } = body;
  if (!text) return jsonResponse(res, 400, { error: 'text required' });
  try {
    const db = await getPool();
    const [result] = await db.query(`INSERT INTO comments (issue_id, author, text) VALUES (?, ?, ?)`, [issueId, author || 'Dashboard', text]);
    await db.query(`CALL DOLT_COMMIT('-Am', 'dashboard: comment on ${issueId}');`);
    jsonResponse(res, 200, { ok: true, id: result.insertId });
  } catch (err) {
    console.error('POST comment error:', err.message);
    jsonResponse(res, 500, { error: err.message });
  }
}

// ── HTTP Server ──
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = url.pathname;
  const method = req.method;

  console.log(`${method} ${pathname}`);

  // API routes
  if (pathname === '/api/issues' && method === 'GET') {
    return apiGetIssues(res);
  }
  if (pathname === '/api/issues' && method === 'POST') {
    const body = await parseBody(req);
    return apiCreateIssue(res, body);
  }
  const statusMatch = pathname.match(/^\/api\/issues\/(.+)\/status$/);
  if (statusMatch && method === 'PATCH') {
    const body = await parseBody(req);
    return apiUpdateStatus(res, statusMatch[1], body);
  }
  const prioMatch = pathname.match(/^\/api\/issues\/(.+)\/priority$/);
  if (prioMatch && method === 'PATCH') {
    const body = await parseBody(req);
    return apiUpdatePriority(res, prioMatch[1], body);
  }
  const commentsMatch = pathname.match(/^\/api\/issues\/(.+)\/comments$/);
  if (commentsMatch && method === 'GET') {
    return apiGetComments(res, commentsMatch[1]);
  }
  if (commentsMatch && method === 'POST') {
    const body = await parseBody(req);
    return apiAddComment(res, commentsMatch[1], body);
  }
  const fieldsMatch = pathname.match(/^\/api\/issues\/([^/]+)$/);
  if (fieldsMatch && method === 'PATCH') {
    const body = await parseBody(req);
    return apiUpdateFields(res, fieldsMatch[1], body);
  }

  // Static files
  if (pathname === '/' || pathname === '/index.html') {
    return serveStatic(res, path.join(DATA_DIR, 'beads-dashboard.html'));
  }
  // Serve any other file from data dir
  const safePath = path.join(DATA_DIR, pathname);
  if (safePath.startsWith(DATA_DIR)) {
    return serveStatic(res, safePath);
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Beads dashboard server running at http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop.');
});
