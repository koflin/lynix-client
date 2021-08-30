import { version } from '../../package.json';

export const environment = {
  production: true,
  apiHost: 'https://api.lynix.ch/v0/',
  gatewayHost: 'wss://gateway.lynix.ch',
  domain: 'lynix.ch',
  clientHost: 'https://client.lynix.ch/',
  version: version
};
