/*
 * @Author: Anthan
 * @Date: 2021-12-09 17:07:52
 * @LastEditTime: 2021-12-14 16:07:39
 * @LastEditors: Anthan
 * @Description:表格单元格
 */
import { Group, Rect, Line, Text, RectStyleProps, TextStyleProps } from '@antv/g'
import { IProps } from './interface'
import { ILine } from '../../common/interface'
import { styles, theme } from '../../store'

export default class BaseCell extends Group {

  private rectStyle: RectStyleProps = {
    width: styles.tableCellWidth,
    height: styles.tableCellHeight,
    fill: theme.backgroundColor,
  }

  private textStyle: TextStyleProps = {
    text: '',
    fontFamily: styles.fontFamily,
    fontSize: styles.tableCellFontSize ?? styles.fontSize,
    fill: theme.tableCellFontColor ?? theme.fontColor,
    fontWeight: styles.tableCellFontWeight ?? styles.fontWeight,
    textBaseline: 'middle',
    textAlign: 'left',
    lineHeight: styles.tableCellHeight,
    padding: styles.tableCellPadding ?? 0,
  }

  private leftborder: ILine = {
    lineWidth: 0,
    borderColor: theme.tableColDividerColor || theme.borderColor
  }

  private rightBorder: ILine = {
    lineWidth: 0,
    borderColor: theme.tableColDividerColor || theme.borderColor
  }

  private topBorder: ILine = {
    lineWidth: 0,
    borderColor: theme.tableRowDividerColor || theme.borderColor
  }

  private bottomborder: ILine = {
    lineWidth: 0,
    borderColor: theme.tableRowDividerColor || theme.borderColor
  }

  constructor({ style, rectStyle, textStyle, leftBorder, rightBorder, topBorder, bottomBorder }: IProps = {}){
    super({ style })

    this.rectStyle = rectStyle ? {
      ...this.rectStyle,
      ...rectStyle
    } : this.rectStyle,
    this.textStyle = textStyle ? {
      ...this.textStyle,
      ...textStyle,
    } : this.textStyle
    this.leftborder = leftBorder ?? this.leftborder
    this.rightBorder = rightBorder ?? this.rightBorder
    this.topBorder = topBorder ?? this.topBorder
    this.bottomborder = bottomBorder ?? this.bottomborder

    this.renderCell()
    this.renderBorder()
    this.renderText()

  }

  private renderCell(){
    this.appendChild(new Rect({
      style: this.rectStyle
    }))
  }

  private renderText(){
    let x: number = 0
    let clipX: number = 0
    if(this.textStyle.textAlign === 'center'){
      x = this.rectStyle.width / 2 - (this.textStyle.padding || 0)
      clipX = -(this.rectStyle.width / 2 - (this.textStyle.padding || 0))
    }
    this.appendChild(new Text({
      style: {
        ...this.textStyle,
        x,
        y: this.rectStyle.height / 2 - (this.textStyle.padding || 0),
        clipPath: new Rect({
          style: {
            x: clipX,
            y: 0,
            width: this.rectStyle.width - (this.textStyle.padding || 0) * 2,
            height: this.rectStyle.height - (this.textStyle.padding || 0) * 2
          }
        })
      }
    }))
  }

  private renderBorder(){
    if(this.leftborder.lineWidth > 0){
      this.appendChild(new Line({
        style: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: this.rectStyle.height,
          stroke: this.leftborder.borderColor,
          lineWidth: this.leftborder.lineWidth,
        }
      }))
    }

    if(this.rightBorder.lineWidth > 0){
      this.appendChild(new Line({
        style: {
          x1: this.rectStyle.width,
          y1: 0,
          x2: this.rectStyle.width,
          y2: this.rectStyle.height,
          stroke: this.rightBorder.borderColor,
          lineWidth: this.rightBorder.lineWidth
        }
      }))
    }

    if(this.topBorder.lineWidth > 0){
      this.appendChild(new Line({
        style: {
          x1: 0,
          y1: 0,
          x2: this.rectStyle.width,
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
          y1: this.rectStyle.height,
          x2: this.rectStyle.width,
          y2: this.rectStyle.height,
          stroke: this.bottomborder.borderColor,
          lineWidth: this.bottomborder.lineWidth
        }
      }))
    }
  }
}
