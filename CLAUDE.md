# SIMONE-MVP

## Structure du projet

```
D:/SIMONE-MVP/
  simone-pwa.git/          # Bare repo PWA (Next.js) - pas de working tree
  simone-agents.git/       # Bare repo Agents (LangGraph) - pas de working tree
  simone-pwa-dev/          # Worktree PWA branche dev
  simone-pwa-feat/         # Worktree PWA branche feature courante
  simone-agents-dev/       # Worktree Agents branche dev
  simone-agents-feat/      # Worktree Agents branche feature courante
  .beads/                  # Config et DB Dolt pour bd (task tracking)
  data/beads-dashboard.html  # Dashboard des issues bd
```

Les bare repos (`*.git/`) stockent l'historique. Le travail se fait exclusivement dans les worktrees (`*-dev/`, `*-feat/`).

## Workflow Git

| Branche | Workflow | Commande push |
|---------|----------|---------------|
| **feat** | Push branche feat + PR vers dev. **JAMAIS merger feat dans dev localement.** | `git push -u origin feat/<nom>` puis `gh pr create` |
| **dev** | Push direct autorise | `git push` |
| **main** | Protegee, PR only | Via GitHub |

### Regle absolue avant de commencer

Quand on choisit une tache (bd), **TOUJOURS confirmer ensemble** :
- Sur quels repos on travaille (pwa, agents, ou les deux)
- Sur quelle branche (feat ou dev)

### Worktrees

Creer un worktree :
```bash
git -C D:/SIMONE-MVP/simone-pwa.git worktree add ../simone-pwa-feat feat/<nom>
git -C D:/SIMONE-MVP/simone-agents.git worktree add ../simone-agents-feat feat/<nom>
```

## Quality Gates

**Lint + build AVANT chaque commit/push.** Pas apres.

```bash
pnpm --prefix D:/SIMONE-MVP/simone-pwa-{suffix} lint
pnpm --prefix D:/SIMONE-MVP/simone-pwa-{suffix} build
pnpm --prefix D:/SIMONE-MVP/simone-agents-{suffix} lint
pnpm --prefix D:/SIMONE-MVP/simone-agents-{suffix} build
```

Ne pas committer tant que les gates ne passent pas.

## Beads (bd) - Source de verite unique

`bd` est le seul outil de suivi des taches. **NE PAS utiliser TaskCreate/TaskList/TaskUpdate.**

### Commandes courantes
```bash
bd list                          # Toutes les issues
bd list --status in_progress     # Issues en cours
bd ready                         # Issues pretes a travailler
bd create "titre" -t epic -p 1 -l cross --notes "resume"
bd close <id> --reason "raison"
```

### Config
- **Labels** : `pwa`, `agents`, `cross`
- **Prefix** : `SIMONE-MVP-xxx`
- **Config** : `.beads/config.yaml` (auto-labels par repertoire de worktree)
- **Dashboard** : `data/beads-dashboard.html`

### Demarrage Dolt (requis pour bd)
```bash
dolt sql-server --port 3307 --host 127.0.0.1 --data-dir D:/SIMONE-MVP/.beads/dolt &
```

## Neon DB Branching

- **Projet dev** : `simone-dev` (ID: `still-butterfly-25078216`)
- **Branche DB principale** : `br-wispy-brook-a2izgsb8` (utilisee par les worktrees dev)
- **Workflow feat** : chaque feature cree une branche Neon isolee (copy-on-write)
  - `.env.local` du feat pointe vers la branche Neon feat
  - `.env.local` du dev reste inchange
  - Automatise via les skills `/feat` (creation) et `/land` (nettoyage)

## Discipline WIP

- **Maximum 1 epic actif a la fois.**
- Toujours confirmer le contexte (repo + branche) avant de commencer.
- **Quand on commence a travailler sur un bd** : `bd update <id> -s in_progress`
- **Quand on termine un bd** : `bd close <id> --reason "raison"`
- Ces transitions sont OBLIGATOIRES. Ne jamais travailler sur un bd sans le marquer in_progress d'abord.
- Utiliser `/work <id>` pour demarrer le travail sur un bd (marque in_progress + affiche le contexte).
- Utiliser `/land` en fin de session pour quality gates + commit + push.
- Utiliser `/status` pour un point rapide.

## Skills disponibles

| Commande | Description |
|----------|-------------|
| `/start` | Debut de session : etat git + issues bd |
| `/status` | Vue rapide du workspace |
| `/work <id>` | Demarrer le travail sur un bd (marque in_progress, affiche contexte, verifie WIP) |
| `/feat <nom> <description>` | Creer une feature (worktrees + epic bd + branche Neon) |
| `/land [dev\|feat]` | Fin de session : quality gates, bd close, commit, push, nettoyage |
