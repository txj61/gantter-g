import { BaseStyleProps } from '@antv/g';
import { IGantterReplaceKeys, IColumn, IData } from '@/common/interface'
export interface IProps {
  columns?: IColumn[]
  data?: IData[]
  style?: BaseStyleProps;
  replaceKey?: IGantterReplaceKeys
}
