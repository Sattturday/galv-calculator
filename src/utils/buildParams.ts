import { Amperage, Density, Thickness, Time, Weight } from '../types/data';

export function buildParamsTimeObject(values: Time) {
  const units: { [key: string]: string } = {};
  const numberValues: { [key: string]: number | null } = {};

  for (const key in values.units) {
    units[key] = values.units[key].param;
  }

  for (const key in values.values) {
    numberValues[key] = values.values[key];
  }

  return { ...units, ...numberValues };
}

export function buildParamsThicknessObject(values: Thickness) {
  const units: { [key: string]: string } = {};
  const numberValues: { [key: string]: number | null } = {};

  for (const key in values.units) {
    units[key] = values.units[key].param;
  }

  for (const key in values.values) {
    numberValues[key] = values.values[key];
  }

  return { ...units, ...numberValues };
}

export function buildParamsWeightObject(values: Weight) {
  const units: { [key: string]: string } = {};
  const numberValues: { [key: string]: number | null } = {};

  for (const key in values.units) {
    units[key] = values.units[key].param;
  }

  for (const key in values.values) {
    numberValues[key] = values.values[key];
  }

  return { ...units, ...numberValues };
}

export function buildParamsDensityObject(values: Density) {
  const units: { [key: string]: string } = {};
  const numberValues: { [key: string]: number | null } = {};

  for (const key in values.units) {
    units[key] = values.units[key].param;
  }

  for (const key in values.values) {
    const count = values.counts[`count_${key}`];
    const value = values.values[key];
    if (count !== undefined) {
      numberValues[key] = value !== null ? +(value * count).toFixed(4) : null;
    } else {
      numberValues[key] = value;
    }
  }

  return { ...units, ...numberValues };
}

export function buildParamsAmperageObject(values: Amperage) {
  const units: { [key: string]: string } = {};
  const numberValues: { [key: string]: number | null } = {};

  for (const key in values.units) {
    units[key] = values.units[key].param;
  }

  for (const key in values.values) {
    const count = values.counts[`count_${key}`];
    const value = values.values[key];
    if (count !== undefined) {
      numberValues[key] = value !== null ? +(value * count).toFixed(4) : null;
    } else {
      numberValues[key] = value;
    }
  }

  return { ...units, ...numberValues };
}
