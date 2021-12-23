import { IData, IGantterReplaceKeys, IGantterItem } from '@/common/interface'

// 格式化日期
export const filterDate = (date: Date, format: string = 'YYYY-MM-DD'): string => {
  return format.replace('YYYY', date.getFullYear().toString())
    .replace('MM', (date.getMonth() >= 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`).toString())
    .replace('DD', (date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`).toString())
    .replace('hh', (date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`).toString())
    .replace('mm', (date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`).toString())
    .replace('ss', (date.getSeconds() >= 10 ? date.getSeconds() : `0${date.getSeconds()}`).toString())
}

// 计算总的日期范围
export const totalDateRange = (data: IData[], replaceKeys: Required<IGantterReplaceKeys>): [IGantterReplaceKeys['end'], IGantterReplaceKeys['start']] => {
  let max: IGantterReplaceKeys['end'] = filterDate(new Date(new Date().setDate(new Date().getDate() + 15)))
  let min: IGantterReplaceKeys['start'] = filterDate(new Date(new Date().setDate(new Date().getDate() - 15)))
  data.forEach((item) => {
    (item[replaceKeys.list] as IGantterItem[]).forEach(i => {
      if(!max || new Date(i[replaceKeys.end]) > new Date(max)){
        max = i[replaceKeys.end]
      }
      if(!min || new Date(i[replaceKeys.start]) < new Date(min)){
        min = i[replaceKeys.start]
      }
    })
  })
  return [max, min]
}
