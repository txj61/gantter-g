import { BaseStyleProps } from '@antv/g'

export interface IProps{
  style?: BaseStyleProps
  isVertical?: boolean
  width?: number
  height?: number
  position: number
}

export interface IParams {
  x?: number
  y?: number
}

export interface IEmitEvent {
  onDrag?: (params: IParams) => void
}
