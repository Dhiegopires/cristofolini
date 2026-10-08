"""Pull the most recent lead-cta-section HTML from the agent transcript."""
import json
import re
from pathlib import Path

transcript = Path(
    r"C:\Users\Dhiego\.cursor\projects\c-Users-Dhiego-Desktop-Github-CRISTOFOLINI"
    r"\agent-transcripts\793d94ff-43bc-41e9-aa66-710016eb6251"
    r"\793d94ff-43bc-41e9-aa66-710016eb6251.jsonl"
)

best = None
best_len = 0

with transcript.open(encoding="utf-8") as f:
    for line in f:
        if "lead-cta-section" not in line or "Tell me" not in line:
            continue
        # Prefer tool Write contents of index.html
        try:
            obj = json.loads(line)
        except json.JSONDecodeError:
            continue
        text = json.dumps(obj)
        for m in re.finditer(
            r'<section class=\\"lead-cta-section\\"[^>]*>.*?</section>',
            text,
            re.S,
        ):
            chunk = m.group(0).encode().decode("unicode_escape")
            # unescape leftover
            chunk = chunk.replace('\\"', '"').replace("\\n", "\n").replace("\\/", "/")
            if "Tell me" in chunk and len(chunk) > best_len:
                best = chunk
                best_len = len(chunk)

out = Path("scripts/_recovered-lead-cta.html")
if best:
    out.write_text(best, encoding="utf-8")
    print("wrote", out, "len", best_len)
    print(best[:500])
else:
    print("NOT FOUND")
