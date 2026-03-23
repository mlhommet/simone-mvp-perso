---
name: status
description: Vue rapide de l'état du workspace - issues bd et état git des repos actifs.
disable-model-invocation: true
---

# Status

## Issues
!`bd list --status open --status in_progress --json 2>/dev/null || echo '[]'`

## Git
- PWA feat : !`git -C D:/SIMONE-MVP/simone-pwa-feat log --oneline -3 2>/dev/null || echo 'N/A'`
- PWA dev : !`git -C D:/SIMONE-MVP/simone-pwa-dev log --oneline -3 2>/dev/null || echo 'N/A'`
- Agents feat : !`git -C D:/SIMONE-MVP/simone-agents-feat log --oneline -3 2>/dev/null || echo 'N/A'`
- Agents dev : !`git -C D:/SIMONE-MVP/simone-agents-dev log --oneline -3 2>/dev/null || echo 'N/A'`

## Ta tâche

Présente un résumé concis : issues en cours, derniers commits, état dirty/clean de chaque worktree. Format tableau.
