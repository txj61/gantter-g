import { RectStyleProps } from '@antv/g'

export interface IProps{
  style?: RectStyleProps
  isVertical?: boolean
  width?: number
  height?: number
}

export interface IParams {
  x?: number
  y?: number
}

export interface IEmitEvent {
  onDrag?: (params: IParams) => void
}
