/*
 * @Author: Anthan
 * @Date: 2021-12-13 14:20:41
 * @LastEditTime: 2021-12-14 13:59:51
 * @LastEditors: Anthan
 * @Description:
 */
import { BaseStyleProps } from '@antv/g'

export interface IProp {
  isVertical?: boolean
  scrollAreaLength: number
  scrollTotalLength: number
  minThumbLen?: number
  position?: number
  style: BaseStyleProps
}

export interface IParams {
  areaLength: number
  totalLength: number
  positonX: number
  positonY: number
}

export interface IEmitEvent {
  onScroll: (params: IParams) => void
}
