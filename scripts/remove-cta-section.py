from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]

# Full CTA banner: <a class="cta-section" ...>...</a>
cta = re.compile(
    r"\n\s*<a\b[^>]*\bclass=\"cta-section\"[^>]*>.*?</a>\s*",
    re.S,
)

updated = []
for p in root.rglob("*.html"):
    if "assets" in p.parts:
        continue
    t = p.read_text(encoding="utf-8")
    t2 = cta.sub("\n", t)
    if t2 != t:
        p.write_text(t2, encoding="utf-8", newline="\n")
        updated.append(str(p.relative_to(root)))

print(f"updated {len(updated)}")
for u in updated:
    print(u)

# leftover check
left = []
for p in root.rglob("*.html"):
    if "assets" in p.parts:
        continue
    t = p.read_text(encoding="utf-8")
    if 'class="cta-section"' in t or "Open to the next role" in t or "Aberto pra próxima" in t:
        left.append(str(p.relative_to(root)))
print("leftover", left or "none")
