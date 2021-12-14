/*
 * @Author: Anthan
 * @Date: 2021-12-09 16:02:31
 * @LastEditTime: 2021-12-14 16:27:47
 * @LastEditors: Anthan
 * @Description:左侧表格
 */
import { Group } from '@antv/g'
import type { Group as IGroup } from '@antv/g'
import { IProps, IColumn } from './interface'
import { BaseRow, BaseHeader } from '@/core'
import { styles } from '@/store'

export default class BaseTable extends Group {

  private columns: IColumn[]

  private data: { [key: string]: any }[]

  private width: number

  private height: number

  private rowHeight: number = styles.tableCellHeight

  private header!: IGroup

  private content!: IGroup

  private rows: IGroup[] = []

  public totalHeight: number = 0

  private _scrollTop: number = 0

  constructor({ columns, data, width, height }: IProps){
    super()

    this.columns = columns || []
    this.data = data || []
    this.width = width
    this.height = height

    this.renderRows()
    this.renderHeader()

    this.bindEvent()
  }

  public scroll(v: number){
    this._scrollTop = v
    this.content.style.y = this._scrollTop
  }

  public renderHeader(){
    this.header = new BaseHeader({
      columns: this.columns
    })
    this.appendChild(this.header)
  }

  public renderRows(){
    this.content = new Group({
      style: {
        y: this.rowHeight
      }
    })
    this.appendChild(this.content)

    this.data.forEach((item, index) => {
      this.rows.push(new BaseRow({
        columns: this.columns,
        data: item,
        isOdd: !!(index % 2),
        style: {
          x: 0,
          y: this.rowHeight * index
        },
      }))
      this.content.appendChild(this.rows[index])
      this.totalHeight += this.rowHeight
    })
  }

  private bindEvent(){
    this.content.addEventListener('wheel', () => {
      console.log('asdsa')

    })
  }
}
