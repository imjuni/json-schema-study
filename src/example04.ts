/**
 * JSON Schema Example
 *
 * - definitions($defs) with schema path
 */

import Ajv from 'ajv';
import ajvFormats from 'ajv-formats';
import { randomUUID } from 'node:crypto';

const ajv = new Ajv();
ajvFormats(ajv);

ajv.addSchema({
  $id: 'super-hero',
  $defs: {
    ability: {
      IHero: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          ability: { type: 'string' },
        },
        required: ['name', 'ability'],
      },
      // Example of the Composite Schema
      IComposition: {
        // JSON Schema composition
        // @see https://json-schema.org/understanding-json-schema/reference/combining
        allOf: [
          { $ref: '#/$defs/organization/IOrganization' },
          { $ref: '#/$defs/organization/ITeam' },
        ],
        type: 'object',
        properties: {
          uuid: {
            type: 'string',
            format: 'uuid',
          },
        },
      },
    },
    organization: {
      IOrganization: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          address: { type: 'string' },
        },
        required: ['name', 'address'],
      },
      ITeam: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          members: { type: 'array', items: { type: 'string' } },
        },
        required: ['name', 'members'],
      },
    },
  },
});

const result01 = ajv.getSchema('super-hero#/$defs/ability/IHero')?.({
  name: 'ironman',
  ability: 'Genius-level intellect',
});

console.log('Validation Result: ', result01);

const result02 = ajv.getSchema('super-hero#/$defs/organization/ITeam')?.({
  name: 'avengers',
  members: ['ironman', 'spiderman'],
});

console.log('Validation Result: ', result02);

const result03 = ajv.getSchema('super-hero#/$defs/ability/IComposition')?.({
  name: 'avengers',
  uuid: randomUUID(),
  members: ['ironman', 'spiderman'],
  address: 'NY',
});

console.log('Validation Result: ', result03);
