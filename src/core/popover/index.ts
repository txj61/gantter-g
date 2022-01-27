import { Group, Rect, Text, TextStyleProps } from '@antv/g'
import { IProps, ITargetParams } from './interface'
import type { Rect as IRect, Canvas as ICanvas, Text as IText } from '@antv/g'
import store, { styles, theme } from '@/store'
import { IGantterItem, IGantterReplaceKeys, ITooltip } from '@/common/interface'

export default class Popover extends Group {

  // private placementH: 'left' | 'center' | 'right' | 'auto' = 'auto'

  // private placementV: 'top' | 'bottom' | 'auto' = 'auto'

  private backgroundRect!: IRect

  private canvasWidth!: number

  private canvasHeight!: number

  private height: number = 0

  private defaultTextStyle: Partial<TextStyleProps> = {
    textBaseline: 'top',
    textAlign: 'left',
    padding: 5,
    wordWrapWidth: styles.popoverWidth - styles.popoverTextPadding * 2,
    wordWrap: true
  }

  constructor({ style }: IProps){
    super({ style })

    this.renderShape()
  }

  public set targetNodeParams(v: ITargetParams){
    const canvas = store.getter('container')
    this.canvasWidth = canvas && canvas.getConfig().width || styles.defaultWidth
    this.canvasHeight = canvas && canvas.getConfig().height || styles.defaultHeight

    if(v.x + styles.popoverWidth / 2 + v.width / 2 > this.canvasWidth){
      this.style.x = this.canvasWidth - styles.popoverWidth - 10
    }else{
      this.style.x = v.x + v.width / 2
      this.backgroundRect.setAttribute('x', -styles.popoverWidth / 2)
    }

    if(v.y < this.height){
      this.style.y = v.y + v.height + 15
      this.backgroundRect.setAttribute('y', 6)
    }else{
      this.style.y = v.y - this.height - 15
      this.backgroundRect.setAttribute('y', -6)
    }
  }

  public set content(v: IGantterItem){
    this.height = 0

    const formatter = store.getter('tooltip')?.formatter

    formatter && formatter(v).forEach(item => {
      const text = new Text({
        name: 'popover_text',
        style: {
          ...this.defaultTextStyle,
          ...item.style,
          text: typeof item.text === 'string' ? item.text : item.text.toString(),
          x: this.backgroundRect.style.x,
          y: this.height
        }
      })
      this.appendChild(text)
      this.height += text.getBoundingClientRect().height
    })

    this.backgroundRect.style.height = this.height + 15
  }

  public clear(){
    this.getElementsByName('popover_text').forEach(item => {
      this.removeChild(item)
    })
    this.height = 0
  }

  private renderShape(){
    this.backgroundRect = new Rect({
      style: {
        width: styles.popoverWidth,
        height: this.height,
        fill: theme.popoverBackground,
        shadowBlur: styles.popoverShadowBlur,
        shadowColor: theme.popoverShadowColor
      }
    })
    this.appendChild(this.backgroundRect)
  }
}
