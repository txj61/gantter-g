/*
 * @Author: Anthan
 * @Date: 2021-12-13 14:53:22
 * @LastEditTime: 2021-12-13 14:56:05
 * @LastEditors: Anthan
 * @Description:甘特图表格
 */
import { Group } from '@antv/g';
import { IProps } from './interface';
import { IGantterReplaceKeys, IColumn, IData } from '@/common/interface'
import { totalDateRange, dateUnit } from '@/util/util'
import store from '@/store'

export default class GantterTable extends Group {

  private replaceKey: Required<IGantterReplaceKeys> = {
    list: 'list',
    start: 'start',
    end: 'end',
    title: 'title',
    content: 'content'
  }

  private columns: IColumn[] = []

  private data: IData[] = []

  private totalRangeDate: [IGantterReplaceKeys['start'], IGantterReplaceKeys['end']]

  constructor({ replaceKey, style, columns, data }: IProps) {
    super({ style });

    this.replaceKey = {
      ...this.replaceKey,
      ...replaceKey
    }
    this.columns = columns || []
    this.data = data || []
    this.totalRangeDate = totalDateRange(this.data, this.replaceKey)

    store.setter('dateUnit', dateUnit(this.totalRangeDate[0], this.totalRangeDate[1]))

  }

}
