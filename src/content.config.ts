import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { attackSchema, toolSchema, playbookSchema } from './content/schemas';

const attacks = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/attacks' }),
  schema: attackSchema,
});

const tools = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/tools' }),
  schema: toolSchema,
});

const playbook = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/playbook' }),
  schema: playbookSchema,
});

export const collections = { attacks, tools, playbook };
