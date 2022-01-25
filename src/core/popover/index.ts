import { Group, Polygon, Rect } from '@antv/g'
import { IProps, ITargetParams } from './interface'
import type { Rect as IRect, Canvas as ICanvas } from '@antv/g'
import store, { styles } from '@/store'

export default class Popover extends Group {

  // private placementH: 'left' | 'center' | 'right' | 'auto' = 'auto'

  // private placementV: 'top' | 'bottom' | 'auto' = 'auto'

  private backgroundRect!: IRect

  private canvasWidth!: number

  private canvasHeight!: number

  constructor({ style }: IProps){
    super({ style })

    this.renderShape()
  }

  public set targetNodeParams(v: ITargetParams){
    const canvas: ICanvas = store.getter('container')
    this.canvasWidth = canvas.getConfig().width || styles.defaultWidth
    this.canvasHeight = canvas.getConfig().height || styles.defaultHeight
    if(v.x + styles.popoverWidth / 2 > this.canvasWidth){
      this.style.x = this.canvasWidth - styles.popoverWidth / 2
      this.backgroundRect.setAttribute('x', -styles.popoverWidth)
    }else{
      this.style.x = v.x + v.width / 2
      this.backgroundRect.setAttribute('x', -styles.popoverWidth / 2)
    }

    if(v.y < 50){

    }else{
      this.style.y = v.y - 50
    }
  }

  public set x(v: number){
    this.style.x = v
    this.backgroundRect.setAttribute('x', -styles.popoverWidth / 2)
  }

  public set y(v: number){
    this.style.y = v
  }

  private renderShape(){
    this.backgroundRect = new Rect({
      style: {
        width: styles.popoverWidth,
        height: 50,
        fill: '#fff',
        shadowBlur: 10,
        shadowColor: '#999999'
      }
    })
    this.appendChild(this.backgroundRect)
  }
}
