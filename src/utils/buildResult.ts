import { TimeResult } from '../types/data';

export const buildResult = (result: TimeResult): string => {
  const resultHour = result.t_hour;
  const resultMin = result.t_min;
  const resultSec = result.t;

  const resultString = `${resultHour ? resultHour : 0}ч ${
    resultMin ? resultMin : 0
  }мин ${resultSec ? resultSec : 0}сек`;

  return resultString;
};
