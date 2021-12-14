/*
 * @Author: Anthan
 * @Date: 2021-12-09 17:09:40
 * @LastEditTime: 2021-12-10 15:25:18
 * @LastEditors: Anthan
 * @Description:
 */
import { TextStyleProps, RectStyleProps, BaseStyleProps } from '@antv/g'

export type ITextAlign = 'left' | 'center' | 'right'

export interface IBorder {
  lineWidth: number
  borderColor: string
}

export interface IProps {
  style?: BaseStyleProps,
  rectStyle?: RectStyleProps
  textStyle?: TextStyleProps
  leftBorder?: IBorder
  rightBorder?: IBorder
  topBorder?: IBorder
  bottomBorder?: IBorder
}
