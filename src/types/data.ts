export interface ITime {
  resultTime: ITimeResult | null;
  matList: IMaterial[];
  know_I: boolean;
  know_m: boolean;
  m: number | null;
  units_m: { [key: string]: string };
  I: number | null;
  units_I: { [key: string]: string };
  q: number | null;
  units_q: { [key: string]: string };
  wt: number | null;
  S: number | null;
  units_S: { [key: string]: string };
  j: number | null;
  units_j: { [key: string]: string };
  p: number | null;
  units_p: { [key: string]: string };
  h: number | null;
  units_h: { [key: string]: string };
  loading: boolean;
  error: string | null;
}

export interface IMaterial {
  name: string;
  q: string;
  p: string;
}

export interface ITimeResult {
  t: number;
  t_min: number;
  t_hour: number;
}
