import pg from 'pg';
const { Client } = pg;

const DEV_USER_ID = 'user_37ssiYd9as09mCT5jtrCI5JRlzO';
const PROD_USER_ID = 'user_382YvARjgkCybhENbTfU5AIPZUu';

const devClient = new Client('postgresql://neondb_owner:npg_7ASI4PniKZpv@ep-soft-river-a2c3pdz5-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require');
const prodClient = new Client('postgresql://neondb_owner:npg_g0bnSxkLY2BZ@ep-curly-sound-aga98a0d-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  await devClient.connect();
  await prodClient.connect();
  console.log('Connected to both databases');

  try {
    // 1. Copy sessions (non-deleted)
    const { rows: sessions } = await devClient.query(
      `SELECT * FROM sessions WHERE user_id = $1 AND deleted_at IS NULL ORDER BY created_at`,
      [DEV_USER_ID]
    );
    console.log(`Found ${sessions.length} sessions to copy`);

    for (const s of sessions) {
      await prodClient.query(
        `INSERT INTO sessions (id, plan_id, number, slug, title, description, offset_days, scheduled_date, started_at, completed_at, thread_id, created_at, updated_at, deleted_at, assistant_id, system_prompt, user_id, session_data, messages_snapshot)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)
         ON CONFLICT (id) DO NOTHING`,
        [s.id, s.plan_id, s.number, s.slug, s.title, s.description, s.offset_days, s.scheduled_date, s.started_at, s.completed_at, s.thread_id, s.created_at, s.updated_at, s.deleted_at, s.assistant_id, s.system_prompt, PROD_USER_ID, s.session_data ? JSON.stringify(s.session_data) : null, s.messages_snapshot ? JSON.stringify(s.messages_snapshot) : null]
      );
      console.log(`  Inserted session ${s.id}`);
    }

    // 2. Copy session_feedback
    const { rows: feedback } = await devClient.query(
      `SELECT * FROM session_feedback WHERE user_id = $1`,
      [DEV_USER_ID]
    );
    console.log(`Found ${feedback.length} session_feedback to copy`);

    for (const f of feedback) {
      await prodClient.query(
        `INSERT INTO session_feedback (id, session_id, rating, comment, helpful, would_recommend, created_at, updated_at, user_id, emotional_dimensions)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
         ON CONFLICT (id) DO NOTHING`,
        [f.id, f.session_id, f.rating, f.comment, f.helpful, f.would_recommend, f.created_at, f.updated_at, PROD_USER_ID, f.emotional_dimensions ? JSON.stringify(f.emotional_dimensions) : null]
      );
      console.log(`  Inserted feedback ${f.id}`);
    }

    // 3. Copy session_insights
    const { rows: insights } = await devClient.query(
      `SELECT * FROM session_insights WHERE user_id = $1`,
      [DEV_USER_ID]
    );
    console.log(`Found ${insights.length} session_insights to copy`);

    for (const i of insights) {
      const cols = Object.keys(i);
      const vals = cols.map((c) => c === 'user_id' ? PROD_USER_ID : (typeof i[c] === 'object' && i[c] !== null && !(i[c] instanceof Date) ? JSON.stringify(i[c]) : i[c]));
      const placeholders = cols.map((_, idx) => `$${idx + 1}`).join(',');
      await prodClient.query(
        `INSERT INTO session_insights (${cols.join(',')}) VALUES (${placeholders}) ON CONFLICT (id) DO NOTHING`,
        vals
      );
      console.log(`  Inserted insight ${i.id}`);
    }

    console.log('\nDone! All data copied successfully.');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await devClient.end();
    await prodClient.end();
  }
}

main();
