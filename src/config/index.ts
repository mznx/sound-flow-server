import dev  from './dev';
import prod from './prod';

let config;

switch (process.env.NODE_ENV) {
  case 'dev':
    config = dev;
    break;

  default:
    config = prod;
}

export default { ...config }