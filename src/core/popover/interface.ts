import { DisplayObjectConfig, BaseStyleProps } from '@antv/g'

export interface IProps extends DisplayObjectConfig<BaseStyleProps> {

}

export interface ITargetParams {
  width: number
  height: number
  x: number
  y: number
}
