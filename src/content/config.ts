import { defineCollection } from 'astro:content';
import { attackSchema, toolSchema, playbookSchema } from './schemas';

export * from './schemas';

const attacks = defineCollection({ type: 'data', schema: attackSchema });
const tools = defineCollection({ type: 'data', schema: toolSchema });
const playbook = defineCollection({ type: 'content', schema: playbookSchema });

export const collections = { attacks, tools, playbook };
