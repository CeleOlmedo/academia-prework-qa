/**
 * Perfil único: export default debe ser el objeto de opciones (no { default: { ... } }).
 * Si anidás otro `default`, Cucumber valida/stripea mal y perdés `format` (p. ej. Allure).
 */
export default {
  paths: ['features/**/*.feature'],
  require: ['features/step_definitions/**/*.js'],
  format: [
    'progress',
    'summary',
    'json:artifacts/cucumber/cucumber-report.json'
  ],
  timeout: 30000,
};
