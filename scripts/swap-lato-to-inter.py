from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]
INTER = "family=Inter:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400"
skip = {"node_modules", "assets\\Home", "assets/Home", "assets\\Medme", "assets/Medme", "assets\\Insights", "assets/Insights"}

def should_skip(p: Path) -> bool:
    s = str(p)
    return any(x in s for x in skip)

updated = 0
for p in root.rglob("*.html"):
    if should_skip(p):
        continue
    t = p.read_text(encoding="utf-8")
    if "Lato" not in t and "family=Lato" not in t:
        continue
    t2 = t
    # Common Lato family query variants
    t2 = re.sub(r"family=Lato:[^&\"']*&?", "", t2)
    t2 = re.sub(r"family=Inter:wght@400;700&?", "", t2)
    # Ensure Inter weights present once after css2?
    def ensure_inter(m):
        url = m.group(0)
        if "family=Inter:" in url:
            return url
        return url.replace("family=", INTER + "&family=", 1)

    t2 = re.sub(r"https://fonts\.googleapis\.com/css2\?[^\"']+", ensure_inter, t2)
    # Clean double ampersands
    t2 = t2.replace("&&", "&")
    if t2 != t:
        p.write_text(t2, encoding="utf-8", newline="\n")
        updated += 1
        print(p.relative_to(root))

print(f"updated {updated}")
