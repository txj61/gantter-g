/*
 * @Author: Anthan
 * @Date: 2021-12-10 09:40:18
 * @LastEditTime: 2021-12-10 12:45:23
 * @LastEditors: Anthan
 * @Description:
 */
import { BaseStyleProps } from '@antv/g'
import { IColumn } from '@/core/baseTable/interface'

export interface IProps {
  columns?: IColumn[]
  style?: BaseStyleProps
}
