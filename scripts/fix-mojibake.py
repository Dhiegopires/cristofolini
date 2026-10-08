"""Undo UTF-8 double-encoding (mojibake) in HTML files.

Classic failure: curly apostrophe U+2019 saved as UTF-8, misread as CP1252,
then saved as UTF-8 again → browser shows â€™ / Â€™.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SKIP_DIRS = {".git", "node_modules", "assets"}

CHARS = (
    list("áàâãäéèêëíìîïóòôõöúùûüçÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜÇñÑºª°«»×÷€©®™")
    + [
        "\u2018",
        "\u2019",
        "\u201c",
        "\u201d",
        "\u2026",
        "\u2013",
        "\u2014",
        "\u2010",
        "\u2011",
        "\u00a0",
    ]
)

# Prefer ASCII apostrophe/quotes so this cannot re-corrupt under a wrong editor encoding.
ASCII = {
    "\u2018": "'",
    "\u2019": "'",
    "\u201c": '"',
    "\u201d": '"',
    "\u2026": "...",
    "\u2010": "-",
    "\u2011": "-",
    "\u2013": "-",
    "\u2014": "-",
    "\u00a0": " ",
}


def build_map():
    mapping = {}
    for ch in CHARS:
        try:
            bad = ch.encode("utf-8").decode("cp1252")
        except UnicodeError:
            continue
        if bad != ch:
            mapping[bad] = ch
    return mapping


MAP = build_map()


def fix_text(text: str) -> str:
    for bad in sorted(MAP, key=len, reverse=True):
        text = text.replace(bad, MAP[bad])
    for fancy, plain in ASCII.items():
        text = text.replace(fancy, plain)
    # EXTRA keys must be built from real mojibake chars (â + € + ')
    extra = {
        "\u00e2\u20ac'": "-",
        "\u00c2\u00a9": "©",
        "\u00c2\u00ae": "®",
    }
    for bad, good in extra.items():
        text = text.replace(bad, good)
    return text


def main() -> None:
    changed = []
    for path in ROOT.rglob("*.html"):
        if any(part in SKIP_DIRS for part in path.parts):
            continue
        try:
            text = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            print("skip (not utf-8):", path)
            continue
        new = fix_text(text)
        if new == text:
            continue
        path.write_text(new, encoding="utf-8", newline="\n")
        changed.append(path.relative_to(ROOT).as_posix())

    print(f"fixed {len(changed)} files")
    for c in changed:
        print(" ", c)

    sample = (ROOT / "work" / "index.html").read_text(encoding="utf-8")
    i = sample.find("wouldn")
    print("work hero:", repr(sample[i : i + 28]))


if __name__ == "__main__":
    main()
