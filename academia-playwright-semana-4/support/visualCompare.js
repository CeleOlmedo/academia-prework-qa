/**
 * F.3 — Opción A: validación visual con pixelmatch + pngjs (sin Playwright Test runner).
 *
 * En fallo de regresión: se adjuntan **actual, baseline y diff** (tres PNG) + error claro.
 * En éxito: no se adjunta nada extra (salvo baseline nueva con VISUAL_UPDATE o primera corrida).
 *
 * Uso en un step definition:
 *   import { compareToBaseline } from '../../support/visualCompare.js';
 *   await compareToBaseline(this, this.page, 'checkout/resumen.png');
 *
 * Variables de entorno:
 *   VISUAL_UPDATE=1   → regenera la baseline (primer pase o cambio de UI).
 *
 * Opción B (expect + toHaveScreenshot): ver `support/playwrightExpectScreenshot.js` y D32.
 */
import fs from 'fs';
import path from 'path';

const BASE_DIR = path.join(process.cwd(), 'visual-baselines');
const REPORTS_SCREENSHOTS_DIR = path.join(process.cwd(), 'reports', 'screenshots');

function writeVisualFailureArtifacts(suffix, buffers) {
  fs.mkdirSync(REPORTS_SCREENSHOTS_DIR, { recursive: true });
  const ts = Date.now();
  for (const [label, buf] of Object.entries(buffers)) {
    if (!buf) continue;
    const name = `VISUAL_FAIL_${suffix}_${label}_${ts}.png`;
    fs.writeFileSync(path.join(REPORTS_SCREENSHOTS_DIR, name), buf);
  }
}

export async function compareToBaseline(world, page, relativeName, options = {}) {
  const { default: pixelmatch } = await import('pixelmatch');
  const { PNG } = await import('pngjs');

  const threshold    = options.threshold    ?? 0.1;
  const maxDiffRatio = options.maxDiffRatio ?? 0;

  const baselinePath = path.join(BASE_DIR, relativeName);
  const actualBuf    = await page.screenshot({ fullPage: true });

  if (process.env.VISUAL_UPDATE === '1' || !fs.existsSync(baselinePath)) {
    fs.mkdirSync(path.dirname(baselinePath), { recursive: true });
    fs.writeFileSync(baselinePath, actualBuf);
    await world.attach(actualBuf, 'image/png');
    console.log(`[VISUAL] Baseline guardada: ${baselinePath}`);
    return;
  }

  const expected = PNG.sync.read(fs.readFileSync(baselinePath));
  const actual   = PNG.sync.read(actualBuf);

  if (expected.width !== actual.width || expected.height !== actual.height) {
    await world.attach(actualBuf, 'image/png');
    const baselineBuf = fs.readFileSync(baselinePath);
    writeVisualFailureArtifacts('size-mismatch', { actual: actualBuf, baseline: baselineBuf });
    throw new Error(
      `Tamaño distinto: baseline ${expected.width}×${expected.height}, actual ${actual.width}×${actual.height}`
    );
  }

  const { width, height } = expected;
  const diff = new PNG({ width, height });
  const diffPixels = pixelmatch(expected.data, actual.data, diff.data, width, height, { threshold });
  const ratio = diffPixels / (width * height);

  if (ratio > maxDiffRatio) {
    const baselineBuf = fs.readFileSync(baselinePath);
    const diffBuf = PNG.sync.write(diff);
    await world.attach(actualBuf, 'image/png');
    await world.attach(baselineBuf, 'image/png');
    await world.attach(diffBuf, 'image/png');
    const slug = relativeName.replace(/[^a-z0-9]/gi, '_').slice(0, 40);
    writeVisualFailureArtifacts(slug, { actual: actualBuf, baseline: baselineBuf, diff: diffBuf });
    throw new Error(
      `Regresión visual: ${diffPixels} px distintos (${(ratio * 100).toFixed(4)} % del área)`
    );
  }

  console.log(`[VISUAL] OK – ${relativeName} (${diffPixels} px de diferencia)`);
}
