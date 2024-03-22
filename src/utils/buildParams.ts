import { ITime } from '../types/data';

export function buildParamsObject(values: ITime) {
  const params: { [key: string]: string | number | null } = {};
  console.log('values:', values)
  for (const key in values) {
    if (
      key === 'know_m' ||
      key === 'know_I' ||
      key === 'matList' ||
      key === 'loading' ||
      key === 'error'
    ) {
      continue;
    } else if (
      key === 'units_m' ||
      key === 'units_I' ||
      key === 'units_q' ||
      key === 'units_S' ||
      key === 'units_j' ||
      key === 'units_p' ||
      key === 'units_h' 
      ) {
      params[key] = values[key].param;
    } else if (
      key === 'm' ||
      key === 'I' ||
      key === 'q' ||
      key === 'wt' ||
      key === 'S' ||
      key === 'j' ||
      key === 'p' ||
      key === 'h'
    ) {
      params[key] = values[key];
    }
  }

  return params;
}
