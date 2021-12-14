/*
 * @Author: Anthan
 * @Date: 2021-12-09 16:08:56
 * @LastEditTime: 2021-12-10 11:21:45
 * @LastEditors: Anthan
 * @Description:
 */

export interface IColumn {
  key: string | number
  name: string
  width?: number
}

export interface IProps {
  width: number
  height: number
  columns?: IColumn[]
  data?: { [key: string]: any }[]
}
