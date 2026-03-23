const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'onboarding');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

// Répartition par semaine
const byWeek = {};
files.forEach(f => {
  const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  const d = data.metadata && data.metadata.completedAt;
  if (!d) return;
  const date = new Date(d);
  const weekStart = new Date(date);
  weekStart.setDate(date.getDate() - date.getDay() + 1);
  const key = weekStart.toISOString().slice(0,10);
  byWeek[key] = (byWeek[key] || 0) + 1;
});
console.log('=== SESSIONS PAR SEMAINE ===');
Object.entries(byWeek).sort().forEach(([w, c]) => {
  console.log(w + ': ' + '#'.repeat(c) + ' (' + c + ')');
});

// Utilisateur c75644cf (5 sessions)
console.log('');
console.log('=== USER c75644cf (5 sessions) ===');
files.forEach(f => {
  const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  if (data.metadata?.userIdHash !== 'c75644cf47f33827') return;
  const msgs = (data.messages || []).filter(m => m.type === 'human');
  console.log(data.metadata.completedAt?.slice(0,10) + ' | ' + msgs.length + ' msgs humains');
});

// Utilisateur 91cc20d6 (6 sessions)
console.log('');
console.log('=== USER 91cc20d6 (6 sessions) ===');
files.forEach(f => {
  const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  if (data.metadata?.userIdHash !== '91cc20d6c85245f4') return;
  const msgs = (data.messages || []).filter(m => m.type === 'human');
  let text = '';
  try { text = JSON.parse(msgs[0].content).map(p => p.text).join(' '); } catch { text = msgs[0]?.content || ''; }
  console.log(data.metadata.completedAt?.slice(0,10) + ' | ' + msgs.length + ' msgs | premier: ' + text.slice(0, 120));
});

// Signaux de frustration
console.log('');
console.log('=== SIGNAUX DE FRUSTRATION / IMPATIENCE ===');
const frustrationWords = ['finissons', 'abreger', 'arreter', 'on a deja', 'passons', 'stop', 'termine la session', 'il se fait tard', 'je ne comprends pas ta question'];
files.forEach(f => {
  const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  const msgs = (data.messages || []).filter(m => m.type === 'human');
  msgs.forEach(m => {
    let text = '';
    try { text = JSON.parse(m.content).map(p => p.text).join(' ').toLowerCase(); } catch { text = m.content.toLowerCase(); }
    for (const fw of frustrationWords) {
      if (text.includes(fw)) {
        console.log('[' + data.metadata?.userIdHash?.slice(0,8) + ' ' + data.metadata?.completedAt?.slice(0,10) + '] ' + text.slice(0, 200));
        break;
      }
    }
  });
});

// Phases déclarées
console.log('');
console.log('=== PHASES DECLAREES ===');
const phases = { exploration: 0, stabilisation: 0, transition: 0, reevaluation: 0, consolidation: 0, autre: 0 };
files.forEach(f => {
  const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  const msgs = (data.messages || []).filter(m => m.type === 'human');
  // Chercher dans les 5 derniers messages humains
  const lastMsgs = msgs.slice(-5);
  let found = false;
  for (const m of lastMsgs) {
    let text = '';
    try { text = JSON.parse(m.content).map(p => p.text).join(' ').toLowerCase(); } catch { text = m.content.toLowerCase(); }
    if (text.includes('explor')) { phases.exploration++; found = true; break; }
    if (text.includes('stabili') || text.includes('consolid')) { phases.stabilisation++; found = true; break; }
    if (text.includes('transition') || text.includes('transitionne')) { phases.transition++; found = true; break; }
    if (text.includes('réévalua') || text.includes('reevalu')) { phases.reevaluation++; found = true; break; }
  }
  if (!found) phases.autre++;
});
Object.entries(phases).forEach(([k, v]) => {
  if (v > 0) console.log('  ' + k + ': ' + v);
});
