import { BaseStyleProps } from '@antv/g';
import { IGantterItem, IColumn } from '@/common/interface'

export interface IProps {
  columns?: IColumn[]
  style?: BaseStyleProps
  list?: IGantterItem[]
}
