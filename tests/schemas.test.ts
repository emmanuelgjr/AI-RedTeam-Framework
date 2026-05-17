import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { attackSchema, toolSchema } from '../src/content/schemas';

const attacksDir = join(__dirname, '../src/content/attacks');
const toolsDir = join(__dirname, '../src/content/tools');

describe('attack schemas', () => {
  const files = readdirSync(attacksDir).filter((f) => f.endsWith('.json'));
  it('has 25 attack patterns', () => expect(files.length).toBeGreaterThanOrEqual(25));
  for (const file of files) {
    it(`${file} validates`, () => {
      const raw = JSON.parse(readFileSync(join(attacksDir, file), 'utf8'));
      expect(() => attackSchema.parse(raw)).not.toThrow();
    });
  }
});

describe('tool schemas', () => {
  const files = readdirSync(toolsDir).filter((f) => f.endsWith('.json'));
  it('has 15 tools', () => expect(files.length).toBeGreaterThanOrEqual(15));
  for (const file of files) {
    it(`${file} validates`, () => {
      const raw = JSON.parse(readFileSync(join(toolsDir, file), 'utf8'));
      expect(() => toolSchema.parse(raw)).not.toThrow();
    });
  }
});
