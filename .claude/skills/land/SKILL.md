---
name: land
description: Landing the Plane - protocole de fin de session. Quality gates, bd close, commit, push.
disable-model-invocation: true
argument-hint: [suffix]
---

# Landing the Plane

Suffixe worktree : $ARGUMENTS (si vide, demande à l'utilisateur : "feat" ou "dev")

## Règles critiques

- **JAMAIS merger feat dans dev localement**. Le workflow feat passe par un push de la branche feat + PR sur GitHub.
- **Quality gates AVANT commit/push** : lint et build doivent passer avant de committer ou pousser quoi que ce soit.
- Seul le suffixe `dev` pousse directement sur `origin/dev`. Le suffixe `feat` pousse sa branche feat et crée une PR.

## Étapes obligatoires

### 1. Identifier les repos modifiés
Vérifie `git status` sur simone-pwa-{suffix} et simone-agents-{suffix}. Ne traite que les repos avec des changements.

### 2. Issues restantes
Demande à l'utilisateur s'il y a du travail non terminé à tracker. Si oui, crée des issues bd.

### 3. Quality gates (pour chaque repo modifié)
```bash
pnpm --prefix D:/SIMONE-MVP/simone-{repo}-{suffix} lint
pnpm --prefix D:/SIMONE-MVP/simone-{repo}-{suffix} build
```
Si un gate échoue, corrige avant de continuer. Ne passe PAS à l'étape suivante tant que les gates ne passent pas.

### 4. Fermer les issues terminées
Demande quelles issues bd sont terminées et ferme-les : `bd close <id> --reason "raison"`

### 5. Commit et push (pour chaque repo modifié)

#### Si suffix = `dev` (push direct)
```bash
git -C D:/SIMONE-MVP/simone-{repo}-dev add -A
git -C D:/SIMONE-MVP/simone-{repo}-dev commit -m "type: description (SIMONE-MVP-xxx)"
git -C D:/SIMONE-MVP/simone-{repo}-dev pull --rebase
git -C D:/SIMONE-MVP/simone-{repo}-dev push
```

#### Si suffix = `feat` (push branche + PR)
```bash
git -C D:/SIMONE-MVP/simone-{repo}-feat add -A
git -C D:/SIMONE-MVP/simone-{repo}-feat commit -m "type: description (SIMONE-MVP-xxx)"
git -C D:/SIMONE-MVP/simone-{repo}-feat push -u origin <branch-name>
```
Puis crée une PR vers `dev` avec `gh pr create` depuis le worktree feat.
Ne JAMAIS merger localement dans dev.

### 6. Nettoyer la branche Neon (feat uniquement)
Si suffix = `feat` :
- Restaure le `DATABASE_URL` dans `simone-pwa-feat/.env.local` vers la valeur de dev (copier depuis `simone-pwa-dev/.env.local`)
- Utilise le MCP Neon pour supprimer la branche Neon associée au feat (projet `still-butterfly-25078216`)
- Confirme la suppression avec l'utilisateur avant d'exécuter

### 7. Vérification finale
```bash
git -C D:/SIMONE-MVP/simone-pwa-{suffix} status
git -C D:/SIMONE-MVP/simone-agents-{suffix} status
bd list --status in_progress --json
```
Confirme que tout est poussé et qu'il ne reste pas d'issues in_progress orphelines.

### 8. Session log
Écris un résumé de session (3 lignes max) dans `data/session-log.md` au format :
```
## YYYY-MM-DD
- **Fait** : <ce qui a été accompli, bd IDs>
- **Reste** : <ce qui est en cours ou à faire>
- **Décisions** : <choix notables, si pertinent>
```
Crée le fichier s'il n'existe pas. Ajoute en haut du fichier (le plus récent en premier).
