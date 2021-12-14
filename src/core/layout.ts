/*
 * @Author: Anthan
 * @Date: 2021-12-09 15:19:28
 * @LastEditTime: 2021-12-14 16:20:59
 * @LastEditors: Anthan
 * @Description:布局
 */

import { Group, IElement } from '@antv/g'
import { BaseTable, ScrollBar } from '@/core'
import type { BaseTable as IBaseTable, ScrollBar as IScrollBar } from '@/core'
import { IColumn } from '@/core/baseTable/interface'
import { theme, styles } from '@/store'

interface IProps{
  width: number
  height: number
  columns?: IColumn[]
  data?: { [key: string]: any }[]
}

export default class Layout extends Group {

  private baseTable: IBaseTable

  private scrollbar!: IScrollBar

  constructor({ width, height, columns, data }: IProps){
    super()

    // 左侧表格
    this.baseTable = new BaseTable({
      width: width / 2,
      height: height,
      columns,
      data
    })
    this.appendChild(this.baseTable)

    // 竖向滚动条
    this.scrollbar = new ScrollBar({
      scrollAreaLength: height,
      scrollTotalLength: this.baseTable.totalHeight,
      style: {
        x: width - styles.scrollWeight
      }
    })
    this.appendChild(this.scrollbar)
    this.scrollbar.emitEvent('onScroll', ({ positonY }) => {
      this.baseTable.scroll(positonY)
    })
  }

}
