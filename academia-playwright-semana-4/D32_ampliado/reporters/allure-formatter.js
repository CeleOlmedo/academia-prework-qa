/**
 * Formateador Allure oficial para Cucumber JS (allure-cucumberjs).
 * Escribe resultados en ./allure-results/ (raíz del proyecto).
 */
import path from 'path';
import { AllureRuntime } from 'allure-js-commons';
import { CucumberJSAllureFormatter } from 'allure-cucumberjs';

const resultsDir = path.join(process.cwd(), 'allure-results');

export default class AllureCucumberFormatter extends CucumberJSAllureFormatter {
  constructor(options) {
    super(options, new AllureRuntime({ resultsDir }), {});
  }
}
