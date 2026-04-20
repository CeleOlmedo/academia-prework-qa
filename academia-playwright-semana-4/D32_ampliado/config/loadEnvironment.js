import all from './environments.json' with { type: 'json' };

const envName = process.env.ENV ?? 'dev';
const current = all[envName];

if (!current?.baseUrl) {
  throw new Error(`Ambiente "${envName}" inválido o sin baseUrl en environments.json`);
}

export const environment = {
  name: envName,
  baseUrl: current.baseUrl,
};
