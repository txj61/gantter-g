import { BaseStyleProps } from '@antv/g';
import { IColumn, IData } from '@/common/interface'
export interface IProps {
  columns?: IColumn[]
  data?: IData[]
  style?: BaseStyleProps;
}

export interface IScrollParams {
  positonY: number;
}

export interface IEmitEvent {
  onScroll?: (params: IScrollParams) => void;
}
