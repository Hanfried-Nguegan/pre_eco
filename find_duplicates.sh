#!/bin/bash

echo "=== Scanning for duplicate files ==="
echo ""

# Create a temporary directory for hashes
TMPDIR=$(mktemp -d)
HASH_FILE="$TMPDIR/hashes.txt"
DUPLICATES_FILE="$TMPDIR/duplicates.txt"

# Generate MD5 hashes for all files (excluding hidden files and node_modules)
find . -type f \
  ! -path '*/\.*' \
  ! -path '*/node_modules/*' \
  ! -path '*/.git/*' \
  -exec md5 -r {} \; | sort > "$HASH_FILE"

# Find duplicates (same hash appearing multiple times)
awk '{print $1}' "$HASH_FILE" | sort | uniq -d > "$DUPLICATES_FILE"

if [ ! -s "$DUPLICATES_FILE" ]; then
  echo "✓ No duplicate files found!"
  rm -rf "$TMPDIR"
  exit 0
fi

echo "Found duplicate groups:"
echo "======================="
echo ""

# Display each duplicate group with file info
while read HASH; do
  echo "Hash: $HASH"
  grep "^$HASH " "$HASH_FILE" | while read h file; do
    SIZE=$(stat -f%z "$file" 2>/dev/null || echo "0")
    echo "  • $file ($(numfmt --to=iec-i --suffix=B $SIZE 2>/dev/null || echo $SIZE bytes))"
  done
  echo ""
done < "$DUPLICATES_FILE"

# Cleanup
rm -rf "$TMPDIR"
