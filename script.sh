#!/usr/bin/env bash

BASE_URL="https://sobakoproducts.com/wp-content/uploads/2026/02"
OUTPUT_DIR="./downloads"
mkdir -p "$OUTPUT_DIR"

for i in {1..60}; do
    URL="$BASE_URL/$i.png"
    echo "Checking $i.png..."
    
    if curl -fsSL \
      -A "Mozilla/5.0" \
      -e "https://sobakoproducts.com/" \
      "$URL" -o "$OUTPUT_DIR/$i.png"; then
        echo "  -> Downloaded $i.png"
    else
        # Remove empty file if curl failed
        rm -f "$OUTPUT_DIR/$i.png"
    fi
    
    sleep 0.5 # Pause 0.5s between requests to avoid rate-limiting
done
