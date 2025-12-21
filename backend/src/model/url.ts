import z from 'zod';

export interface url {
  url: string;
  shortCode?: string | undefined;
  timesVisited: number;
}

const urlSchema = z.object({
  url: z.url(),
  shortCode: z.string().min(1).max(256).optional(),
});

export default urlSchema;
