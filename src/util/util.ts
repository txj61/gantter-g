import { IData, IGantterReplaceKeys, IGantterItem, IDateUnit } from '@/common/interface';

// 格式化日期
export const filterDate = (date: Date, format = 'YYYY-MM-DD'): string =>
  format
    .replace('YYYY', date.getFullYear().toString())
    .replace(
      'MM',
      (date.getMonth() >= 9
        ? date.getMonth() + 1
        : `0${date.getMonth() + 1}`
      ).toString(),
    )
    .replace(
      'DD',
      (date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`).toString(),
    )
    .replace(
      'hh',
      (date.getHours() >= 10
        ? date.getHours()
        : `0${date.getHours()}`
      ).toString(),
    )
    .replace(
      'mm',
      (date.getMinutes() >= 10
        ? date.getMinutes()
        : `0${date.getMinutes()}`
      ).toString(),
    )
    .replace(
      'ss',
      (date.getSeconds() >= 10
        ? date.getSeconds()
        : `0${date.getSeconds()}`
      ).toString(),
    );

// 计算总的日期范围
export const totalDateRange = (
  data: IData[],
  replaceKeys: Required<IGantterReplaceKeys>,
): [
  Required<IGantterReplaceKeys['start']>,
  Required<IGantterReplaceKeys['end']>,
] => {
  let max: IGantterReplaceKeys['end'] = filterDate(
    new Date(new Date().setDate(new Date().getDate() + 15)),
  );
  let min: IGantterReplaceKeys['start'] = filterDate(
    new Date(new Date().setDate(new Date().getDate() - 15)),
  );
  data.forEach(item => {
    (item[replaceKeys.list] as IGantterItem[]).forEach(i => {
      if (!max || new Date(i[replaceKeys.end]) > new Date(max)) {
        max = i[replaceKeys.end];
      }
      if (!min || new Date(i[replaceKeys.start]) < new Date(min)) {
        min = i[replaceKeys.start];
      }
    });
  });
  return [min, max];
};

// 根据日期范围返回日期单位
export const dateUnit = (start: Required<IGantterReplaceKeys['start']>, end: Required<IGantterReplaceKeys['end']>): IDateUnit => {
  const rangeDays: number = (new Date(end || '').getTime() - new Date(start || '').getTime()) / 1000 / 60 /60 / 24
  if(rangeDays > 365 * 2){
    return 'year'
  }else if(rangeDays > 30 * 2){
    return 'month'
  }else if(rangeDays > 7 * 2){
    return 'week'
  }else{
    return 'day'
  }
}
