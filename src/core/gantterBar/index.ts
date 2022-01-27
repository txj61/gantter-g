import { Group, Rect } from '@antv/g'
import { IProps, Position } from './interface'
import { IGantterItem, IColumn, IGantterReplaceKeys ,IDateUnit } from '@/common/interface'
import store, { styles, theme } from '@/store'
import { filterDate } from '@/util/util'
import { Popover } from '@/core'
import type { Popover as IPopover } from '@/core'
export default class GantterBar extends Group {

  private replaceKey: Required<IGantterReplaceKeys> = store.getter('gantterReplaceKeys')

  private dateUnit: IDateUnit = store.getter('dateUnit')

  private list: IGantterItem[] = []

  private columns: IColumn[]

  private cellWidth: number

  private cellHeight: number

  private barHeight: number = styles.gantterBarHeight

  public popover!: IPopover

  constructor({ style, list, columns, name, id, popover }: IProps){
    super({ style, name, id })

    this.list = list || []
    this.columns = columns || []
    this.cellWidth = this.columns.find(item => item.width)?.width || styles.gantterCellWidth
    this.cellHeight = this.style.clipPath.style.height
    this.popover = popover

    this.render()
  }

  private barColor(start: string, end: string): string{
    if(new Date(start) > new Date()){
      return theme.gantterUnbeginColor || ''
    }else if(new Date(end) < new Date()){
      return theme.gantterStopColor || ''
    }else{
      return theme.gantterProgressColor || ''
    }
  }

  private render(){
    this.list.forEach(item => {
      let startIndex: number = 0
      let endIndex: number = 1
      if(this.dateUnit === 'year'){
        startIndex = this.columns.findIndex(i => i.key === filterDate(new Date(item[this.replaceKey.start]), 'YYYY'))
        endIndex = this.columns.findIndex(i => i.key === filterDate(new Date(item[this.replaceKey.end]), 'YYYY'))
      }else if(this.dateUnit === 'month'){
        startIndex = this.columns.findIndex(i => i.key === filterDate(new Date(item[this.replaceKey.start]), 'YYYY-MM'))
        endIndex = this.columns.findIndex(i => i.key === filterDate(new Date(item[this.replaceKey.end]), 'YYYY-MM'))
      }else if(this.dateUnit === 'day'){
        startIndex = this.columns.findIndex(i => i.key === filterDate(new Date(item[this.replaceKey.start]), 'YYYY-MM-DD'))
        endIndex = this.columns.findIndex(i => i.key === filterDate(new Date(item[this.replaceKey.end]), 'YYYY-MM-DD'))
      }
      const bar = new Rect({
        style: {
          x: startIndex * this.cellWidth,
          y: (this.cellHeight - this.barHeight) / 2,
          width: (endIndex - startIndex + 1) * this.cellWidth,
          height: this.barHeight,
          fill: item.color || this.barColor(item[this.replaceKey.start], item[this.replaceKey.end])
        },
      })
      this.appendChild(bar)
      bar.addEventListener('mouseover', () => {
        bar.style.shadowBlur = styles.gantterBarshadowSize
        bar.style.shadowColor = theme.gantterBarShadowColor
        this.onMouseOver(item, {
          x: bar.getPosition()[0],
          y: bar.getPosition()[1],
          width: (endIndex - startIndex + 1) * this.cellWidth,
          height: this.barHeight,
        })
      })
      bar.addEventListener('mouseout', () => {
        bar.style.shadowBlur = undefined
        bar.style.shadowColor = undefined
        this.onMouseOut()
      })
    })
  }

  private onMouseOver(event: IGantterItem, position: Position){
    this.popover.content = event
    this.popover.targetNodeParams = position
    this.popover.show()
  }

  private onMouseOut(){
    this.popover.clear()
    this.popover.hide()
  }
}
