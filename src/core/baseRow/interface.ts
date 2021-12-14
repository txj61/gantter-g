/*
 * @Author: Anthan
 * @Date: 2021-12-10 09:40:18
 * @LastEditTime: 2021-12-14 16:10:01
 * @LastEditors: Anthan
 * @Description:
 */
import { BaseStyleProps } from '@antv/g'
import { IColumn } from '@/core/baseTable/interface'
import { ILine } from '@/common/interface'

export interface IProps {
  columns?: IColumn[]
  data?: { [key: string ]: any }
  style?: BaseStyleProps
  isOdd?: boolean
  topBorder?: ILine
  bottomborder?: ILine
}
