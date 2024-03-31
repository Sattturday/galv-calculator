import { z } from 'zod';

// Схема для единиц измерения
export const unitsSchema = z.record(z.string());
export type IUnits = z.infer<typeof unitsSchema>;

// Схема для материала
const IMaterialSchema = z.object({
  name: z.string(),
  q: z.string(),
  p: z.string(),
});
export type IMaterial = z.infer<typeof IMaterialSchema>;

// Схема для результата времени
const ITimeResultSchema = z.object({
  t: z.number(),
  t_min: z.number(),
  t_hour: z.number(),
});
export type ITimeResult = z.infer<typeof ITimeResultSchema>;

// Схема для времени
export const ITimeSchema = z.object({
  resultTime: z.nullable(ITimeResultSchema),
  matList: z.array(IMaterialSchema),
  know_I: z.boolean(),
  know_m: z.boolean(),
  values: z.record(z.union([z.number(), z.null()])),
  units: z.record(unitsSchema),
  loading: z.boolean(),
  error: z.nullable(z.string()),
});
export type ITime = z.infer<typeof ITimeSchema>;
