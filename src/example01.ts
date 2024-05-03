/**
 * JSON Schema Example
 *
 * - ID without schema path
 */

import Ajv from 'ajv';
import ajvFormats from 'ajv-formats';

const ajv = new Ajv();
ajvFormats(ajv);

ajv.addSchema({
  $id: 'IHero',
  type: 'object',
  properties: {
    name: { type: 'string' },
    ability: { type: 'string' },
  },
  required: ['name', 'ability'],
});

ajv.addSchema({
  $id: 'IOrganazation',
  type: 'object',
  properties: {
    name: { type: 'string' },
    address: { type: 'string' },
  },
  required: ['name', 'address'],
});

ajv.addSchema({
  $id: 'ITeam',
  type: 'object',
  properties: {
    name: { type: 'string' },
    members: { type: 'array', items: { type: 'string' } },
  },
  required: ['name', 'members'],
});

// Validation Team
const result = ajv.getSchema('ITeam')?.({ name: 'avengers', members: ['ironman', 'spiderman'] });

console.log('Validation Result: ', result);
