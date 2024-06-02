/**
 * JSON Schema Example
 *
 * Add schema on schema store without $id
 *
 * - definitions($defs) with schema path
 * - non $id schema
 * - combine two schema
 */

import Ajv from 'ajv';
import ajvFormats from 'ajv-formats';
import { randomUUID } from 'node:crypto';

const ajv = new Ajv();
ajvFormats(ajv);

ajv.addSchema({
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

ajv.addSchema({
  $id: '#/$defs/organization/fileUploadSchema',
  type: 'object',
  properties: {
    name: { type: 'string' },
    members: { type: 'array', items: { type: 'string' } },
  },
  required: ['name', 'members'],
});

const result01 = ajv.getSchema('#/$defs/ability/IHero')?.({
  name: 'ironman',
  ability: 'Genius-level intellect',
});

console.log('Validation Result 01: ', result01);

const result02 = ajv.getSchema('#/$defs/organization/ITeam')?.({
  name: 'avengers',
  members: ['ironman', 'spiderman'],
});

console.log('Validation Result 02: ', result02);

const result03 = ajv.getSchema('#/$defs/ability/IComposition')?.({
  name: 'avengers',
  uuid: randomUUID(),
  members: ['ironman', 'spiderman'],
  address: 'NY',
});

console.log('Validation Result 03: ', result03);

const validator04 = ajv.compile({ $ref: '#/$defs/ability/IComposition' });

const result04 = validator04({
  name: 'avengers',
  uuid: randomUUID(),
  members: ['ironman', 'spiderman'],
  address: 'NY',
});

console.log('Validation Result 04: ', result04);

const validator05 = ajv.compile({ $ref: '#/$defs/organization/fileUploadSchema' });

const result05 = validator05({
  name: 'avengers',
  members: ['ironman', 'spiderman'],
});

console.log('Validation Result 05: ', result05);

const validator06 = ajv.getSchema('#/$defs/organization/fileUploadSchema');

const result06 = validator06?.({
  name: 'avengers',
  members: ['ironman', 'spiderman'],
});

console.log('Validation Result 06: ', result06);
