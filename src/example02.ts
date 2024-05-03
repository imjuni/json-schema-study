/**
 * JSON Schema Example
 *
 * - ID with schema path
 */

import Ajv from 'ajv';
import ajvFormats from 'ajv-formats';

const ajv = new Ajv();
ajvFormats(ajv);

ajv.addSchema({
  $id: 'ability/IHero',
  type: 'object',
  properties: {
    name: { type: 'string' },
    ability: { type: 'string' },
  },
  required: ['name', 'ability'],
});

ajv.addSchema({
  $id: 'organazation/IOrganazation',
  type: 'object',
  properties: {
    name: { type: 'string' },
    address: { type: 'string' },
  },
  required: ['name', 'address'],
});

ajv.addSchema({
  $id: 'organazation/ITeam',
  type: 'object',
  properties: {
    name: { type: 'string' },
    members: { type: 'array', items: { type: 'string' } },
  },
  required: ['name', 'members'],
});

// Validation Team
const result = ajv.getSchema('organazation/ITeam')?.({
  name: 'avengers',
  members: ['ironman', 'spiderman'],
});

console.log('Validation Result: ', result);
