/*
 * @Author: Anthan
 * @Date: 2021-12-09 17:11:29
 * @LastEditTime: 2021-12-14 16:06:58
 * @LastEditors: Anthan
 * @Description:
 */
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
  start?: string | Date,
  end?:string | Date,
  title?: string,
  content?: string
}
export interface IColumn {
  key: string | number
  name: string
  width?: number
}

export interface IData {
  [key: IColumn['key']]: any
}
