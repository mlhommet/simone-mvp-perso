const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'onboarding');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

const sessions = files.map(f => {
  const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  const msgs = data.messages || [];
  const humanMsgs = msgs.filter(m => m.type === 'human');
  const aiMsgs = msgs.filter(m => m.type === 'ai');

  // Extraire texte humain
  const humanTexts = humanMsgs.map(m => {
    try {
      const parsed = JSON.parse(m.content);
      return parsed.map(p => p.text || '').join(' ');
    } catch {
      return m.content;
    }
  });

  const humanLengths = humanTexts.map(t => t.length);
  const avgHumanLen = humanLengths.length ? Math.round(humanLengths.reduce((a,b)=>a+b,0)/humanLengths.length) : 0;

  // Mental map
  const mm = data.mentalMap || {};
  const mmCategories = Object.keys(mm);
  const mmDetail = {};
  let mmFilledCount = 0;
  for (const k of mmCategories) {
    const v = mm[k];
    let itemCount = 0;
    if (Array.isArray(v)) {
      itemCount = v.length;
    } else if (v && typeof v === 'object') {
      itemCount = Object.keys(v).length;
    } else if (v) {
      itemCount = 1;
    }
    mmDetail[k] = itemCount;
    if (itemCount > 0) mmFilledCount++;
  }

  return {
    file: f,
    userIdHash: data.metadata?.userIdHash || 'unknown',
    completedAt: data.metadata?.completedAt || null,
    totalMsgs: msgs.length,
    humanMsgs: humanMsgs.length,
    aiMsgs: aiMsgs.length,
    avgHumanLen,
    maxHumanLen: humanLengths.length ? Math.max(...humanLengths) : 0,
    humanTexts,
    mmCategories: mmCategories.length,
    mmFilled: mmFilledCount,
    mmDetail,
    hasMentalMap: mmCategories.length > 0,
  };
});

// Stats globales
const uniqueUsers = new Set(sessions.map(s => s.userIdHash));
const humanCounts = sessions.map(s => s.humanMsgs);
const dates = sessions.filter(s=>s.completedAt).map(s => s.completedAt.slice(0,10)).sort();

console.log('=== STATS GLOBALES ===');
console.log('Sessions:', sessions.length);
console.log('Utilisateurs uniques:', uniqueUsers.size);
console.log('Periode:', dates[0], '->', dates[dates.length-1]);
console.log('');
console.log('Messages humains par session:');
console.log('  Min:', Math.min(...humanCounts));
console.log('  Max:', Math.max(...humanCounts));
console.log('  Moyenne:', Math.round(humanCounts.reduce((a,b)=>a+b,0)/humanCounts.length));
console.log('  Mediane:', humanCounts.sort((a,b)=>a-b)[Math.floor(humanCounts.length/2)]);
console.log('');
console.log('Sessions courtes (<=3 msgs humains):', sessions.filter(s=>s.humanMsgs<=3).length);
console.log('Sessions moyennes (4-10 msgs):', sessions.filter(s=>s.humanMsgs>=4 && s.humanMsgs<=10).length);
console.log('Sessions longues (>=11 msgs humains):', sessions.filter(s=>s.humanMsgs>=11).length);
console.log('');

// Longueur réponses
const allAvgLens = sessions.map(s => s.avgHumanLen);
console.log('Longueur moyenne reponses humaines:', Math.round(allAvgLens.reduce((a,b)=>a+b,0)/allAvgLens.length), 'chars');
console.log('');

// Par utilisateur
const byUser = {};
sessions.forEach(s => {
  if (!byUser[s.userIdHash]) byUser[s.userIdHash] = [];
  byUser[s.userIdHash].push(s);
});
console.log('=== SESSIONS PAR UTILISATEUR ===');
Object.entries(byUser).sort((a,b)=>b[1].length-a[1].length).forEach(([u, ss]) => {
  console.log(u + ': ' + ss.length + ' session(s), msgs humains: [' + ss.map(s=>s.humanMsgs).join(', ') + ']');
});

console.log('');
console.log('=== MENTAL MAP - CATEGORIES ===');
const allMmKeys = {};
sessions.forEach(s => {
  for (const [k, v] of Object.entries(s.mmDetail)) {
    if (!allMmKeys[k]) allMmKeys[k] = { total: 0, nonEmpty: 0 };
    allMmKeys[k].total++;
    if (v > 0) allMmKeys[k].nonEmpty++;
  }
});
Object.entries(allMmKeys).sort((a,b)=>b[1].nonEmpty-a[1].nonEmpty).forEach(([k, v]) => {
  console.log('  ' + k + ': rempli dans ' + v.nonEmpty + '/' + v.total + ' sessions');
});

console.log('');
console.log('=== THEMES / MOTS-CLES (extraits des reponses humaines) ===');
const allHumanText = sessions.flatMap(s => s.humanTexts).join(' ').toLowerCase();
const keywords = [
  'reconversion', 'transition', 'management', 'manager', 'leadership',
  'confiance', 'stress', 'burnout', 'equilibre', 'freelance', 'independant',
  'entrepreneur', 'salaire', 'negociation', 'promotion', 'motivation',
  'sens', 'valeurs', 'famille', 'enfant', 'maternite', 'paternite',
  'licenciement', 'demission', 'toxique', 'bore-out', 'anxiete',
  'formation', 'competences', 'evolution', 'carriere', 'passion',
  'remote', 'teletravail', 'international'
];
keywords.forEach(kw => {
  const regex = new RegExp(kw, 'gi');
  const matches = allHumanText.match(regex);
  if (matches && matches.length > 0) {
    console.log('  ' + kw + ': ' + matches.length + ' mentions');
  }
});

console.log('');
console.log('=== DETAIL PAR SESSION (triees par date) ===');
sessions.sort((a,b) => (a.completedAt||'').localeCompare(b.completedAt||'')).forEach(s => {
  const firstHuman = s.humanTexts[0] || '(aucun)';
  const preview = firstHuman.slice(0, 100) + (firstHuman.length > 100 ? '...' : '');
  console.log(
    (s.completedAt?.slice(0,10) || 'no-date') +
    ' | user=' + s.userIdHash.slice(0,8) +
    ' | msgs=' + s.humanMsgs +
    ' avgLen=' + s.avgHumanLen +
    ' | mm=' + s.mmFilled + '/' + s.mmCategories +
    ' | "' + preview + '"'
  );
});

// Verbatims longs et intéressants
console.log('');
console.log('=== VERBATIMS MARQUANTS (reponses >150 chars) ===');
const longTexts = [];
sessions.forEach(s => {
  s.humanTexts.forEach(t => {
    if (t.length > 150) {
      longTexts.push({ user: s.userIdHash.slice(0,8), date: s.completedAt?.slice(0,10), text: t });
    }
  });
});
longTexts.sort((a,b) => b.text.length - a.text.length).slice(0, 20).forEach(v => {
  console.log('[' + v.date + ' ' + v.user + '] ' + v.text.slice(0, 300));
  console.log('');
});
