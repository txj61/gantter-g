/*
 * @Author: Anthan
 * @Date: 2021-12-09 16:08:56
 * @LastEditTime: 2021-12-10 11:21:45
 * @LastEditors: Anthan
 * @Description:
 */
import { BaseStyleProps } from '@antv/g';
import { IColumn, IData } from '@/common/interface'

export interface IProps {
  columns?: IColumn[];
  data?: IData[];
  style?: BaseStyleProps;
}

export interface IScrollParams {
  positonY: number;
}

export interface IEmitEvent {
  onScroll?: (params: IScrollParams) => void;
}
