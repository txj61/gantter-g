/*
 * @Author: Anthan
 * @Date: 2021-12-07 16:17:53
 * @LastEditTime: 2021-12-09 12:54:43
 * @LastEditors: Anthan
 * @Description:
 */

export interface IColumn {
  key: string | number
  name: string
  width?: number
}

export interface IData {
  [key: string]: any
}
