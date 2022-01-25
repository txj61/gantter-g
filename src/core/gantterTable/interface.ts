import { BaseStyleProps } from '@antv/g';
import { IColumn, IData } from '@/common/interface'
import type { Popover as IPopover } from '@/core'
export interface IProps {
  columns?: IColumn[]
  data?: IData[]
  style?: BaseStyleProps;
  popover: IPopover
}

export interface IScrollParams {
  positonY: number;
}

export interface IEmitEvent {
  onScroll?: (params: IScrollParams) => void;
}
