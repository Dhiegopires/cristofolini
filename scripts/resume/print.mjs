// Prints EN.html / PT.html (from build.py) to PDF with Chromium. Needs playwright installed.
import { chromium } from 'playwright';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const here = dirname(fileURLToPath(import.meta.url));
const exe = process.env.LOCALAPPDATA + '/ms-playwright/chromium-1234/chrome-win64/chrome.exe';
const b = await chromium.launch({ executablePath: exe });
const p = await b.newPage();
for (const k of ['EN', 'PT']) {
  await p.goto(pathToFileURL(join(here, `${k}.html`)).href);
  await p.pdf({ path: join(here, `${k}.pdf`), format: 'A4', printBackground: true, preferCSSPageSize: true });
}
await b.close();
console.log('printed');
