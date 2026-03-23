---
name: work
description: Démarrer le travail sur un bd. Marque la tâche in_progress et affiche le contexte.
disable-model-invocation: true
argument-hint: <bd-id>
---

# Démarrer le travail sur un bd

ID : $ARGUMENTS

## Étapes

### 1. Marquer in_progress
```bash
bd update $ARGUMENTS -s in_progress
```

### 2. Afficher le contexte
```bash
bd show $ARGUMENTS
```

### 3. Confirmer le contexte de travail
- Affiche le bd (titre, description, dépendances, epic parent)
- Demande à l'utilisateur : sur quels repos (pwa, agents, les deux) et quelle branche (feat, dev) on travaille
- Ne commence AUCUN travail tant que le contexte n'est pas confirmé

### 4. Vérifier le WIP
```bash
bd list --status in_progress
```
S'il y a d'autres tâches déjà in_progress, alerte l'utilisateur : on devrait terminer ou defer l'ancienne avant d'en commencer une nouvelle.
