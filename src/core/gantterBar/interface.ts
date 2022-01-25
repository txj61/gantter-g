import { BaseStyleProps, DisplayObjectConfig } from '@antv/g';
import { IGantterItem, IColumn } from '@/common/interface'
import type { Popover as IPopover } from '@/core'
export interface IProps extends DisplayObjectConfig<BaseStyleProps> {
  columns?: IColumn[]
  list?: IGantterItem[]
  popover: IPopover
}

export interface Position {
  x: number
  y: number
  width: number
  height: number
}
