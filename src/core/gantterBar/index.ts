import { Group, Rect, Text } from '@antv/g'
import { IProps, Position } from './interface'
import { IGantterItem, IColumn, IGantterReplaceKeys } from '../../common/interface'
import store, { styles, theme } from '../../store'
import { filterDate } from '../../util/util'
import type { Popover as IPopover } from '../'
export default class GantterBar extends Group {

  private replaceKey: Required<IGantterReplaceKeys> = store.getter('gantterReplaceKeys')

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
      return store.getter('theme').gantterUnbeginColor || ''
    }else if(new Date(end) < new Date()){
      return store.getter('theme').gantterStopColor || ''
    }else{
      return store.getter('theme').gantterProgressColor || ''
    }
  }

  private render(){
    this.list.forEach(item => {
      let startIndex: number = 0
      let endIndex: number = 1
      if(store.getter('dateUnit') === 'year'){
        startIndex = this.columns.findIndex(i => i.key === filterDate(new Date(item[this.replaceKey.start]), 'YYYY'))
        endIndex = this.columns.findIndex(i => i.key === filterDate(new Date(item[this.replaceKey.end]), 'YYYY'))
      }else if(store.getter('dateUnit') === 'month'){
        startIndex = this.columns.findIndex(i => i.key === filterDate(new Date(item[this.replaceKey.start]), 'YYYY-MM'))
        endIndex = this.columns.findIndex(i => i.key === filterDate(new Date(item[this.replaceKey.end]), 'YYYY-MM'))
      }else if(store.getter('dateUnit') === 'day'){
        startIndex = this.columns.findIndex(i => i.key === filterDate(new Date(item[this.replaceKey.start]), 'YYYY-MM-DD'))
        endIndex = this.columns.findIndex(i => i.key === filterDate(new Date(item[this.replaceKey.end]), 'YYYY-MM-DD'))
      }
      const bar = new Rect({
        style: {
          x: startIndex * this.cellWidth,
          y: (this.cellHeight - this.barHeight) / 2,
          width: (endIndex - startIndex + 1) * this.cellWidth,
          height: this.barHeight,
          fill: item.color || this.barColor(item[this.replaceKey.start], item[this.replaceKey.end]),
          stroke: theme.gantterbarLineColor,
          lineWidth: styles.gantterBarLineWidth,
          radius: styles.gantterBarRadius
        },
      })
      this.appendChild(bar)
      if(store.getter('gantterBarText')?.show){
        const formatter = store.getter('gantterBarText')?.formatter
        bar.appendChild(new Text({
          style: {
            text: (formatter && formatter(item).text.toString()) || '',
            ...formatter && formatter(item).style,
            padding: 5,
            textBaseline: 'top',
            clipPath: new Rect({
              style: {
                width: (endIndex - startIndex + 1) * this.cellWidth,
                height: this.barHeight,
              }
            })
          }
        }))
      }
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
    if(store.getter('tooltip')?.show){
      this.popover.content = event
      this.popover.targetNodeParams = position
      this.popover.show()
    }
  }

  private onMouseOut(){
    if(store.getter('tooltip')?.show){
      this.popover.clear()
      this.popover.hide()
    }
  }
}
