import { Density, Thickness, Time, Weight } from '../types/data';

export function buildParamsTimeObject(values: Time) {
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

export function buildParamsThicknessObject(values: Thickness) {
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

export function buildParamsWeightObject(values: Weight) {
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

export function buildParamsDensityObject(values: Density) {
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
