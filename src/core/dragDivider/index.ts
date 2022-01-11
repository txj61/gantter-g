import { Rect } from '@antv/g'
import { IProps, IEmitEvent } from './interface'

export default class DragDivider extends Rect {

  private isVertical: boolean = true

  private _emitEvents: IEmitEvent = {
    onDrag: () => {}
  }

  private isMouseDown: boolean = false

  constructor({ style }: IProps){
    super({ style })

    this.bindEvent()
  }

  public emitEvent(
    eventName: keyof IEmitEvent,
    event: IEmitEvent[keyof IEmitEvent],
  ) {
    this._emitEvents[eventName] = event;
  }

  private bindEvent(){
    this.addEventListener('mousedown', this.onMouseDown.bind(this))
    document.body.addEventListener('mousemove', this.onMouseMove.bind(this))
    document.body.addEventListener('mouseup', this.onMouseUp.bind(this))
  }

  private onMouseDown(){
    this.isMouseDown = true
  }

  private onMouseMove(event: {[key: string]: any}){
    event.preventDefault()
    if(this.isMouseDown && this.isVertical){
      this.style.x += event.movementX
      if(this._emitEvents.onDrag){
        this._emitEvents.onDrag({
          x: this.style.x
        })
      }
    }
  }

  private onMouseUp(){
    this.isMouseDown = false
  }
}
