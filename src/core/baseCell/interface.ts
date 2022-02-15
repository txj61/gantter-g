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

export interface IMouseOverParams extends Event {
  detail: { text: string, [key: string]: any }
}

export interface IEmitEvent {
  onMouseOver?: (params: IMouseOverParams) => void;
  onMouseOut?: (params: IMouseOverParams) => void
}
