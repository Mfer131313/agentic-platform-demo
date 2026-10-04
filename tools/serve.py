#!/usr/bin/env python3
"""Serve the console and forward /prodigy/* to a running Prodigy backend.

The browser then reaches Prodigy on the same origin, so Prodigy's CORS
allow-list needs no change.

Usage: python tools/serve.py [--port 8080] [--prodigy http://localhost:9700]
Open http://localhost:8080/consola.html and pick "Prodigy" in the model selector.
"""

from __future__ import annotations

import argparse
import functools
import http.server
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PREFIX = "/prodigy"
FORWARDED = ("Content-Type", "Authorization", "Accept")


class Handler(http.server.SimpleHTTPRequestHandler):
    prodigy = "http://localhost:9700"

    def _proxy(self) -> None:
        url = self.prodigy + self.path[len(PREFIX) :]
        length = int(self.headers.get("Content-Length") or 0)
        body = self.rfile.read(length) if length else None
        headers = {k: self.headers[k] for k in FORWARDED if self.headers.get(k)}
        req = urllib.request.Request(url, data=body, headers=headers, method=self.command)
        try:
            with urllib.request.urlopen(req, timeout=300) as res:  # noqa: S310 - fixed local backend
                status, payload, ctype = res.status, res.read(), res.headers.get("Content-Type")
        except urllib.error.HTTPError as err:
            status, payload, ctype = err.code, err.read(), err.headers.get("Content-Type")
        except urllib.error.URLError as err:
            status, payload, ctype = 502, f'{{"error": "Prodigy unreachable: {err.reason}"}}'.encode(), "application/json"
        self.send_response(status)
        self.send_header("Content-Type", ctype or "application/json")
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def do_GET(self) -> None:
        if self.path.startswith(PREFIX + "/"):
            self._proxy()
        else:
            super().do_GET()

    def do_POST(self) -> None:
        if self.path.startswith(PREFIX + "/"):
            self._proxy()
        else:
            self.send_error(405)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--port", type=int, default=8080)
    parser.add_argument("--prodigy", default="http://localhost:9700")
    args = parser.parse_args()
    Handler.prodigy = args.prodigy.rstrip("/")
    handler = functools.partial(Handler, directory=str(ROOT))
    server = http.server.ThreadingHTTPServer(("127.0.0.1", args.port), handler)
    print(f"Console: http://localhost:{args.port}/consola.html  ·  Prodigy: {Handler.prodigy}")
    server.serve_forever()


if __name__ == "__main__":
    main()
