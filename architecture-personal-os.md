# Architecture Personal OS

> Notes et decisions d'architecture pour la productisation du Personal OS.
> Date: 2026-03-27

---

## Vision produit

**Personal OS en entreprise** : un systeme de profils cognitifs, coaching agent, suivi des taches/conflits/tensions/projets.

### Principes directeurs

- **Click-and-deploy** : Docker Compose ou bouton "Deploy on Railway"
- **UI associee** : Canopy v2 (React, read/write, multi-user)
- **BYO-LLM** : l'utilisateur/entreprise apporte son fournisseur IA (OpenAI, Anthropic, Azure, Bedrock, Ollama)
- **Open-source core + features entreprise payantes**
- **Tradeoff** : facilite de deploiement/usage/fiabilite vs. capacite de customisation

### Strategie d'evolution

> Petit a petit, sortir du runtime Claude Code pour creer un runtime cloud, tout en gardant la possibilite d'envoyer des signaux depuis Claude Code grace au CLI.

Claude Code passe de **runtime** a **client**. Le CLI (`cos`) est le pont.

---

## Projets de reference

### cognitive-toolkit (existant)

| Aspect | Detail |
|--------|--------|
| Domaine | Connaissance de soi, coaching, strategie personnelle |
| Metaphore | Journal intime structure + coach |
| Data model | Lourd, interconnecte (profile <> forest <> coaching, cascading a 4 directions) |
| Skills | Prose SKILL.md, ~600 lignes chacun, proceduraux |
| Etat | Accumule (le profil s'enrichit dans le temps) |
| Viewer | Canopy (React app riche, graph, kanban, terminal) |

### gstack (reference externe - Garry Tan)

| Aspect | Detail |
|--------|--------|
| Domaine | Workflow d'engineering, shipping |
| Metaphore | Equipe virtuelle (CEO, QA, designer) |
| Data model | Leger, ephemere (state files, design docs, logs) |
| Skills | Templates .tmpl -> SKILL.md, generes, role-based |
| Etat | Consomme et jette (chaque sprint repart quasi a zero) |
| Patterns utiles | Preamble tiers, template system, review log JSONL, config CLI, session tracking |

### Patterns communs reutilisables

- Skill = SKILL.md + YAML frontmatter
- CLI wrapper pour l'API
- Signal queue (review log JSONL / pending-pulses.json)
- Artifacts par projet
- Skill chaining via fichiers
- Preamble/context injection

---

## Architecture cible

```
+---------------------------------------------------------+
|                    UI (Canopy v2)                        |
|  React - Profiles - Forest - Coach - Team Dashboard     |
+----------------------------+----------------------------+
                             | REST / WebSocket
+----------------------------+----------------------------+
|                   API Server                            |
|  Auth - Multi-tenant - Workflow Engine - Webhooks       |
+---------------+-----------------+-----------------------+
|  Cognitive    |   Coach         |   Project/Task        |
|  Engine       |   Engine        |   Engine              |
|  (profiles,   |  (sessions,     |  (taches, conflits,   |
|   forest,     |   modes,        |   tensions d'equipe,  |
|   cascading)  |   ToM)          |   OKRs)               |
+-------+-------+--------+-------+-----------+-----------+
        |                |                    |
+-------+----------------+--------------------+-----------+
|              LLM Abstraction Layer                      |
|  OpenAI - Anthropic - Azure - Bedrock - Ollama          |
|  (prompt templates versionnes par provider+modele)      |
+----------------------------+----------------------------+
                             |
+----------------------------+----------------------------+
|                   Postgres + JSONB                       |
|  profiles - forest - sessions - actors - audit_log      |
|  Row-Level Security par tenant                          |
+---------------------------------------------------------+
```

### Clients

```
+-- Claude Code + cos CLI (power users, devs)
|
API Server ---+-- Web UI / Canopy v2 (mainstream)
|
+-- Slack bot (notifications, quick coaching)
|
+-- SDK (integrations custom)
```

---

## Decision structurante : Typed Graph

### Le probleme

- Trop rigide (cognitive-profile.json hardcode) : le moteur sait tout raisonner, mais impossible d'ajouter un concept
- Trop flexible (EAV pur) : le moteur ne sait rien raisonner, l'UI est generique et vide

### La solution : 3 couches

#### Couche 1 — Primitives (hardcodees, non-negociables)

4 tables Postgres :

```sql
Entity    (id, type, owner_id, tenant_id, status, confidence, data JSONB, created_at, updated_at)
Relation  (source_id, target_id, type, metadata JSONB)
Event     (entity_id, event_type, payload JSONB, timestamp)
Signal    (source, type, content, entity_refs[], pending, timestamp)
```

#### Couche 2 — Type definitions (configurables par tenant)

Chaque concept est un **type** qui declare son comportement. Format YAML.

**Champs d'un type :**

| Champ | Role |
|-------|------|
| `name` | Identifiant unique |
| `label` | Nom affiche |
| `category` | profile / forest / tracking / custom |
| `lifecycle` | ephemeral / longitudinal |
| `scope` | user / branch / team / tenant |
| `retention` | permanent / until_merged / ttl |
| `fields` | JSON Schema pour data JSONB |
| `statuses` | Etats valides |
| `relations` | Relations autorisees (type + targets) |
| `cascade_rules` | Regles de propagation (optionnel) |
| `ui` | Composants de rendu (card, detail, graph_node) |

**Exemple : type `belief` (longitudinal, cognitive-toolkit style)**

```yaml
name: belief
label: Croyance
category: profile
lifecycle: longitudinal
scope: user
retention: permanent
icon: lightbulb

fields:
  title:       { type: string, required: true }
  confidence:  { type: number, min: 0, max: 1, ui: sparkline }
  trajectory:  { type: enum, values: [strengthening, stable, weakening] }
  domains:     { type: string[], ui: tags }

statuses: [active, questioned, archived]

relations:
  - type: linked_to
    targets: [belief, tension]
  - type: grounded_in
    targets: [value, evidence]
  - type: influences
    targets: [intention, desire]

cascade_rules:
  - on: confidence_changed
    traverse: [linked_to, influences]
    action: mark_stale
    max_hops: 2
  - on: archived
    traverse: [influences]
    action: review_needed

ui:
  card: belief-card
  detail: belief-detail
  list_view: sortable
  graph_node: circle
```

**Exemple : type `design_doc` (ephemere, gstack style)**

```yaml
name: design_doc
label: Design Doc
category: tracking
lifecycle: ephemeral
scope: branch
retention: until_merged

fields:
  content: { type: markdown }
  branch: { type: string }

statuses: [draft, reviewed, approved, merged]
cascade_rules: []
```

**Exemple : type `okr` (entreprise custom)**

```yaml
name: okr
label: Objective & Key Result
category: tracking
lifecycle: longitudinal
scope: team

fields:
  objective: { type: string }
  key_results: { type: array, items: { text: string, progress: number } }
  quarter: { type: string }

statuses: [draft, committed, at_risk, achieved]

relations:
  - type: owned_by
    targets: [actor]
  - type: supports
    targets: [okr]

cascade_rules:
  - on: status_changed
    traverse: [supports]
    action: recalculate_progress
```

#### Couche 3 — Instances (donnees utilisateur)

Les vraies croyances, tensions, noeuds forest. Toutes dans la table `Entity`, typees par `type`.

### Comment chaque consommateur utilise les types

| Consommateur | Utilise | Pour |
|--------------|---------|------|
| UI | fields, statuses, ui | Rendre les cartes, kanban, graph |
| Engine cascading | cascade_rules, relations | Propager les changements |
| Workflows | event triggers + conditions | Declencher des actions |
| Coach | fields, relations, category | Contextualiser les sessions |

**L'UI n'a pas besoin de savoir ce qu'est une "belief"** — elle sait qu'un type a des fields, des statuses, et un composant card. Ajouter un type = l'UI le rend automatiquement.

**Le moteur de cascading n'a pas besoin de savoir ce qu'est une "tension"** — il sait que quand un event `resolved` arrive sur un entity dont le type a une cascade_rule, il traverse les relations et applique l'action.

### Workflows se bindent aux types

```yaml
# Coaching automatique quand tensions s'accumulent
name: tension-overload-coaching
trigger:
  event: entity_created
  type: tension
  condition: "count(entities where type=tension AND status=active AND owner=trigger.owner) >= 5"
action:
  - notify:
      channel: canopy_inbox
      message: "5 tensions actives detectees - session coaching suggeree"
  - suggest_coaching:
      mode: executive
      context_entities: "tensions where status=active"
```

### Type Packs (distribution)

**Default pack (open source) :**
- belief, tension, value, constraint (profile)
- actor, theory_of_mind (relational)
- objective, action, discovery (forest)
- coaching_session (coaching)
- signal, pulse (system)

**Enterprise packs (payant) :**
- okr, sprint, retrospective (agile)
- team_dynamic, conflict, alignment (team)
- competency, development_plan (RH)
- decision_record, risk (governance)

---

## Compatibilite gstack

### Ce qui converge

| Pattern | gstack | cognitive-toolkit | Typed Graph |
|---------|--------|-------------------|-------------|
| Skill format | SKILL.md + YAML | SKILL.md + YAML | Compatible tel quel |
| CLI wrapper | gstack-config get/set | Pas encore | -> `cos` CLI |
| Signal queue | Review log JSONL | pending-pulses.json | -> Event primitive |
| Artifacts | ~/.gstack/projects/{slug}/ | dataDir/ | -> Entity instances |
| Skill chaining | design doc -> plan reads | write -> cascade -> respond | -> Workflow triggers |
| Context injection | Preamble 4 tiers | cog-context skill | -> Fusionnable |

### Les 3 problemes de compatibilite resolus

#### 1. Donnees ephemeres vs. longitudinales

Le champ `lifecycle` dans le type definition resout ca :
- `ephemeral` + `scope: branch` = gstack style (meurt au merge)
- `longitudinal` + `scope: user` = cognitive-toolkit style (permanent)

La primitive Entity gere les deux — c'est le type qui determine le comportement.

#### 2. Cascading optionnel

`cascade_rules` est optionnel dans le type definition. Pas de rules = pas de cascade. Les types gstack n'en declarent pas. Les types cognitifs en declarent. Le moteur verifie et skip si vide.

Mais gstack pourrait beneficier de cascading en entreprise : QA report bug critique -> plan-eng-review marque stale -> ship se bloque.

#### 3. Preamble system unifie

```
Tier 0 : System preamble (toujours)
  -> Auth, tenant, session tracking
  -> cos whoami, cos status

Tier 1 : Environment (leger)
  -> Branch, repo mode, active sessions
  -> Pattern gstack : bash one-liner

Tier 2 : Cognitive context (medium)
  -> Profile summary, active tensions, energy
  -> cos context --summary

Tier 3 : Full dispatch (lourd)
  -> Domain classification, agent routing
  -> Auto-coach, forest pulse, signal detection
  -> cos context --full
```

Chaque skill declare son tier :

```yaml
# Skill engineering
name: qa
context-tier: 1        # juste environnement

# Skill coaching
name: coach
context-tier: 3        # full dispatch
```

---

## BYO-LLM : degradation explicite

### Tiers de fonctionnalites par qualite LLM

| Tier | Features | LLM requis |
|------|----------|------------|
| Tier 1 (works everywhere) | Profile CRUD, forest navigation, task tracking, cascading, dashboards | Pas besoin de LLM |
| Tier 2 (decent LLM) | Domain classification, signal detection, coaching basique (Decision, Growth) | GPT-4o / Claude Sonnet / Llama 70B+ |
| Tier 3 (frontier) | Deep coaching (Executive, Venting, Rehearsal), Theory of Mind, appraisal-guided intervention | Opus / GPT-4.5 / equiv |

**Principe** : l'UI affiche clairement quelles features sont disponibles avec le LLM configure. Pas de degradation silencieuse — degradation explicite. Si le client est sur GPT-4o-mini, le mode Venting est grise avec "Requires a frontier model".

### Architecture LLM

La logique coaching est separee en 3 couches :
- **Workflow** (code deterministe) : state machine des etapes
- **Prompt templates** (parametres par provider) : le texte envoye au LLM
- **Tool definitions** : les outils que le LLM peut appeler (read_profile, update_forest, etc.)

---

## Interop Claude Code <> Personal OS

### Le probleme central

Claude Code est la ou les **decisions se prennent**. Le Personal OS est la ou les **patterns se comprennent**. Si les deux ne communiquent pas, le Personal OS est un journal mort.

### Hook 1 — Injection : le profil enrichit Claude Code

Preamble cognitif leger injecte dans chaque skill :

```bash
_COG_PROFILE=$(cos context --compact)
# Retourne 5-10 lignes max :
#   Energy: medium, afternoon dip
#   Active tensions: speed vs quality, solo vs team
#   Top beliefs: shipping > perfection (0.8)
#   Current affect: focused, slight anxiety
#   Forest focus: gtm-pivot (active)
```

S'injecte via placeholder `{{COG_CONTEXT}}` dans le template system. Les skills existants n'ont pas besoin d'etre reecrits — juste le preamble change.

### Hook 2 — Capture : les actions Claude Code envoient des signaux

**3 niveaux de capture :**

| Niveau | Mecanisme | Effort user | Fiabilite |
|--------|-----------|-------------|-----------|
| 1. Explicite | `cos signal push --type decision --text "..."` | Haut (commande manuelle) | Haute |
| 2. Suggere | Systeme detecte pattern, propose "Envoyer au PersonalOS ? [Y/n]" | Moyen (un clic) | Haute |
| 3. Automatique | Chaque action Claude Code emet un event structure | Nul | Moyenne (bruit possible) |

### Contrat d'interop minimal

**3 endpoints API :**

```
POST /api/context?tier=1     -> retourne le contexte cognitif compact
POST /api/signal             -> pousse un signal (belief, tension, evidence, decision)
POST /api/event              -> pousse un event brut (session_end, skill_run, commit)
```

**2 hooks Claude Code (settings.json) :**

```json
{
  "hooks": {
    "SessionStart": [
      { "command": "cos context --tier 1 > /tmp/.cog-context" }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit|Bash",
        "hooks": [
          { "command": "cos event push --type tool_use --tool $TOOL", "async": true }
        ]
      }
    ]
  }
}
```

### Repartition Claude Code vs. Canopy

| Fonction | Claude Code | Canopy UI |
|----------|-------------|-----------|
| Coaching deep | Non (trop lourd) | Oui (mode principal) |
| Signal capture | Oui (niveaux 1-3) | Affiche + approuve |
| Profile browsing | cos profile get | Oui (visuel, graph, cards) |
| Forest navigation | cos forest nodes | Oui (graph, kanban, focus) |
| Decisions rapides | Oui (dans le flow) | Capturees automatiquement |
| Brainstorm | Oui (/office-hours) | Signaux extraits |
| Code review | Oui (/review) | Events captures |
| Team dynamics | Non | Oui (dashboard manager) |

**Claude Code = capteur intelligent + injecteur de contexte.**
**Canopy = cerveau + coach + dashboard.**

---

## Open-source vs. Enterprise

### Open source (core)

- Schemas (profile, forest, coaching)
- API server + Postgres
- Coaching engine (5 modes)
- LLM abstraction (BYO-LLM)
- Canopy UI (single user)
- Claude Code plugin
- CLI (`cos`)
- Docker Compose self-hosted
- Import/Export (pas de lock-in data)

### Enterprise (payant)

- Multi-user + team dynamics
- Manager dashboard (agrege, pas intrusif)
- SSO / SAML
- Audit log detaille
- Integrations (Slack, HRIS, Jira)
- Coaching analytics longitudinaux
- Custom prompt templates (branding coach)
- SLA + support
- Managed cloud hosting

---

## Multi-user et dynamiques d'equipe

### Features equipe

- **Tensions d'equipe** : profil A dit "decision rapide", profil B dit "consensus d'abord" -> friction detectee
- **Coach d'equipe** : comprends pourquoi tu clashs avec cette personne
- **Actors -> vrais utilisateurs** : la Theory of Mind alimentee par le profil reel (avec consentement)
- **Manager view** : dashboard tensions, energie equipe, charge cognitive agregee

### Donnees sensibles (non-negociable)

Chaque profil est prive. Le manager voit des signaux agreges, jamais le contenu des sessions de coaching.

---

## Ce qui est reutilisable vs. a reecrire

| Composant | Status | Effort |
|-----------|--------|--------|
| Schemas (profile v6, forest v5, coaching) | Reutilisable tel quel | Faible — mapper vers Postgres |
| Canopy UI | 70% reutilisable | Moyen — ajouter auth, CRUD, multi-user |
| Cascading logic | Reutilisable, a extraire en code | Moyen — c'est deja deterministe |
| Coaching modes (5 modes + sub-skills) | Prompt templates a extraire | Gros — c'est le coeur IP |
| Skills orchestration | A reecrire | Gros — SKILL.md -> workflow engine |
| Data persistence | A reecrire | Moyen — JSON files -> Postgres |
| Auth, multi-tenant, permissions | N'existe pas | Gros — from scratch |

---

## Plan de migration incremental

### Phase 0 — cos CLI wrapper (cette semaine)

- `cos` CLI qui lit/ecrit les memes JSON files
- Les skills continuent de fonctionner dans Claude Code
- Canopy pointe vers cos au lieu des fichiers
- **Aucune rupture**

### Phase 1 — Backend API + Postgres (semaines 1-2)

- Postgres schema calque sur les JSON schemas existants
- API REST basique : CRUD profiles, forest nodes, coaching sessions
- Migration script : JSON files -> Postgres (one-shot)
- Les skills appellent cos au lieu de Read/Write JSON files
- Canopy pointe vers l'API

### Phase 2 — Canopy v2 CRUD (semaines 3-4)

- Canopy lit/ecrit via l'API
- Mutations : editer noeud forest, approuver pulse, lancer coaching
- Auth basique (token)
- Coaching reste dans Claude Code pour l'instant

> A ce stade : produit montrable. UI web + backend, alimentee via Claude Code.

### Phase 3 — Coach engine autonome (semaines 5-8)

- Extraire les 5 modes de coaching en prompt templates + workflow
- State machine : detect_mode -> open -> loop -> close -> save
- BYO-LLM active (swapper Claude -> OpenAI -> Azure -> Ollama)
- Web UI peut lancer des sessions coaching directement
- Claude Code plugin continue de marcher via meme API

### Phase 4 — Type definitions extraites (semaines 9-10)

- Schemas hardcodes deviennent des YAML configurables
- UI se genere depuis les type definitions
- Nouveaux types ajoutables sans code
- cascade_rules deviennent declaratives

### Phase 5 — Multi-user et entreprise (semaines 11-14)

- Auth (Supabase Auth / Auth0 / Clerk)
- Row-Level Security dans Postgres
- Team dashboard : tensions croisees, compatibilite cognitive
- Onboarding guide dans web UI (pas besoin de CLI)
- Integrations (Slack, calendrier, HRIS)

---

## Scenario utilisateur complet

```
09:00  User ouvre Claude Code
       Preamble cognitif s'injecte (tier 1) :
         "Energy: high (morning). Focus: fundraising deck."
         "Active tension: technical depth vs investor storytelling"
       Claude Code adapte ton et suggestions

09:30  User fait /office-hours (brainstorm pitch)
       Preamble cognitif + gstack preamble
       Brainstorm integre beliefs, tensions, forest
       Design doc genere avec insights profile-aware

09:45  Pendant la discussion, user dit :
       "je pense que le B2B est plus defendable que le B2C"
       Capture niveau 2 (suggere) :
         "Signal : shift de belief sur positioning. Envoyer ? [Y/n]"
       User: Y
       cos signal push --type belief --text "B2B > B2C"

10:00  User fait /ship
       Capture niveau 3 (automatique) :
         event: {type: "code_shipped", context: "auth refactor"}
       PersonalOS lie ca au forest node "product development"

12:00  User ouvre Canopy (pause dejeuner)
       Inbox montre :
         - Signal belief : "B2B > B2C" (en attente)
         - Evidence auto : "3 commits auth cette semaine"
         - Coaching suggestion : "Tension vitesse/qualite
           apparue 4 fois. Session executive ?"
       User approuve, lance coaching dans Canopy
```

---

## Decisions prises

| # | Decision | Raison |
|---|----------|--------|
| 1 | Open-source core + enterprise payant | Adoption + community + revenue |
| 2 | Evolution incrementale depuis Claude Code | Pas de rewrite, migration progressive |
| 3 | Typed graph (4 primitives + type definitions YAML) | Balance structure/flexibilite |
| 4 | `cos` CLI comme pont interop | Claude Code reste client, pas runtime |
| 5 | Preamble tiers unifie (0-3) | Compatible gstack + cognitive-toolkit |
| 6 | Degradation LLM explicite (3 tiers) | Pas de coaching degrade silencieux |
| 7 | Canopy = cerveau/coach, Claude Code = capteur | Separation des responsabilites |
| 8 | Cascade rules optionnelles par type | Compatible ephemere (gstack) et longitudinal (cognitive) |
| 9 | Profils prives, manager voit agrege | Non-negociable pour adoption entreprise |
| 10 | Phase 0 = cos CLI wrapper sans rien casser | Premier pas cette semaine |

---

## Questions ouvertes

- [ ] Premier client cible : equipe tech, departement RH, coaches independants ?
- [ ] Nom du produit ?
- [ ] Hosting manage inclus dans l'offre enterprise, ou self-hosted only au debut ?
- [ ] Quel framework pour l'API server ? (Express/Fastify/Hono + Postgres)
- [ ] Canopy v2 : rester React ou migrer vers Next.js pour SSR + auth ?
- [ ] Comment gerer le versioning des type definitions quand un tenant customise ?
- [ ] Modele de pricing enterprise : par user, par equipe, flat ?
