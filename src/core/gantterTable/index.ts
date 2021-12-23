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

  constructor({ replaceKey, style, columns, data }: IProps) {
    super({ style });

    this.replaceKey = {
      ...this.replaceKey,
      ...replaceKey
    }
    this.columns = columns || []
    this.data = data || []

  }
}
