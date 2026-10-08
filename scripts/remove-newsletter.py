from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]

lead = re.compile(
    r"\n\s*<section class=\"lead-cta-section\"[^>]*>.*?</section>\s*",
    re.S,
)
news = re.compile(
    r"\n\s*<section class=\"newsletter-section\"[^>]*>.*?</section>\s*",
    re.S,
)
kit_js = re.compile(
    r"\n\s*const kitLabel = document\.documentElement\.lang.*?"
    r"if \(kitMount\) new MutationObserver\(syncKit\)\.observe\(kitMount, \{ childList: true, subtree: true \}\);\s*",
    re.S,
)
empty_end = re.compile(r"\n\s*<div class=\"article-end\">\s*</div>\s*", re.S)

updated = []
for p in root.rglob("*.html"):
    if p.parent.name == "assets":
        continue
    t = p.read_text(encoding="utf-8")
    t2 = lead.sub("\n", t)
    t2 = news.sub("\n", t2)
    t2 = kit_js.sub("\n", t2)
    t2 = empty_end.sub("\n", t2)
    if t2 != t:
        p.write_text(t2, encoding="utf-8", newline="\n")
        updated.append(str(p.relative_to(root)))

print(f"updated {len(updated)}")
for u in updated:
    print(u)
