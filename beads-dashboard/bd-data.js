var BD_DATA = [
  {
    "id": "SIMONE-MVP-c5g",
    "title": "Repondre a Beatrice",
    "notes": "Migré depuis Todoist (Hier — urgent)",
    "status": "open",
    "priority": 1,
    "issue_type": "task",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-03-11T12:46:01Z",
    "created_by": "Margot LL",
    "updated_at": "2026-03-11T12:46:01Z",
    "labels": [
      "ops"
    ],
    "dependency_count": 0,
    "dependent_count": 0,
    "comment_count": 0
  },
  {
    "id": "SIMONE-MVP-j3m.16",
    "title": "End session hallucine: le graph utilise la carte mentale entière au lieu de se baser uniquement sur l'échange réel de la session",
    "status": "open",
    "priority": 1,
    "issue_type": "bug",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-03-11T12:29:00Z",
    "created_by": "Margot LL",
    "updated_at": "2026-03-11T12:29:00Z",
    "labels": [
      "agents"
    ],
    "dependencies": [
      {
        "issue_id": "SIMONE-MVP-j3m.16",
        "depends_on_id": "SIMONE-MVP-j3m",
        "type": "parent-child",
        "created_at": "2026-03-11T13:28:59Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      }
    ],
    "dependency_count": 0,
    "dependent_count": 0,
    "comment_count": 0,
    "parent": "SIMONE-MVP-j3m"
  },
  {
    "id": "SIMONE-MVP-j3m.15",
    "title": "Session insights hallucine: le graph utilise la carte mentale entière au lieu de se baser uniquement sur l'échange réel de la session",
    "status": "open",
    "priority": 1,
    "issue_type": "bug",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-03-11T12:21:21Z",
    "created_by": "Margot LL",
    "updated_at": "2026-03-11T12:21:21Z",
    "labels": [
      "agents"
    ],
    "dependencies": [
      {
        "issue_id": "SIMONE-MVP-j3m.15",
        "depends_on_id": "SIMONE-MVP-j3m",
        "type": "parent-child",
        "created_at": "2026-03-11T13:21:20Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      }
    ],
    "dependency_count": 0,
    "dependent_count": 0,
    "comment_count": 0,
    "parent": "SIMONE-MVP-j3m"
  },
  {
    "id": "SIMONE-MVP-asc.17",
    "title": "Error tracking — Sentry",
    "description": "Mettre en place Sentry pour le error tracking en production.\n\n## Scope\n- Erreurs frontend React (error boundaries)\n- Erreurs server actions / API routes Next.js\n- Source maps pour des stack traces lisibles\n- Alertes en temps réel (email)\n- Intégration avec le workflow: lien Sentry → commit/PR\n- Sentry free tier = 5k erreurs/mois, largement suffisant pour le MVP\n\n## DoD\n- [ ] Sentry SDK installé et configuré dans simone-pwa\n- [ ] Source maps uploadés au build\n- [ ] Erreurs frontend capturées (tester avec un throw manuel)\n- [ ] Erreurs server actions capturées\n- [ ] Alerte email reçue sur erreur test\n- [ ] Release tagging lié aux commits",
    "status": "open",
    "priority": 1,
    "issue_type": "task",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-03-09T13:36:42Z",
    "created_by": "Margot LL",
    "updated_at": "2026-03-09T16:14:22Z",
    "labels": [
      "pwa"
    ],
    "dependencies": [
      {
        "issue_id": "SIMONE-MVP-asc.17",
        "depends_on_id": "SIMONE-MVP-asc",
        "type": "parent-child",
        "created_at": "2026-03-09T14:36:41Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      }
    ],
    "dependency_count": 0,
    "dependent_count": 0,
    "comment_count": 0,
    "parent": "SIMONE-MVP-asc"
  },
  {
    "id": "SIMONE-MVP-asc.10",
    "title": "Script check-env — validation des env vars au démarrage",
    "description": "Module qui valide au boot que toutes les vars requises sont présentes et non vides.\n\n## Trois catégories (alignées sur SSM naming)\n- **shared** : LANGGRAPH_AUTH_SECRET, AWS_REGION, POSTHOG_API_KEY...\n- **pwa** : CLERK_SECRET_KEY, DATABASE_URL, NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY...\n- **agents** : MISTRAL_API_KEY, LANGSMITH_API_KEY (optionnel)...\n\nChaque var est documentée : required vs optional, description, quel service l'utilise.\n\n## Actions\n1. Créer un module check-env (Zod schema ou simple validation)\n2. Intégrer au boot PWA (next.config.ts ou instrumentation.ts)\n3. Intégrer au boot Agents (entrypoint)\n4. .env.example exhaustif dans chaque repo (sert de documentation)\n5. Message d'erreur clair : 'MISTRAL_API_KEY manquante — requis par le service agents pour les appels LLM'\n\n## DoD\n- [ ] check-env tourne au démarrage des deux services\n- [ ] Refuse de démarrer si une var required manque\n- [ ] .env.example à jour dans les deux repos\n- [ ] Catégories shared/pwa/agents explicites",
    "status": "open",
    "priority": 1,
    "issue_type": "task",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-03-09T13:36:05Z",
    "created_by": "Margot LL",
    "updated_at": "2026-03-09T16:02:34Z",
    "labels": [
      "cross"
    ],
    "dependencies": [
      {
        "issue_id": "SIMONE-MVP-asc.10",
        "depends_on_id": "SIMONE-MVP-asc",
        "type": "parent-child",
        "created_at": "2026-03-09T14:36:05Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      }
    ],
    "dependency_count": 0,
    "dependent_count": 0,
    "comment_count": 0,
    "parent": "SIMONE-MVP-asc"
  },
  {
    "id": "SIMONE-MVP-asc.9",
    "title": "AWS SSM Parameter Store — centraliser tous les secrets",
    "description": "AWS SSM Parameter Store comme source de vérité unique pour les env vars.\n\n## Naming convention\n/simone/{env}/{service}/{VAR_NAME}\n- env: dev, prod\n- service: shared (PWA+Agents), pwa, agents\n\n## Actions\n1. Créer les paramètres dans SSM (SecureString pour les secrets)\n2. Script pnpm env:pull qui génère .env.local depuis SSM\n3. Configurer Amplify pour lire depuis SSM au build\n4. Configurer LangGraph Cloud env vars\n5. Documenter la procédure onboarding (1 commande)\n\n## IAM — Least privilege by repo and environment\n- CI PWA : lecture /simone/dev/shared/* + /simone/dev/pwa/* uniquement\n- CI Agents : lecture /simone/dev/shared/* + /simone/dev/agents/* uniquement\n- Amplify prod : lecture /simone/prod/shared/* + /simone/prod/pwa/*\n- LangGraph prod : lecture /simone/prod/shared/* + /simone/prod/agents/*\n- Aucun service ne lit les secrets d'un autre service ou d'un autre env\n\n## DoD\n- [ ] Tous les secrets migrés dans SSM\n- [ ] pnpm env:pull fonctionne (dev local)\n- [ ] IAM policies créées et scopées\n- [ ] Plus aucun secret dans .env, Amplify console, ou LangGraph console en dur\n- [ ] Documentation onboarding à jour",
    "status": "open",
    "priority": 1,
    "issue_type": "task",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-03-09T13:36:05Z",
    "created_by": "Margot LL",
    "updated_at": "2026-03-09T16:02:24Z",
    "labels": [
      "cross"
    ],
    "dependencies": [
      {
        "issue_id": "SIMONE-MVP-asc.9",
        "depends_on_id": "SIMONE-MVP-asc",
        "type": "parent-child",
        "created_at": "2026-03-09T14:36:04Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      }
    ],
    "dependency_count": 0,
    "dependent_count": 0,
    "comment_count": 0,
    "parent": "SIMONE-MVP-asc"
  },
  {
    "id": "SIMONE-MVP-asc",
    "title": "Infra \u0026 Observabilité",
    "description": "Infra, secrets, config, error tracking et observabilité.\n\n## Ordre d'attaque\n1. ~~asc.8~~ — Révoquer secrets compromis ✓ (rien à faire)\n2. asc.10 — check-env (définir le contrat de config)\n3. asc.9 — SSM Parameter Store (brancher la source de vérité)\n4. asc.17 — Sentry error tracking\n5. asc.19 + asc.16 — Preview deploys + smoke test\n\n## Principes\n- Protéger la prod et réduire la friction maintenant\n- Least privilege by repo and environment (IAM)\n- Preview deploys = JAMAIS connecté à la prod\n- Smoke test = minimum viable (reachable + JWT + 1 appel protégé)\n\n## Tier 3 (plus tard)\n- asc.14 — Migrations DB en CI (quand modèle data stabilisé)\n- asc.15 — Package @simone/shared-types (quand équipe grandit)\n- asc.18 — Monitoring \u0026 alertes avancées\n\nStack: Neon (DB), Amplify (PWA), LangGraph Cloud (Agents), GitHub Actions (CI).",
    "notes": "Sécuriser et fiabiliser l'infra : gestion des secrets (SSM), validation des env vars, error tracking (Sentry), preview deploys et smoke tests post-deploy.",
    "status": "open",
    "priority": 1,
    "issue_type": "epic",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-03-09T13:14:18Z",
    "created_by": "Margot LL",
    "updated_at": "2026-03-11T09:51:20Z",
    "labels": [
      "cross"
    ],
    "dependency_count": 0,
    "dependent_count": 0,
    "comment_count": 0
  },
  {
    "id": "SIMONE-MVP-bt5.4",
    "title": "Setup Playwright — Config + structure de tests",
    "description": "Configurer Playwright dans simone-pwa et créer la structure de base.\n\n## Steps\n1. Créer playwright.config.ts (baseURL localhost:3000, browsers: chromium, retries: 1)\n2. Créer la structure de dossiers: e2e/\n3. Créer un helper d'auth Clerk (storageState) pour réutiliser la session entre tests\n4. Créer un fixture de base (authenticated user) via Clerk test mode\n5. Ajouter les scripts dans package.json: test:e2e, test:e2e:ui\n6. Ajouter e2e-results/ et test-results/ au .gitignore\n7. Créer un premier smoke test (page d'accueil se charge)\n\n## Notes\n- Utiliser le storageState de Playwright pour ne pas se re-loguer à chaque test\n- Clerk fournit un mode test avec des comptes de test\n- Les tests E2E doivent pouvoir tourner localement (pnpm dev) et en CI",
    "status": "deferred",
    "priority": 1,
    "issue_type": "task",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-02-25T08:30:16Z",
    "created_by": "Margot LL",
    "updated_at": "2026-03-11T12:13:49Z",
    "labels": [
      "pwa"
    ],
    "dependencies": [
      {
        "issue_id": "SIMONE-MVP-bt5.4",
        "depends_on_id": "SIMONE-MVP-bt5",
        "type": "parent-child",
        "created_at": "2026-02-25T09:30:15Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      },
      {
        "issue_id": "SIMONE-MVP-bt5.4",
        "depends_on_id": "SIMONE-MVP-bt5.14",
        "type": "blocks",
        "created_at": "2026-02-25T18:27:20Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      }
    ],
    "dependency_count": 1,
    "dependent_count": 8,
    "comment_count": 0,
    "parent": "SIMONE-MVP-bt5"
  },
  {
    "id": "SIMONE-MVP-bt5",
    "title": "Tests E2E — Playwright",
    "description": "Tests E2E Playwright couvrant tous les parcours utilisateur.\n\n## Prérequis (done)\n- ~~bt5.1~~ GitHub Actions CI PWA ✓\n- ~~bt5.2~~ GitHub Actions CI Agents ✓\n- ~~bt5.3~~ Branch protection rules ✓\n\n## Ordre d'attaque\n1. bt5.4 — Setup Playwright (config + structure)\n2. bt5.5 → bt5.6 → bt5.7 — Inscription → Onboarding → Session GROW\n3. bt5.8, bt5.9, bt5.10 — Carte mentale, Historique, Profil\n4. bt5.12, bt5.13 — Vérification fichiers S3\n5. bt5.14 — Webhook session insights\n6. bt5.11 — Playwright en CI (quand les tests passent en local)\n\n## Parcours E2E\n1. Inscription : Landing → Sign-up → Webhook Clerk → User en DB\n2. Onboarding : Sign-up → /onboarding → Complétion RPBD\n3. Session coaching GROW : /home → Session complète (5 stages)\n4. Carte mentale : /map → Visualisation RPBD\n5. Historique sessions : /sessions → Liste → Détail → Replay\n6. Profil : /profile → Consultation\n\n## Acceptance Criteria\n- Chaque parcours a au moins 1 test E2E Playwright qui passe\n- Les tests E2E tournent en CI sur les PR vers main",
    "notes": "Tests end-to-end Playwright couvrant tous les parcours utilisateur (inscription, onboarding, session GROW, carte mentale, historique) et leur exécution en CI.",
    "status": "deferred",
    "priority": 1,
    "issue_type": "epic",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-02-25T08:29:52Z",
    "created_by": "Margot LL",
    "updated_at": "2026-03-11T10:56:56Z",
    "labels": [
      "cross"
    ],
    "dependency_count": 0,
    "dependent_count": 0,
    "comment_count": 0
  },
  {
    "id": "SIMONE-MVP-j3m",
    "title": "Session Insights : analyse post-session IA",
    "description": "Quand une session GROW se termine, générer automatiquement un résumé + insights via LLM (nouveau graph LangGraph), stocker en DB Neon (table session_insights), et afficher sur /sessions (remplacer les mock data).",
    "notes": "Générer automatiquement des insights IA après chaque session de coaching : analyse des messages, extraction de thèmes, affichage dans l'historique.",
    "status": "open",
    "priority": 1,
    "issue_type": "epic",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-02-23T13:55:15Z",
    "created_by": "Margot LL",
    "updated_at": "2026-03-11T09:51:25Z",
    "labels": [
      "cross"
    ],
    "dependency_count": 0,
    "dependent_count": 0,
    "comment_count": 0
  },
  {
    "id": "SIMONE-MVP-87z",
    "title": "Ecrire a Eric (coach)",
    "notes": "Migré depuis Todoist (13 Fév)",
    "status": "open",
    "priority": 2,
    "issue_type": "task",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-03-11T12:45:59Z",
    "created_by": "Margot LL",
    "updated_at": "2026-03-11T12:45:59Z",
    "labels": [
      "ops"
    ],
    "dependency_count": 0,
    "dependent_count": 0,
    "comment_count": 0
  },
  {
    "id": "SIMONE-MVP-4xc",
    "title": "Liste compétition mémoire agents etc",
    "notes": "Migré depuis Todoist (6 Fév)",
    "status": "open",
    "priority": 2,
    "issue_type": "task",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-03-11T12:45:58Z",
    "created_by": "Margot LL",
    "updated_at": "2026-03-11T12:45:58Z",
    "labels": [
      "ops"
    ],
    "dependency_count": 0,
    "dependent_count": 0,
    "comment_count": 0
  },
  {
    "id": "SIMONE-MVP-beq",
    "title": "Filtrer le state LangGraph streamé — ne pas exposer les données internes au client",
    "notes": "Le state complet (stratégie, user_agency, carte mentale, rationale) est visible en console dev. Filtrer côté LangGraph et/ou server action pour ne streamer que messages, stage et goal/will.",
    "status": "open",
    "priority": 2,
    "issue_type": "epic",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-03-11T12:25:40Z",
    "created_by": "Margot LL",
    "updated_at": "2026-03-11T12:25:40Z",
    "labels": [
      "cross"
    ],
    "dependency_count": 0,
    "dependent_count": 0,
    "comment_count": 0
  },
  {
    "id": "SIMONE-MVP-asc.19",
    "title": "Preview deploys Amplify — URL éphémère par PR",
    "description": "Activer les preview deployments Amplify sur simone-pwa.\n\n## Fonctionnement\n- Chaque PR vers dev/main obtient une URL temporaire (pr-XX.amplifyapp.com)\n- Le lien apparaît automatiquement dans le commentaire de la PR GitHub\n\n## Contrainte safe data — CRITIQUE\n- Preview pointe vers DB dev + agents dev UNIQUEMENT\n- JAMAIS de connexion à des secrets ou données prod\n- Env vars preview = copie de dev, pas de prod\n- Documenter cette contrainte dans la config Amplify\n\n## Config\n- Activer Previews dans Amplify console\n- Configurer les env vars preview (DB dev Neon branch, agents dev endpoint)\n- Vérifier que NEXT_PUBLIC_LANGGRAPH_URL pointe vers dev, pas prod\n\n## DoD\n- [ ] Preview deploy fonctionne sur une PR test\n- [ ] URL apparaît dans la PR GitHub\n- [ ] Env vars vérifiées : aucun secret prod\n- [ ] Documenté",
    "status": "deferred",
    "priority": 2,
    "issue_type": "task",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-03-09T15:55:36Z",
    "created_by": "Margot LL",
    "updated_at": "2026-03-11T12:13:51Z",
    "labels": [
      "pwa"
    ],
    "dependencies": [
      {
        "issue_id": "SIMONE-MVP-asc.19",
        "depends_on_id": "SIMONE-MVP-asc",
        "type": "parent-child",
        "created_at": "2026-03-09T16:55:35Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      }
    ],
    "dependency_count": 0,
    "dependent_count": 0,
    "comment_count": 0,
    "parent": "SIMONE-MVP-asc"
  },
  {
    "id": "SIMONE-MVP-asc.16",
    "title": "Smoke test post-deploy — vérifier PWA↔Agents",
    "description": "Vérification automatique post-deploy que PWA et Agents communiquent.\n\n## Minimum viable smoke test\n1. **PWA reachable** : GET sur l'URL de deploy, status 200\n2. **Agents reachable** : GET sur endpoint LangGraph /ok, status 200\n3. **JWT valide** : générer un token avec LANGGRAPH_AUTH_SECRET, appeler un endpoint protégé agents\n4. **Appel protégé OK** : un simple thread list ou assistant list, PAS une session coaching complète\n\nPas de test fonctionnel lourd — juste vérifier que la chaîne de communication est intacte.\n\n## Implémentation\n- GitHub Actions workflow déclenché post-deploy (webhook Amplify) ou cron toutes les 5 min\n- Alerte email/Slack si un check échoue\n- Timeout agressif (10s par check)\n\n## DoD\n- [ ] Les 4 checks passent sur dev\n- [ ] Alerte envoyée quand un check échoue\n- [ ] Temps d'exécution \u003c 30s\n- [ ] Documenté",
    "status": "deferred",
    "priority": 2,
    "issue_type": "task",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-03-09T13:36:41Z",
    "created_by": "Margot LL",
    "updated_at": "2026-03-11T12:13:51Z",
    "labels": [
      "cross"
    ],
    "dependencies": [
      {
        "issue_id": "SIMONE-MVP-asc.16",
        "depends_on_id": "SIMONE-MVP-asc",
        "type": "parent-child",
        "created_at": "2026-03-09T14:36:41Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      }
    ],
    "dependency_count": 0,
    "dependent_count": 0,
    "comment_count": 0,
    "parent": "SIMONE-MVP-asc"
  },
  {
    "id": "SIMONE-MVP-bt5.14",
    "title": "E2E — Tester le flow webhook session insights (pending → completed via polling)",
    "status": "deferred",
    "priority": 2,
    "issue_type": "task",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-02-25T17:27:21Z",
    "created_by": "Margot LL",
    "updated_at": "2026-03-11T12:13:50Z",
    "labels": [
      "pwa"
    ],
    "dependencies": [
      {
        "issue_id": "SIMONE-MVP-bt5.14",
        "depends_on_id": "SIMONE-MVP-bt5",
        "type": "parent-child",
        "created_at": "2026-02-25T18:27:20Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      }
    ],
    "dependency_count": 0,
    "dependent_count": 2,
    "comment_count": 0,
    "parent": "SIMONE-MVP-bt5"
  },
  {
    "id": "SIMONE-MVP-9gr",
    "title": "GROW agent: prendre en compte la locale utilisateur pour la langue des réponses",
    "description": "L'agent GROW répond toujours en français même quand l'utilisateur écrit en anglais. Passer la locale utilisateur dans config.configurable et l'utiliser dans les prompts de chaque node.",
    "notes": "Adapter le GROW agent pour répondre dans la langue de l'utilisateur selon sa locale",
    "status": "open",
    "priority": 2,
    "issue_type": "epic",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-02-25T16:16:53Z",
    "created_by": "Margot LL",
    "updated_at": "2026-03-11T10:13:39Z",
    "labels": [
      "agents"
    ],
    "dependency_count": 0,
    "dependent_count": 0,
    "comment_count": 0
  },
  {
    "id": "SIMONE-MVP-j3m.12",
    "title": "Session abandonnée après fin: si l'utilisateur ferme le navigateur entre 'Terminer la session' et feedback/skip, generateSessionInsights n'est jamais déclenché",
    "status": "open",
    "priority": 2,
    "issue_type": "task",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-02-25T15:56:35Z",
    "created_by": "Margot LL",
    "updated_at": "2026-02-25T15:56:35Z",
    "labels": [
      "pwa"
    ],
    "dependencies": [
      {
        "issue_id": "SIMONE-MVP-j3m.12",
        "depends_on_id": "SIMONE-MVP-j3m",
        "type": "parent-child",
        "created_at": "2026-02-25T16:56:35Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      }
    ],
    "dependency_count": 0,
    "dependent_count": 0,
    "comment_count": 0,
    "parent": "SIMONE-MVP-j3m"
  },
  {
    "id": "SIMONE-MVP-j3m.11",
    "title": "Race condition timing: generateSessionInsights peut démarrer avant que markSessionComplete ait écrit le messagesSnapshot",
    "status": "open",
    "priority": 2,
    "issue_type": "task",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-02-25T15:56:08Z",
    "created_by": "Margot LL",
    "updated_at": "2026-02-25T15:56:08Z",
    "labels": [
      "pwa"
    ],
    "dependencies": [
      {
        "issue_id": "SIMONE-MVP-j3m.11",
        "depends_on_id": "SIMONE-MVP-j3m",
        "type": "parent-child",
        "created_at": "2026-02-25T16:56:07Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      }
    ],
    "dependency_count": 0,
    "dependent_count": 0,
    "comment_count": 0,
    "parent": "SIMONE-MVP-j3m"
  },
  {
    "id": "SIMONE-MVP-j3m.9",
    "title": "Valider output du graph session_insights avec Zod au lieu de cast brut",
    "status": "open",
    "priority": 2,
    "issue_type": "task",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-02-25T15:56:06Z",
    "created_by": "Margot LL",
    "updated_at": "2026-02-25T15:56:06Z",
    "labels": [
      "pwa"
    ],
    "dependencies": [
      {
        "issue_id": "SIMONE-MVP-j3m.9",
        "depends_on_id": "SIMONE-MVP-j3m",
        "type": "parent-child",
        "created_at": "2026-02-25T16:56:05Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      }
    ],
    "dependency_count": 0,
    "dependent_count": 0,
    "comment_count": 0,
    "parent": "SIMONE-MVP-j3m"
  },
  {
    "id": "SIMONE-MVP-j3m.6",
    "title": "Race condition: double déclenchement generateSessionInsights — wrap INSERT dans try/catch pour unique constraint",
    "status": "open",
    "priority": 2,
    "issue_type": "task",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-02-25T15:56:02Z",
    "created_by": "Margot LL",
    "updated_at": "2026-02-25T15:56:02Z",
    "labels": [
      "pwa"
    ],
    "dependencies": [
      {
        "issue_id": "SIMONE-MVP-j3m.6",
        "depends_on_id": "SIMONE-MVP-j3m",
        "type": "parent-child",
        "created_at": "2026-02-25T16:56:02Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      }
    ],
    "dependency_count": 0,
    "dependent_count": 0,
    "comment_count": 0,
    "parent": "SIMONE-MVP-j3m"
  },
  {
    "id": "SIMONE-MVP-bt5.13",
    "title": "E2E — Vérifier création fichier S3 session GROW",
    "description": "Vérifier que lors de la finalisation d'une session GROW, un fichier JSON est créé dans le bucket S3 (simone-dev-data ou simone-prod-data) au chemin: sessions/{hashedUserId}/grow/{sessionId}.json",
    "status": "deferred",
    "priority": 2,
    "issue_type": "task",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-02-25T09:00:26Z",
    "created_by": "Margot LL",
    "updated_at": "2026-03-11T12:13:50Z",
    "labels": [
      "cross"
    ],
    "dependencies": [
      {
        "issue_id": "SIMONE-MVP-bt5.13",
        "depends_on_id": "SIMONE-MVP-bt5",
        "type": "parent-child",
        "created_at": "2026-02-25T10:00:26Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      },
      {
        "issue_id": "SIMONE-MVP-bt5.13",
        "depends_on_id": "SIMONE-MVP-bt5.4",
        "type": "blocks",
        "created_at": "2026-02-25T10:00:26Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      }
    ],
    "dependency_count": 1,
    "dependent_count": 0,
    "comment_count": 0,
    "parent": "SIMONE-MVP-bt5"
  },
  {
    "id": "SIMONE-MVP-bt5.12",
    "title": "E2E — Vérifier création fichier S3 onboarding",
    "description": "Vérifier que lors de la finalisation d'une session onboarding, un fichier JSON est créé dans le bucket S3 (simone-dev-data ou simone-prod-data) au chemin: sessions/{hashedUserId}/onboarding/{sessionId}.json",
    "status": "deferred",
    "priority": 2,
    "issue_type": "task",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-02-25T08:59:07Z",
    "created_by": "Margot LL",
    "updated_at": "2026-03-11T12:13:50Z",
    "labels": [
      "cross"
    ],
    "dependencies": [
      {
        "issue_id": "SIMONE-MVP-bt5.12",
        "depends_on_id": "SIMONE-MVP-bt5",
        "type": "parent-child",
        "created_at": "2026-02-25T09:59:06Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      },
      {
        "issue_id": "SIMONE-MVP-bt5.12",
        "depends_on_id": "SIMONE-MVP-bt5.4",
        "type": "blocks",
        "created_at": "2026-02-25T09:59:06Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      }
    ],
    "dependency_count": 1,
    "dependent_count": 0,
    "comment_count": 0,
    "parent": "SIMONE-MVP-bt5"
  },
  {
    "id": "SIMONE-MVP-bt5.11",
    "title": "GitHub Actions — E2E Playwright en CI",
    "description": "Ajouter l'exécution des tests E2E Playwright dans la CI GitHub Actions.\n\n## Steps\n1. Ajouter un job Playwright dans le workflow CI de simone-pwa\n2. Trigger: PR vers main uniquement (trop lourd pour chaque PR vers dev)\n3. Démarrer un serveur Next.js de test (next build + next start)\n4. Configurer les secrets GitHub nécessaires (Clerk test keys, DATABASE_URL de test, LANGGRAPH_AUTH_SECRET)\n5. Optionnel: démarrer un LangGraph server de test ou pointer vers un environnement de staging\n\n## Notes\n- Les tests E2E sont lents → uniquement sur PR vers main\n- Nécessite un environnement Neon de test (branch éphémère ou DB de test dédiée)\n- Le serveur LangGraph doit être accessible (staging ou mock)",
    "status": "deferred",
    "priority": 2,
    "issue_type": "task",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-02-25T08:30:50Z",
    "created_by": "Margot LL",
    "updated_at": "2026-03-11T12:13:50Z",
    "labels": [
      "pwa"
    ],
    "dependencies": [
      {
        "issue_id": "SIMONE-MVP-bt5.11",
        "depends_on_id": "SIMONE-MVP-bt5",
        "type": "parent-child",
        "created_at": "2026-02-25T09:30:50Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      },
      {
        "issue_id": "SIMONE-MVP-bt5.11",
        "depends_on_id": "SIMONE-MVP-bt5.10",
        "type": "blocks",
        "created_at": "2026-02-25T09:58:51Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      },
      {
        "issue_id": "SIMONE-MVP-bt5.11",
        "depends_on_id": "SIMONE-MVP-bt5.5",
        "type": "blocks",
        "created_at": "2026-02-25T09:58:51Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      },
      {
        "issue_id": "SIMONE-MVP-bt5.11",
        "depends_on_id": "SIMONE-MVP-bt5.6",
        "type": "blocks",
        "created_at": "2026-02-25T09:58:51Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      },
      {
        "issue_id": "SIMONE-MVP-bt5.11",
        "depends_on_id": "SIMONE-MVP-bt5.7",
        "type": "blocks",
        "created_at": "2026-02-25T09:58:51Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      },
      {
        "issue_id": "SIMONE-MVP-bt5.11",
        "depends_on_id": "SIMONE-MVP-bt5.8",
        "type": "blocks",
        "created_at": "2026-02-25T09:58:51Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      },
      {
        "issue_id": "SIMONE-MVP-bt5.11",
        "depends_on_id": "SIMONE-MVP-bt5.9",
        "type": "blocks",
        "created_at": "2026-02-25T09:58:51Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      }
    ],
    "dependency_count": 6,
    "dependent_count": 0,
    "comment_count": 0,
    "parent": "SIMONE-MVP-bt5"
  },
  {
    "id": "SIMONE-MVP-bt5.9",
    "title": "E2E — Historique et replay de sessions",
    "description": "Test E2E de l'historique des sessions et du replay.\n\n## Scénario — Historique\n1. Se connecter (user ayant complété au moins 1 session)\n2. Accéder à /sessions\n3. Vérifier que la liste des sessions s'affiche\n4. Cliquer sur une session → vérifier /sessions/[id]\n\n## Scénario — Replay\n1. Depuis la liste ou un lien direct, accéder à /replay/[sessionId]\n2. Vérifier que les messages de la session s'affichent en lecture seule\n3. Vérifier la navigation dans le replay\n\n## Prérequis\n- Au moins 1 session coaching complétée (dépend du test E2E GROW)",
    "status": "deferred",
    "priority": 2,
    "issue_type": "task",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-02-25T08:30:42Z",
    "created_by": "Margot LL",
    "updated_at": "2026-03-11T12:13:50Z",
    "labels": [
      "pwa"
    ],
    "dependencies": [
      {
        "issue_id": "SIMONE-MVP-bt5.9",
        "depends_on_id": "SIMONE-MVP-bt5",
        "type": "parent-child",
        "created_at": "2026-02-25T09:30:41Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      },
      {
        "issue_id": "SIMONE-MVP-bt5.9",
        "depends_on_id": "SIMONE-MVP-bt5.4",
        "type": "blocks",
        "created_at": "2026-02-25T09:35:13Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      },
      {
        "issue_id": "SIMONE-MVP-bt5.9",
        "depends_on_id": "SIMONE-MVP-bt5.7",
        "type": "blocks",
        "created_at": "2026-02-25T09:58:50Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      }
    ],
    "dependency_count": 2,
    "dependent_count": 1,
    "comment_count": 0,
    "parent": "SIMONE-MVP-bt5"
  },
  {
    "id": "SIMONE-MVP-bt5.8",
    "title": "E2E — Carte mentale",
    "description": "Test E2E de la visualisation de la carte mentale.\n\n## Scénario\n1. Se connecter (user ayant complété l'onboarding)\n2. Accéder à /map\n3. Vérifier que la carte mentale RPBD s'affiche\n4. Vérifier les 4 catégories : cap, valeurs, ressources, contraintes\n5. Vérifier la navigation et l'interactivité de la carte\n\n## Prérequis\n- User onboardé avec un profil RPBD rempli",
    "status": "deferred",
    "priority": 2,
    "issue_type": "task",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-02-25T08:30:38Z",
    "created_by": "Margot LL",
    "updated_at": "2026-03-11T12:13:50Z",
    "labels": [
      "pwa"
    ],
    "dependencies": [
      {
        "issue_id": "SIMONE-MVP-bt5.8",
        "depends_on_id": "SIMONE-MVP-bt5",
        "type": "parent-child",
        "created_at": "2026-02-25T09:30:37Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      },
      {
        "issue_id": "SIMONE-MVP-bt5.8",
        "depends_on_id": "SIMONE-MVP-bt5.4",
        "type": "blocks",
        "created_at": "2026-02-25T09:35:13Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      },
      {
        "issue_id": "SIMONE-MVP-bt5.8",
        "depends_on_id": "SIMONE-MVP-bt5.6",
        "type": "blocks",
        "created_at": "2026-02-25T09:58:50Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      }
    ],
    "dependency_count": 2,
    "dependent_count": 1,
    "comment_count": 0,
    "parent": "SIMONE-MVP-bt5"
  },
  {
    "id": "SIMONE-MVP-bt5.7",
    "title": "E2E — Session coaching GROW complète",
    "description": "Test E2E du parcours coaching GROW de bout en bout.\n\n## Scénario\n1. Se connecter (user onboardé)\n2. Depuis /home, lancer une nouvelle session coaching\n3. **Intake** : décrire une situation, répondre aux questions de l'agent\n4. **Diagnostic** : l'agent propose un diagnostic, le valider\n5. **Strategy** : l'agent propose une stratégie, la valider\n6. **Will** : définir un plan d'action avec l'agent\n7. **Close** : terminer la session\n8. Vérifier que la session est sauvegardée (S3 ou visible dans /sessions)\n\n## Stratégie de test du chatbot\nLe contenu des réponses LLM n'est PAS déterministe → on teste le **flow**, pas le contenu.\n\n### Ce qu'on vérifie\n- **Envoi de message** : l'input se vide, le message user apparaît dans le chat\n- **Réception de réponse** : une bulle bot apparaît (sans vérifier le texte)\n- **Indicateur de chargement** : typing indicator visible pendant le streaming, disparaît après\n- **Input disabled** : le champ est désactivé pendant que l'agent répond\n- **Progression multi-tours** : le nombre de bulles augmente à chaque échange\n- **Transitions de stage** : vérifier le changement d'UI quand on passe de intake → diagnostic → strategy → will → close (ex: indicateur de stage, changement de couleur, etc.)\n- **Éléments UI enrichis** : apparition des cards/items liés aux outils GROW (items de situation, acteurs, stratégie, plan d'action)\n- **Fin de session** : le bouton terminer apparaît, le feedback s'affiche\n\n### Patterns Playwright\n- **Timeout généreux** : `timeout: 30_000` minimum pour chaque attente de réponse LLM\n- **Sélecteurs stables** : utiliser `data-testid` sur les bulles, l'input, le bouton envoyer\n- **Attente de fin de streaming** : attendre que le bouton envoyer redevienne actif (ou que le typing indicator disparaisse) plutôt qu'un délai fixe\n- **Assertions de comptage** : `expect(page.locator('[data-testid=message-bot]')).toHaveCount(n)` pour vérifier la progression\n- **Scroll** : vérifier que le chat scrolle automatiquement vers le dernier message\n\n## Notes\n- C'est le test le plus complexe — il implique PWA + LangGraph Agents\n- L'agent utilise des LLMs réels → les réponses ne sont pas déterministes\n- Timeout plus long (session coaching = plusieurs minutes d'interaction)\n- Vérifier l'affichage du feedback en fin de session",
    "status": "deferred",
    "priority": 2,
    "issue_type": "task",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-02-25T08:30:32Z",
    "created_by": "Margot LL",
    "updated_at": "2026-03-11T12:13:49Z",
    "labels": [
      "cross"
    ],
    "dependencies": [
      {
        "issue_id": "SIMONE-MVP-bt5.7",
        "depends_on_id": "SIMONE-MVP-bt5",
        "type": "parent-child",
        "created_at": "2026-02-25T09:30:32Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      },
      {
        "issue_id": "SIMONE-MVP-bt5.7",
        "depends_on_id": "SIMONE-MVP-bt5.14",
        "type": "blocks",
        "created_at": "2026-02-25T18:27:20Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      },
      {
        "issue_id": "SIMONE-MVP-bt5.7",
        "depends_on_id": "SIMONE-MVP-bt5.4",
        "type": "blocks",
        "created_at": "2026-02-25T09:35:13Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      },
      {
        "issue_id": "SIMONE-MVP-bt5.7",
        "depends_on_id": "SIMONE-MVP-bt5.6",
        "type": "blocks",
        "created_at": "2026-02-25T09:58:50Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      }
    ],
    "dependency_count": 3,
    "dependent_count": 2,
    "comment_count": 0,
    "parent": "SIMONE-MVP-bt5"
  },
  {
    "id": "SIMONE-MVP-bt5.6",
    "title": "E2E — Parcours Onboarding",
    "description": "Test E2E du parcours d'onboarding (création du profil RPBD).\n\n## Scénario\n1. Se connecter (storageState du user de test)\n2. Accéder à /onboarding\n3. Interagir avec l'agent d'onboarding (structured_onboarding)\n4. Compléter le profil RPBD\n5. Vérifier la redirection vers /home\n6. Vérifier que onboardingComplete est true dans Clerk publicMetadata\n\n## Prérequis\n- Le test d'inscription doit avoir créé le user de test\n- LangGraph doit tourner (localhost:2024 ou environnement de staging)\n\n## Notes\n- L'agent d'onboarding est un LangGraph workflow — il faut que le serveur agents tourne\n- Vérifier que les réponses de l'agent s'affichent correctement (streaming)",
    "status": "deferred",
    "priority": 2,
    "issue_type": "task",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-02-25T08:30:25Z",
    "created_by": "Margot LL",
    "updated_at": "2026-03-11T12:13:49Z",
    "labels": [
      "pwa"
    ],
    "dependencies": [
      {
        "issue_id": "SIMONE-MVP-bt5.6",
        "depends_on_id": "SIMONE-MVP-bt5",
        "type": "parent-child",
        "created_at": "2026-02-25T09:30:25Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      },
      {
        "issue_id": "SIMONE-MVP-bt5.6",
        "depends_on_id": "SIMONE-MVP-bt5.4",
        "type": "blocks",
        "created_at": "2026-02-25T09:35:13Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      },
      {
        "issue_id": "SIMONE-MVP-bt5.6",
        "depends_on_id": "SIMONE-MVP-bt5.5",
        "type": "blocks",
        "created_at": "2026-02-25T09:58:50Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      }
    ],
    "dependency_count": 2,
    "dependent_count": 3,
    "comment_count": 0,
    "parent": "SIMONE-MVP-bt5"
  },
  {
    "id": "SIMONE-MVP-bt5.5",
    "title": "E2E — Parcours Inscription",
    "description": "Test E2E du parcours d'inscription complet.\n\n## Scénario\n1. Accéder à la landing page (/)\n2. Cliquer sur le CTA sign-in/sign-up\n3. Créer un compte via Clerk (mode test)\n4. Vérifier la redirection vers /onboarding\n5. Vérifier que le user existe en base (optionnel: vérifier le webhook)\n\n## Notes\n- Utiliser Clerk Testing Tokens pour bypasser le vrai flow OAuth\n- Vérifier que PostHog reçoit l'event auth:create_account (optionnel)\n- Ce test crée le user de test qui sera réutilisé par les autres tests",
    "status": "deferred",
    "priority": 2,
    "issue_type": "task",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-02-25T08:30:21Z",
    "created_by": "Margot LL",
    "updated_at": "2026-03-11T12:13:49Z",
    "labels": [
      "pwa"
    ],
    "dependencies": [
      {
        "issue_id": "SIMONE-MVP-bt5.5",
        "depends_on_id": "SIMONE-MVP-bt5",
        "type": "parent-child",
        "created_at": "2026-02-25T09:30:21Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      },
      {
        "issue_id": "SIMONE-MVP-bt5.5",
        "depends_on_id": "SIMONE-MVP-bt5.4",
        "type": "blocks",
        "created_at": "2026-02-25T09:35:13Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      }
    ],
    "dependency_count": 1,
    "dependent_count": 2,
    "comment_count": 0,
    "parent": "SIMONE-MVP-bt5"
  },
  {
    "id": "SIMONE-MVP-j3m.5",
    "title": "Brancher pages /sessions sur données réelles",
    "description": "Remplacer useMockData() par appels à getCompletedSessionsWithInsights() sur /sessions et getSessionInsights() sur /sessions/[id]. Mapper données réelles vers composants existants. Gérer états pending/failed. Ajouter clés i18n fr/en.",
    "notes": "Pages /sessions et /sessions/[id] branchées sur données réelles. Polling 5s pour pending→completed, retry avec polling. Testé en local OK.",
    "status": "done",
    "priority": 2,
    "issue_type": "task",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-02-23T13:55:52Z",
    "created_by": "Margot LL",
    "updated_at": "2026-03-11T10:06:25Z",
    "labels": [
      "pwa"
    ],
    "dependencies": [
      {
        "issue_id": "SIMONE-MVP-j3m.5",
        "depends_on_id": "SIMONE-MVP-j3m",
        "type": "parent-child",
        "created_at": "2026-02-23T14:55:51Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      },
      {
        "issue_id": "SIMONE-MVP-j3m.5",
        "depends_on_id": "SIMONE-MVP-j3m.3",
        "type": "blocks",
        "created_at": "2026-02-23T14:55:51Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      }
    ],
    "dependency_count": 1,
    "dependent_count": 0,
    "comment_count": 0,
    "parent": "SIMONE-MVP-j3m"
  },
  {
    "id": "SIMONE-MVP-j3m.4",
    "title": "Intégrer génération insights dans le flow fin de session",
    "description": "Dans CoachingSessionShell.tsx, après markSessionComplete dans handleFeedbackSubmit et handleSkipFeedback, appeler generateSessionInsights en fire-and-forget avec growData et messages depuis pendingSessionEndData.",
    "notes": "Intégré dans le flow fin de session: feedback → generateSessionInsights (fire-and-forget avec webhook callback).",
    "status": "done",
    "priority": 2,
    "issue_type": "task",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-02-23T13:55:45Z",
    "created_by": "Margot LL",
    "updated_at": "2026-03-11T10:06:20Z",
    "labels": [
      "pwa"
    ],
    "dependencies": [
      {
        "issue_id": "SIMONE-MVP-j3m.4",
        "depends_on_id": "SIMONE-MVP-j3m",
        "type": "parent-child",
        "created_at": "2026-02-23T14:55:45Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      },
      {
        "issue_id": "SIMONE-MVP-j3m.4",
        "depends_on_id": "SIMONE-MVP-j3m.3",
        "type": "blocks",
        "created_at": "2026-02-23T14:55:45Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      }
    ],
    "dependency_count": 1,
    "dependent_count": 0,
    "comment_count": 0,
    "parent": "SIMONE-MVP-j3m"
  },
  {
    "id": "SIMONE-MVP-j3m.3",
    "title": "Server action generateSessionInsights (PWA)",
    "description": "Créer src/lib/server/actions/session-insights.ts avec : generateSessionInsights (insert pending, extraire actions de growData, charger mentalMap depuis rpbdProfiles, appeler graph via LangGraph SDK Client.runs.wait(), update résultat, PostHog tracking), getSessionInsights (fetch par sessionId), getCompletedSessionsWithInsights (LEFT JOIN sessions + insights).",
    "notes": "Server action generateSessionInsights complète: webhook notification + fetch résultat via SDK runs.join(), thread non-stateless, getAppBaseUrl() auto-détection. Testé en local OK.",
    "status": "done",
    "priority": 2,
    "issue_type": "task",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-02-23T13:55:39Z",
    "created_by": "Margot LL",
    "updated_at": "2026-03-11T10:06:14Z",
    "labels": [
      "pwa"
    ],
    "dependencies": [
      {
        "issue_id": "SIMONE-MVP-j3m.3",
        "depends_on_id": "SIMONE-MVP-j3m",
        "type": "parent-child",
        "created_at": "2026-02-23T14:55:38Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      },
      {
        "issue_id": "SIMONE-MVP-j3m.3",
        "depends_on_id": "SIMONE-MVP-j3m.1",
        "type": "blocks",
        "created_at": "2026-02-23T14:55:39Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      },
      {
        "issue_id": "SIMONE-MVP-j3m.3",
        "depends_on_id": "SIMONE-MVP-j3m.2",
        "type": "blocks",
        "created_at": "2026-02-23T14:55:39Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      }
    ],
    "dependency_count": 2,
    "dependent_count": 2,
    "comment_count": 0,
    "parent": "SIMONE-MVP-j3m"
  },
  {
    "id": "SIMONE-MVP-864",
    "title": "Prise de sang",
    "notes": "Migré depuis Todoist (18 Déc 2025, Santé/Sport)",
    "status": "open",
    "priority": 3,
    "issue_type": "task",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-03-11T12:46:01Z",
    "created_by": "Margot LL",
    "updated_at": "2026-03-11T12:46:01Z",
    "labels": [
      "ops"
    ],
    "dependency_count": 0,
    "dependent_count": 0,
    "comment_count": 0
  },
  {
    "id": "SIMONE-MVP-asc.18",
    "title": "Monitoring \u0026 alertes — métriques clés",
    "description": "Dashboard de monitoring avec les métriques essentielles.\nMétriques:\n- Latence API (server actions, LangGraph calls)\n- Taux d'erreur (5xx, 4xx)\n- Core Web Vitals (Vercel Analytics ou PostHog)\n- Disponibilité (uptime agents + PWA)\nAlertes:\n- Taux d'erreur \u003e seuil → email\n- Health check down → email\n- Latence dégradée → email\nOptions: PostHog (déjà en place), Vercel Analytics, ou Grafana Cloud free tier.",
    "status": "deferred",
    "priority": 3,
    "issue_type": "task",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-03-09T13:36:45Z",
    "created_by": "Margot LL",
    "updated_at": "2026-03-11T12:13:51Z",
    "labels": [
      "cross"
    ],
    "dependencies": [
      {
        "issue_id": "SIMONE-MVP-asc.18",
        "depends_on_id": "SIMONE-MVP-asc",
        "type": "parent-child",
        "created_at": "2026-03-09T14:36:45Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      }
    ],
    "dependency_count": 0,
    "dependent_count": 0,
    "comment_count": 0,
    "parent": "SIMONE-MVP-asc"
  },
  {
    "id": "SIMONE-MVP-asc.15",
    "title": "Package types partagé @simone/shared-types (quand équipe grandit)",
    "description": "Créer un package de types partagé entre PWA et Agents pour éliminer les breaking changes silencieux.\nContenu:\n- Zod schemas: GrowData, RPBD profile, SessionInsights\n- Constantes: noms de graphs, structure JWT claims\n- Types d'API: input/output des graphs\nOptions d'implémentation:\n- npm package privé (GitHub Packages)\n- Ou git submodule partagé\n- Ou monorepo (migration plus lourde)\nCritère de succès: si un type change côté agents, le build PWA casse.",
    "status": "deferred",
    "priority": 3,
    "issue_type": "task",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-03-09T13:36:34Z",
    "created_by": "Margot LL",
    "updated_at": "2026-03-11T12:13:51Z",
    "labels": [
      "cross"
    ],
    "dependencies": [
      {
        "issue_id": "SIMONE-MVP-asc.15",
        "depends_on_id": "SIMONE-MVP-asc",
        "type": "parent-child",
        "created_at": "2026-03-09T14:36:33Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      }
    ],
    "dependency_count": 0,
    "dependent_count": 0,
    "comment_count": 0,
    "parent": "SIMONE-MVP-asc"
  },
  {
    "id": "SIMONE-MVP-asc.14",
    "title": "Migrations DB en CI (quand le modèle data se stabilise)",
    "description": "Sortir les migrations Drizzle de amplify.yml et les mettre dans un step GitHub Actions dédié.\nAvantages: visible dans la PR, loggé, bloquant si échec, rollback possible.\nWorkflow:\n- Sur PR vers dev: migration dry-run sur Neon branch (preview)\n- Sur merge dev: migration effective sur DB dev\n- Sur merge main: migration effective sur DB prod (avec ALLOW_DB_MIGRATIONS gate)\nRollback strategy: Neon point-in-time restore comme filet de sécurité.",
    "status": "deferred",
    "priority": 3,
    "issue_type": "task",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-03-09T13:36:28Z",
    "created_by": "Margot LL",
    "updated_at": "2026-03-11T12:13:51Z",
    "labels": [
      "pwa"
    ],
    "dependencies": [
      {
        "issue_id": "SIMONE-MVP-asc.14",
        "depends_on_id": "SIMONE-MVP-asc",
        "type": "parent-child",
        "created_at": "2026-03-09T14:36:28Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      }
    ],
    "dependency_count": 0,
    "dependent_count": 0,
    "comment_count": 0,
    "parent": "SIMONE-MVP-asc"
  },
  {
    "id": "SIMONE-MVP-bt5.10",
    "title": "E2E — Profil utilisateur",
    "description": "Test E2E de la page profil.\n\n## Scénario\n1. Se connecter\n2. Accéder à /profile\n3. Vérifier que les informations du user s'affichent (nom, email, avatar)\n4. Vérifier les interactions possibles (si modification de profil est disponible)\n\n## Notes\n- Test relativement simple, faible priorité",
    "status": "deferred",
    "priority": 3,
    "issue_type": "task",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-02-25T08:30:44Z",
    "created_by": "Margot LL",
    "updated_at": "2026-03-11T12:13:50Z",
    "labels": [
      "pwa"
    ],
    "dependencies": [
      {
        "issue_id": "SIMONE-MVP-bt5.10",
        "depends_on_id": "SIMONE-MVP-bt5",
        "type": "parent-child",
        "created_at": "2026-02-25T09:30:44Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      },
      {
        "issue_id": "SIMONE-MVP-bt5.10",
        "depends_on_id": "SIMONE-MVP-bt5.4",
        "type": "blocks",
        "created_at": "2026-02-25T09:35:13Z",
        "created_by": "Margot LL",
        "metadata": "{}"
      }
    ],
    "dependency_count": 1,
    "dependent_count": 1,
    "comment_count": 0,
    "parent": "SIMONE-MVP-bt5"
  },
  {
    "id": "SIMONE-MVP-354",
    "title": "Logger les sessions d onboarding",
    "description": "Ajouter un systeme de trace/log pour les sessions d onboarding (structured_onboarding), similaire au tracer GROW existant. Permettrait le diagnostic et le debug des sessions onboarding.",
    "notes": "Tracer et logger les sessions d'onboarding (structured_onboarding) pour le diagnostic et le debug, comme le tracer GROW existant.",
    "status": "deferred",
    "priority": 4,
    "issue_type": "epic",
    "owner": "margmotte@gmail.com",
    "created_at": "2026-02-23T15:46:27Z",
    "created_by": "Margot LL",
    "updated_at": "2026-03-11T12:13:51Z",
    "labels": [
      "agents"
    ],
    "dependency_count": 0,
    "dependent_count": 0,
    "comment_count": 0
  }
];
var BD_GENERATED = '2026-03-11 13:47';
