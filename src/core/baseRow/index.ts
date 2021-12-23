/*
 * @Author: Anthan
 * @Date: 2021-12-10 09:18:16
 * @LastEditTime: 2021-12-14 16:20:22
 * @LastEditors: Anthan
 * @Description:表格行
 */
import { Group, Line } from '@antv/g'
import { BaseCell } from '@/core'
import { IProps } from './interface'
import { ILine } from '@/common/interface'
import { IColumn } from '@/common/interface'
import { theme, styles } from '@/store'

export default class BaseRow extends Group {

  private columns: IColumn[] = []

  private data: { [key: string]: any} = {}

  private dividerSize: number = styles.tableColDividerSize

  private dividerColor: string = theme.tableColDividerColor ?? theme.borderColor

  private cellWidth: number = styles.tableCellWidth

  private cellHeight: number = styles.tableCellHeight

  private isOdd: boolean = false

  private oddBackground: string = theme.tableOddBackgroundColor

  private evenBackground: string = theme.tableEvenBackgroundColor

  private topBorder: ILine = {
    lineWidth: styles.tableRowDividerSize,
    borderColor: theme.tableRowDividerColor || theme.borderColor
  }

  private bottomborder: ILine = {
    lineWidth: styles.tableRowDividerSize,
    borderColor: theme.tableRowDividerColor || theme.borderColor
  }

  constructor({ columns, data, style, isOdd, topBorder, bottomborder }: IProps){
    super({ style })

    this.columns = columns ?? this.columns
    this.data = data ?? this.data
    this.isOdd = isOdd || this.isOdd
    this.topBorder = topBorder ?? this.topBorder
    this.bottomborder = bottomborder ?? this.bottomborder

    this.renderRow()

  }

  public renderRow(){
    let startX: number = 0
    this.columns.forEach((item, index) => {
      this.appendChild(new BaseCell({
        style: {
          x: startX
        },
        rectStyle: {
          width: item.width ?? this.cellWidth,
          height: this.cellHeight,
          fill: this.isOdd ? this.oddBackground : this.evenBackground,
        },
        textStyle: {
          text: this.data[item.key]
        },
        leftBorder: {
          lineWidth: index ? this.dividerSize : 0,
          borderColor: this.dividerColor
        }
      }))
      startX += item.width ?? this.cellWidth
    })

    if(this.topBorder.lineWidth > 0){
      this.appendChild(new Line({
        style: {
          x1: 0,
          y1: 0,
          x2: startX,
          y2: 0,
          stroke: this.topBorder.borderColor,
          lineWidth: this.topBorder.lineWidth
        }
      }))
    }
    if(this.bottomborder.lineWidth > 0){
      this.appendChild(new Line({
        style: {
          x1: 0,
          y1: this.cellHeight,
          x2: startX,
          y2: this.cellHeight,
          stroke: this.topBorder.borderColor,
          lineWidth: this.topBorder.lineWidth
        }
      }))
    }
  }
}
