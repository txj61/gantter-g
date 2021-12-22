/*
 * @Author: Anthan
 * @Date: 2021-12-09 16:08:56
 * @LastEditTime: 2021-12-10 11:21:45
 * @LastEditors: Anthan
 * @Description:
 */
import { BaseStyleProps } from '@antv/g';

export interface IColumn {
  key: string | number;
  name: string;
  width?: number;
}

export interface IProps {
  columns?: IColumn[];
  data?: { [key: string]: any }[];
  style?: BaseStyleProps;
}

export interface IScrollParams {
  positonY: number;
}

export interface IEmitEvent {
  onScroll?: (params: IScrollParams) => void;
}
