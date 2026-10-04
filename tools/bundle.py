#!/usr/bin/env python3
"""Build a single self-contained HTML of consola.html (CSS/JS inlined in original order).

The output runs where relative assets and query-string navigation are unavailable
(a published artifact, a file opened by double click): language and industry
switches persist to localStorage and reload instead of navigating.

Usage: python tools/bundle.py [output.html]
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

DEMO = Path(__file__).resolve().parent.parent
DEFAULT_OUT = DEMO / "dist" / "agentic-consola.html"

SHIM = """<script>
/* Bundle: switch industry / language via localStorage + reload instead of URLs. */
(function () {
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var m = /^consola\\.html\\?ind=([a-z]+)/.exec(href);
    if (m) {
      e.preventDefault();
      try { localStorage.setItem('agentic-ind-last', m[1]); } catch (_) {}
      try { history.replaceState(null, '', location.pathname); } catch (_) {}
      location.reload();
    } else if (href === 'index.html') {
      e.preventDefault();
      var sw = document.getElementById('ws-switch');
      if (sw) { sw.open = true; sw.scrollIntoView({ block: 'nearest' }); }
    }
  }, true);
})();
</script>
"""

PATCHES = {
    "assets/js/i18n.js": [
        (
            "const url=new URL(location.href);url.searchParams.set('lang',next);"
            "url.searchParams.delete('reset');\n    location.assign(url.href);",
            "location.reload();",
        ),
    ],
    "assets/js/core.js": [
        (
            "window.location.href = 'index.html'; return false;",
            "const sw = document.getElementById('ws-switch'); if (sw) sw.open = true; "
            "return undefined;",
        ),
    ],
}


def inline_js(rel: str) -> str:
    path = DEMO / rel
    if not path.exists():
        return ""
    src = path.read_text(encoding="utf-8")
    for old, new in PATCHES.get(rel, []):
        if old not in src:
            raise SystemExit(f"patch target not found in {rel}: {old[:60]}")
        src = src.replace(old, new)
    src = re.sub(r"</(script)", r"<\\/\1", src, flags=re.IGNORECASE)
    return f"<script>/* {rel} */\n{src}\n</script>"


def inline_css(rel: str) -> str:
    return f"<style>/* {rel} */\n{(DEMO / rel).read_text(encoding='utf-8')}\n</style>"


def build() -> str:
    page = (DEMO / "consola.html").read_text(encoding="utf-8")
    page = re.sub(
        r'<link rel="stylesheet" href="(assets/[^"]+\.css)">',
        lambda m: inline_css(m.group(1)),
        page,
    )
    page = re.sub(
        r'<script src="(assets/[^"]+\.js)"[^>]*></script>',
        lambda m: inline_js(m.group(1)),
        page,
    )
    return page.replace("</title>", "</title>\n" + SHIM, 1)


def main() -> None:
    out = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_OUT
    out.parent.mkdir(parents=True, exist_ok=True)
    html = build()
    out.write_text(html, encoding="utf-8")
    print(f"{out} · {len(html) / 1024 / 1024:.1f} MB")


if __name__ == "__main__":
    main()
