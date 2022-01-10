import { Group, Rect } from '@antv/g'
import type { Rect as IRect } from '@antv/g'
import { IProps, IEmitEvent } from './interface'
import { styles, theme } from '@/store'
import { IPoint } from '@/common/interface'

export default class DragDivider extends Group {

  private isVertical: boolean = true

  private width: number

  private height!: number

  private divider!: IRect

  private _emitEvents!: IEmitEvent

  private diff!: number

  private point!: IPoint

  private isMouseDown: boolean = false

  constructor({ style, isVertical, width, height, position }: IProps){
    super({ style })

    this.isVertical = isVertical ?? this.isVertical
    this.width = this.isVertical ? styles.dragWeight : (width || 0)
    this.height = this.isVertical ? (height || 0) : styles.dragWeight
    this.point = this.isVertical ? { x: position, y: 0 } : { x: 0, y: position }

    this.render()
    this.bindEvent()
  }

  public emitEvent(
    eventName: keyof IEmitEvent,
    event: IEmitEvent[keyof IEmitEvent],
  ) {
    this._emitEvents[eventName] = event;
  }

  private render(){
    this.divider = new Rect({
      style: {
        width: this.width,
        height: this.height,
        x: this.isVertical ? -this.width / 2 : 0,
        y: this.isVertical ? 0 : -this.height / 2,
        fill: theme.dragDividerColor,
        cursor: this.isVertical ? 'col-resize' : 'row-resize'
      }
    })
    this.appendChild(this.divider)
  }

  private bindEvent(){
    this.divider.addEventListener('mousedown', (event: {[key: string]: any}) => {
      this.isMouseDown = true
      if(this.isVertical){
        this.diff = event.client.x - this.point.x
      }else{
        this.diff = event.client.y - this.point.y
      }
    })
    this.divider.addEventListener('mousemove', (event: {[key: string]: any}) => {
      if(this.isMouseDown && this.isVertical){
        this.style.x = event.client.x - this.diff
      }
    })
  }
}
