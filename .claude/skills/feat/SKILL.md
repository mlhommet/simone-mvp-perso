---
name: feat
description: Créer une nouvelle feature branch avec worktrees sur les deux repos et un epic bd.
disable-model-invocation: true
argument-hint: [nom-feature] [description]
---

# Nouvelle feature

Nom : $ARGUMENTS[0]
Description : $ARGUMENTS[1]

## Étapes

### 1. Créer les worktrees
```bash
git -C D:/SIMONE-MVP/simone-pwa.git worktree add ../simone-pwa-feat feat/$ARGUMENTS[0]
git -C D:/SIMONE-MVP/simone-agents.git worktree add ../simone-agents-feat feat/$ARGUMENTS[0]
```
Si les worktrees feat existent déjà, demande confirmation avant de les supprimer et recréer.

### 2. Créer l'epic bd
```bash
bd create "$ARGUMENTS[1]" -t epic -p 1 -l "cross" --notes "<résumé 1 phrase : à quoi sert cette feature, pour qui, quel problème elle résout>" --json
```
**Important** : le `--notes` doit TOUJOURS être renseigné avec un résumé court (1 phrase max) de l'objectif de la feature. Ce résumé s'affiche dans le dashboard Progress.

### 3. Créer une branche Neon isolée
- Utilise le MCP Neon pour créer une branche sur le projet `simone-dev` (ID: `still-butterfly-25078216`) :
  - Nom de branche : `feat/$ARGUMENTS[0]`
  - Récupère la connection string de la nouvelle branche
- Met à jour `simone-pwa-feat/.env.local` : remplace le `DATABASE_URL` par celui de la branche Neon
- **NE PAS toucher** au `.env.local` de `simone-pwa-dev` (il reste sur la branche Neon principale)

### 4. Configurer VS Code
Met à jour `.vscode/settings.json` pour exclure les autres worktrees et ajouter les profils terminaux pour le suffix "feat". Voir CLAUDE.md section "Working on a branch".

### 5. Informer l'utilisateur
> Les worktrees `feat/$ARGUMENTS[0]` sont prêts sur les deux repos.
> Epic bd créé.
> Branche Neon `feat/$ARGUMENTS[0]` créée — le worktree feat pointe vers une DB isolée.
> Ouvre 3 terminaux : **"Agents feat"**, **"Trace feat"**, **"PWA feat"**.
