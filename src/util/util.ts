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
  Required<IGantterReplaceKeys>['start'],
  Required<IGantterReplaceKeys>['end'],
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
export const dateUnit = (start: Required<IGantterReplaceKeys>['start'], end: Required<IGantterReplaceKeys>['end']): IDateUnit => {
  const rangeDays: number = (new Date(end).getTime() - new Date(start).getTime()) / 1000 / 60 /60 / 24
  if(rangeDays > 365 * 4){
    return 'year'
  }else if(rangeDays > 30 * 2){
    return 'month'
  }else if(rangeDays > 7 * 2){
    return 'week'
  }else{
    return 'day'
  }
}

// 返回甘特图columns
export const gantterColumns = (start: Required<IGantterReplaceKeys>['start'], end: Required<IGantterReplaceKeys>['end'], unit: IDateUnit) => {
  const startDate: Date = new Date(start)
  const endDate: Date = new Date(end)
  const columns: string[] = []

  if(unit === 'year'){
    let i: number = startDate.getFullYear()
    while(i <= endDate.getFullYear()){
      columns.push(i.toString())
      i++
    }
  }else if(unit === 'month'){
    let i: Date = new Date(`${startDate.getFullYear()}-${startDate.getMonth() + 1}`)
    while(i <= endDate){
      columns.push(filterDate(i, 'YYYY-MM'))
      i = i.getMonth() === 11 ? new Date(`${i.getFullYear() + 1}-01-01`) : new Date(`${i.getFullYear()}-${i.getMonth() + 2}`)
    }
  }else if(unit === 'day'){
    let i: Date = startDate
    while(i <= endDate){
      columns.push(filterDate(i, 'YYYY-MM-DD'))
      i = new Date(i.getTime() + 1000 * 3600 * 24)
    }
  }

  return columns
}
