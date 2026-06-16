import { DIRECTIONS as migrated } from "./migrated.mjs";
import { HC_DIRECTIONS as hc } from "./hc.mjs";
import { LIGHT_DIRECTIONS as light } from "./light-variants.mjs";
import { CONCEPT_DIRECTIONS as concepts } from "./concepts.mjs";

/** @type {import('./types.mjs').DirectionSpec[]} */
export const DIRECTIONS = [
  ...migrated,
  ...hc,
  ...light,
  ...concepts,
];
