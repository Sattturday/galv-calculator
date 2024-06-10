// export const BASE_URL = 'http://89.104.70.160/api/';
// export const BASE_URL = 'http://89.111.175.252/api/';
export const BASE_URL = 'https://www.gal-calc.ru/api/';

const units_SS = [
  { title: 'м²', id: 'm2', param: 'м2' },
  { title: 'дм²', id: 'dm2', param: 'дм2' },
  { title: 'см²', id: 'sm2', param: 'см2' },
  { title: 'мм²', id: 'mm2', param: 'мм2' },
];

export const unitsButtons: { [key: string]: { [key: string]: string }[] } = {
  units_m: [
    { title: 'кг', id: 'kg', param: 'кг' },
    { title: 'г', id: 'g', param: 'г' },
    { title: 'мг', id: 'mg', param: 'мг' },
  ],
  units_I: [
    { title: 'А', id: 'A', param: 'А' },
    { title: 'мА', id: 'mA', param: 'мА' },
  ],
  units_q: [
    { title: 'мг/Кл', id: 'mg/Kl', param: 'мг/Кл' },
    { title: 'г/(А∙ч)', id: 'g/(A*h)', param: 'г/(А∙ч)' },
  ],
  units_S: units_SS,
  units_j: [
    { title: 'А/дм²', id: 'A/dm2', param: 'А/дм2' },
    { title: 'мА/см²', id: 'mA/sm2', param: 'мА/см2' },
  ],
  units_p: [
    { title: 'кг/м³', id: 'kg/m3', param: 'кг/м3' },
    { title: 'г/см³', id: 'g/sm3', param: 'г/см3' },
  ],
  units_h: [
    { title: 'мкм', id: 'mkm', param: 'мкм' },
    { title: 'мм', id: 'mm', param: 'мм' },
  ],
  units_t: [
    { title: 'ч', id: 'h', param: 'ч' },
    { title: 'мин', id: 'm', param: 'мин' },
    { title: 'сек', id: 's', param: 'сек' },
  ],
  units_result: [
    { title: 'м', id: 'm', param: 'м' },
    { title: 'мм', id: 'mm', param: 'мм' },
    { title: 'мкм', id: 'mkm', param: 'мкм' },
  ],
  units_S1: units_SS,
  units_S2: units_SS,
  units_S3: units_SS,
  units_S4: units_SS,
  units_S5: units_SS,
  units_S6: units_SS,
  units_S7: units_SS,
  units_S8: units_SS,
  units_S9: units_SS,
  units_S10: units_SS,
  units_S11: units_SS,
  units_S12: units_SS,
  units_S13: units_SS,
  units_S14: units_SS,
  units_S15: units_SS,
  units_S16: units_SS,
  units_S17: units_SS,
  units_S18: units_SS,
  units_S19: units_SS,
  units_S20: units_SS,
};
