/*
 * @Author: Anthan
 * @Date: 2021-12-10 09:18:16
 * @LastEditTime: 2021-12-13 12:48:55
 * @LastEditors: Anthan
 * @Description:表格行
 */
import { Group } from '@antv/g'
import { BaseCell } from '@/core'
import { IProps } from './interface'
import { IColumn } from '@/common/interface'
import { theme, styles } from '@/store'

export default class BaseRow extends Group {

  private columns: IColumn[] = []

  private dividerSize: number = styles.tableHeaderDividerSize ?? styles.tableColDividerSize

  private dividerColor: string = theme.tableHeaderDividerColor ?? theme.tableColDividerColor ?? theme.borderColor

  private bottomBorderSize: number = styles.tableHeaderBottomBorderSize ?? styles.tableRowDividerSize

  private bottomBorderColor: string = theme.tableHeaderBottomBorderColor ?? theme.tableRowDividerColor ?? theme.borderColor

  private fontColor: string = theme.tableHeaderFontColor ?? theme.fontColor

  private fontSize: number = styles.tableHeaderFontSize ?? styles.fontSize

  private bacgroundColor: string = theme.tableHeaderBackgroundColor

  private cellWidth: number = styles.tableCellWidth

  private cellHeight: number = styles.tableCellHeight

  constructor({ columns, style }: IProps){
    super({ style })

    this.columns = columns ?? this.columns

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
          fill: this.bacgroundColor
        },
        textStyle: {
          text: item.name,
          fill: this.fontColor,
          fontSize: this.fontSize
        },
        leftBorder: {
          lineWidth: index ? this.dividerSize : 0,
          borderColor: this.dividerColor
        },
        bottomBorder: {
          lineWidth: this.bottomBorderSize,
          borderColor: this.bottomBorderColor
        }
      }))
      startX += item.width ?? this.cellWidth
    })
  }
}
