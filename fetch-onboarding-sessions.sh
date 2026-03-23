#!/usr/bin/env bash
# Récupère toutes les sessions onboarding depuis S3 simone-prod-data
# Structure S3 : sessions/{userId}/onboarding/{threadId}.json
# Structure locale : data/onboarding/{threadId}.json (fichier plat, un seul répertoire)

set -euo pipefail

BUCKET="simone-prod-data"
REGION="eu-west-3"
PREFIX="sessions/"
OUTPUT_DIR="D:/SIMONE-MVP/data/onboarding"

mkdir -p "$OUTPUT_DIR"

echo "=== Téléchargement des sessions onboarding depuis s3://$BUCKET ==="

# Liste tous les fichiers onboarding
files=$(aws s3 ls "s3://$BUCKET/$PREFIX" --region "$REGION" --recursive \
  | grep '/onboarding/' \
  | awk '{print $4}')

count=0
total=$(echo "$files" | wc -l | tr -d ' ')

echo "Trouvé $total fichiers onboarding"
echo ""

while IFS= read -r key; do
  [ -z "$key" ] && continue

  filename=$(basename "$key")

  aws s3 cp "s3://$BUCKET/$key" "$OUTPUT_DIR/$filename" --region "$REGION" --quiet
  count=$((count + 1))
  echo "[$count/$total] $filename"
done <<< "$files"

echo ""
echo "=== Terminé : $count fichiers téléchargés dans $OUTPUT_DIR/ ==="
