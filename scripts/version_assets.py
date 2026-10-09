#!/usr/bin/env python3
"""Version the static page's CSS and JavaScript URLs from their contents."""

import argparse
import hashlib
from pathlib import Path
import re


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Refuse stale asset versions without changing files")
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    page = root / "index.html"
    original = page.read_text()
    updated = original
    for asset in ("css/style.css", "js/site.js"):
        digest = hashlib.sha256((root / asset).read_bytes()).hexdigest()[:12]
        pattern = rf'(?<="){re.escape(asset)}(?:\?v=[^"\s]*)?(?=")'
        updated, count = re.subn(pattern, f"{asset}?v={digest}", updated)
        if count != 1:
            parser.error(f"Expected exactly one reference to {asset}; found {count}")
    if args.check:
        if updated != original:
            parser.exit(1, "Asset versions are stale. Run python3 scripts/version_assets.py before publishing.\n")
        print("CSS and JavaScript versions match their contents.")
    elif updated != original:
        page.write_text(updated)
        print("Updated CSS and JavaScript asset versions.")
    else:
        print("Asset versions are already current.")


if __name__ == "__main__":
    main()
