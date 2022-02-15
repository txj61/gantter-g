/*
 * @Author: Anthan
 * @Date: 2021-12-09 17:11:29
 * @LastEditTime: 2021-12-14 16:06:58
 * @LastEditors: Anthan
 * @Description:
 */
import { TextStyleProps } from '@antv/g'
import { ITheme } from '@/theme/interface'

export interface IBaseShape {
  width?: number
  height?: number
  x?: number
  y?: number
  theme?: ITheme
}

export interface ILine {
  lineWidth: number
  borderColor: string
}

export interface IPoint {
  x: number
  y: number
}

export type IGantterReplaceKeys =  {
  list?: string,
  start?: string,
  end?: string,
  title?: string,
  content?: string,
  color?: string
}
export interface IColumn {
  key: string
  name: string
  width?: number
  tooltip?: boolean
}

export interface IGantterItem{
  [key: Required<IGantterReplaceKeys>[keyof Omit<IGantterReplaceKeys, 'list'>]]: string
}

export interface IGantterData {
  [key: Required<IGantterReplaceKeys>['list']]: IGantterItem[]
}
export interface IData extends IGantterData {
  [key: IColumn['key']]: any
}

export type IDateUnit = 'year' | 'month' | 'week' | 'day'

export interface ISize {
  width?: number
  height?: number
}

export interface IGantterBarOverProps {
  x: number
  y: number
  width: number
  height: number
  [key: Required<IGantterReplaceKeys>[keyof Omit<IGantterReplaceKeys, 'list'>]]: string | number
}

export interface ITooltip {
  show?: boolean
  formatter?: (item: IGantterItem) => { text: string | number, style?: Omit<TextStyleProps, 'text'> }[]
}

export interface IGantterBarText {
  show?: boolean,
  formatter?: (item: IGantterItem) => { text: string | number, style?: Omit<TextStyleProps, 'text'> }
}

export interface IEvent {
  onMouseOverGantterBar?: (props: IGantterBarOverProps) => void
  onMouseOutGantterBar?: () => void
}
