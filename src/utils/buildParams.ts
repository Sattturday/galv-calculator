import { ITime } from '../types/data';

export function buildParamsObject(values: ITime) {
  const params: { [key: string]: string | number | null } = {};
  const units: { [key: string]: string } = {};
  const numberValues: { [key: string]: number | null } = {};

  for (const key in values.units) {
    units[key] = values.units[key].param;
  }

  for (const key in values.values) {
    numberValues[key] = values.values[key];
  }

  return { ...params, ...units, ...numberValues };
}
