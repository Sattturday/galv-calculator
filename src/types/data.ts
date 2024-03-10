export interface ITime {
  matList: IMaterial[];
  know_I: boolean;
  know_m: boolean;
  m: number | null;
  units_m: string;
  I: number | null;
  units_I: string;
  q: number | null;
  units_q: string;
  wt: number | null;
  S: number | null;
  units_S: string;
  j: number | null;
  units_j: string;
  p: number | null;
  units_p: string;
  h: number | null;
  units_h: string;
  loading: boolean;
  error: string | null;
}

export interface IMaterial {
  name: string;
  q: string;
  p: string;
}
