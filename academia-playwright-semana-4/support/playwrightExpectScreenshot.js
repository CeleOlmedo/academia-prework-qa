/**
 * F.3 — Opción B (referencia): expect(...).toHaveScreenshot de @playwright/test.
 *
 * Está pensado para el runner **Playwright Test** (snapshots, --update-snapshots, rutas de diff).
 * Con **Cucumber-js** puede funcionar en proyectos simples o fallar según versión y config.
 * Si no convence en tu entorno, usá **Opción A**: `compareToBaseline` en `support/visualCompare.js`.
 *
 * Uso ilustrativo en un step (con this.page ya abierto):
 *   import { expectPageMatchesSnapshot } from '../../support/playwrightExpectScreenshot.js';
 *   await expectPageMatchesSnapshot(this.page, 'mi-vista.png', { maxDiffPixels: 100 });
 */
import { expect } from '@playwright/test';

export async function expectPageMatchesSnapshot(page, name, options = {}) {
  const { maxDiffPixels = 100, fullPage = true, ...rest } = options;
  await expect(page).toHaveScreenshot(name, {
    fullPage,
    maxDiffPixels,
    ...rest,
  });
}
