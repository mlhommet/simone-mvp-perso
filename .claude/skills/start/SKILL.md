---
name: start
description: Début de session de travail. Démarre Dolt, montre les issues bd et l'état git des worktrees.
disable-model-invocation: true
---

# Début de session

## Contexte actuel
- Issues : !`bd list 2>/dev/null || echo 'bd indisponible'`
- Issues prêtes : !`bd ready 2>/dev/null || echo 'aucune'`
- PWA feat : !`git -C D:/SIMONE-MVP/simone-pwa-feat branch --show-current 2>/dev/null || echo 'absent'` !`git -C D:/SIMONE-MVP/simone-pwa-feat status --short 2>/dev/null`
- PWA dev : !`git -C D:/SIMONE-MVP/simone-pwa-dev status --short 2>/dev/null || echo 'absent'`
- Agents feat : !`git -C D:/SIMONE-MVP/simone-agents-feat branch --show-current 2>/dev/null || echo 'absent'` !`git -C D:/SIMONE-MVP/simone-agents-feat status --short 2>/dev/null`
- Agents dev : !`git -C D:/SIMONE-MVP/simone-agents-dev status --short 2>/dev/null || echo 'absent'`

## Ta tâche

1. Résume l'état actuel : issues en cours, état git de chaque worktree
2. S'il y a des issues `in_progress`, rappelle ce qui était en cours et demande si on continue dessus
3. S'il y a des issues `open` prêtes (`bd ready`), propose-les
4. Demande à l'utilisateur sur quoi on travaille aujourd'hui
5. Rappelle : utiliser `/work <id>` pour démarrer (marque automatiquement in_progress)
