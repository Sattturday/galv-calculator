import { z } from 'zod';

// Схема для единиц измерения
const UnitsSchema = z.record(z.string());
export type Units = z.infer<typeof UnitsSchema>;

// Схема для материала
const MaterialSchema = z.object({
  name: z.string(),
  q: z.string(),
  p: z.string(),
});
export type Material = z.infer<typeof MaterialSchema>;

// Схема для стейта материалов
const MaterialStateSchema = z.object({
  matList: z.array(MaterialSchema),
  loading: z.boolean(),
  error: z.nullable(z.string()),
});
export type MaterialState = z.infer<typeof MaterialStateSchema>;

// Схема для результата времени
const TimeResultSchema = z.object({
  t: z.number(),
  t_min: z.number(),
  t_hour: z.number(),
});
export type TimeResult = z.infer<typeof TimeResultSchema>;

// Схема для времени
export const TimeSchema = z.object({
  resultTime: z.nullable(TimeResultSchema),
  know_I: z.boolean(),
  know_m: z.boolean(),
  values: z.record(z.union([z.number(), z.null()])),
  units: z.record(UnitsSchema),
  loading: z.boolean(),
  error: z.nullable(z.string()),
});
export type Time = z.infer<typeof TimeSchema>;

// Схема для результата толщины
const ThicknessResultSchema = z.object({
  h_m: z.number(),
  h_milli: z.number(),
  h_micro: z.number(),
});
export type ThicknessResult = z.infer<typeof ThicknessResultSchema>;

// Схема для толщины
export const ThicknessSchema = z.object({
  resultThickness: z.nullable(ThicknessResultSchema),
  know_m: z.boolean(),
  know_j: z.boolean(),
  values: z.record(z.union([z.number(), z.null()])),
  units: z.record(UnitsSchema),
  loading: z.boolean(),
  error: z.nullable(z.string()),
});
export type Thickness = z.infer<typeof ThicknessSchema>;

// Схема для результата массы
const WeightResultSchema = z.object({
  m: z.number(),
});
export type WeightResult = z.infer<typeof WeightResultSchema>;

// Схема для массы
export const WeightSchema = z.object({
  resultWeight: z.nullable(WeightResultSchema),
  know_h: z.boolean(),
  know_I: z.boolean(),
  values: z.record(z.union([z.number(), z.null()])),
  units: z.record(UnitsSchema),
  loading: z.boolean(),
  error: z.nullable(z.string()),
});
export type Weight = z.infer<typeof WeightSchema>;
