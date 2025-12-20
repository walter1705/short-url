import z from 'zod';

export interface url {
  url: string;
  shortCode?: string;
  timesVisited: number;
}

const urlSchema = z.object({
  url: z.url(),
  shortCode: z.string().min(3).max(256).optional(),
  timesVisited: z.number(),
});

export default urlSchema;
