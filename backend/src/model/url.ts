import z from 'zod';

export interface IUrl {
  _id?: string;
  originalUrl: string;
  shortCode: string;
  customCode?: string;
  totalClicks: number;
  lastAccessedAt?: Date;
  expiresAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export const createUrlSchema = z.object({
  originalUrl: z
    .string()
    .url('Invalid URL format')
    .refine(
      (url) => url.startsWith('http://') || url.startsWith('https://'),
      'URL must start with http:// or https://',
    ),
  customCode: z
    .string()
    .min(3, 'Custom code must be at least 3 characters')
    .max(16, 'Custom code must be at most 16 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Invalid characters in custom code')
    .optional(),
  expiresIn: z.number().positive('expiresIn must be positive').optional(),
});

export type CreateUrlRequest = z.infer<typeof createUrlSchema>;
export interface url extends IUrl {}
export const urlSchema = createUrlSchema;
export default urlSchema;
