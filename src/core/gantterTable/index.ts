/*
 * @Author: Anthan
 * @Date: 2021-12-13 14:53:22
 * @LastEditTime: 2021-12-13 14:56:05
 * @LastEditors: Anthan
 * @Description:甘特图表格
 */
import { Group, Rect, Line } from '@antv/g';
import type { Group as IGroup } from '@antv/g'
import { IProps, IEmitEvent } from './interface';
import { IGantterReplaceKeys, IData, IDateUnit, IColumn, ISize } from '@/common/interface'
import { totalDateRange, dateUnit, gantterColumns, filterDate } from '@/util/util'
import store, { styles, theme } from '@/store'
import { BaseHeader, GantterBar, ScrollBar } from '@/core'
import type { BaseHeader as IBaseHeader, ScrollBar as IScrollBar } from '@/core'

export default class GantterTable extends Group {

  private replaceKey: Required<IGantterReplaceKeys> = store.getter('gantterReplaceKeys')

  private width: number

  private height: number

  private columns: IColumn[] = []

  private data: IData[] = []

  private totalRangeDate: [Required<IGantterReplaceKeys>['start'], Required<IGantterReplaceKeys>['end']]

  private cellWidth: number = styles.gantterCellWidth

  private unit: IDateUnit = 'month'

  private header1!: IBaseHeader

  private header2!: IBaseHeader

  private content!: IGroup

  private scrollContent!: IGroup

  private scrollBar!: IScrollBar

  private _scrollTop: number = 0;

  private totalHeight: number = 0

  private totalWidth: number = 0

  private _emitEvents: IEmitEvent = {
    onScroll: undefined,
  };

  constructor({ style, data }: IProps) {
    super({ style });

    this.data = data || []
    this.totalRangeDate = totalDateRange(this.data, this.replaceKey)
    this.width = this.style.clipPath.style.width
    this.height = this.style.clipPath.style.height

    store.setter('dateUnit', dateUnit(this.totalRangeDate[0], this.totalRangeDate[1]))
    this.unit = store.getter('dateUnit')

    const dateArr: string[] = gantterColumns(this.totalRangeDate[0], this.totalRangeDate[1], this.unit)
    this.cellWidth = dateArr.length * this.cellWidth > this.width ? this.cellWidth : this.width / dateArr.length
    this.columns = dateArr.map(item => {
      return {
        name: item,
        key: item,
        width: this.cellWidth
      }
    })

    this.renderHeader()
    this.renderRows()
    this.renderGantterBar()
    this.renderScrollBar()
    this.bindEvent()
  }

  public set tableScrollTop(v: number) {
    this._scrollTop = v;
    this.scrollContent.style.y = this._scrollTop
  }

  public get tableScrollTop(): number {
    return this._scrollTop;
  }

  public emitEvent(
    eventName: keyof IEmitEvent,
    event: IEmitEvent[keyof IEmitEvent],
  ) {
    this._emitEvents[eventName] = event;
  }

  public resize({ width, height }: ISize){
    this.width = width ?? this.width
    this.height = height ?? this.height
    this.style.clipPath.style.width = this.width
    this.style.clipPath.style.height = this.height
    this.content.style.clipPath.style.width = this.width
    this.content.style.clipPath.style.height = this.height - styles.tableCellHeight * 2
    this.scrollBar.scrollAreaLength = this.width
  }

  private renderHeader(){
    if(this.unit === 'year'){
      this.header1 = new BaseHeader({
        columns: this.columns,
        style: {
          clipPath: new Rect({
            style: {
              width: this.columns.length * this.cellWidth,
              height: styles.tableCellHeight * 2
            }
          })
        },
        textStyle: {
          textAlign: 'center'
        }
      })
      this.appendChild(this.header1)
      this.totalWidth = this.header1.style.clipPath.style.width
    }else if(this.unit === 'month'){
      const years: number[] = Array.from(new Set(this.columns.map(item => new Date(item.key).getFullYear())))
      this.header1 = new BaseHeader({
        columns: years.map(year => {
          return {
            name: `${year}年`,
            key: year.toString(),
            width: this.columns.filter(item => new Date(item.key).getFullYear() === year).length * this.cellWidth
          }
        }),
        style: {
          clipPath: new Rect({
            style: {
              width: this.columns.length * this.cellWidth,
              height: styles.tableCellHeight
            }
          })
        },
        textStyle: { textAlign: 'center' }
      })
      this.header2 = new BaseHeader({
        columns: this.columns.map(item => ({ ...item, name: `${new Date(item.name).getMonth() + 1}月` })),
        style: {
          y: styles.tableCellHeight,
          clipPath: new Rect({
            style: {
              width: this.columns.length * this.cellWidth,
              height: styles.tableCellHeight
            }
          })
        }
      })
      this.appendChild(this.header1)
      this.appendChild(this.header2)
      this.totalWidth = this.header1.style.clipPath.style.width
    }else if(this.unit === 'day'){
      const months: IColumn[] = Array.from(
        new Set(this.columns.map(item => (filterDate(new Date(item.key), 'YYYY-MM'))))
      ).map(item => ({
        key: item,
        name: `${item.split('-')[0]}年${item.split('-')[1]}月`,
        width: this.columns.filter(i => filterDate(new Date(i.key), 'YYYY-MM') === item).length * this.cellWidth
      }))
      this.header1 = new BaseHeader({
        columns: months,
        style: {
          clipPath: new Rect({
            style: {
              width: this.columns.length * this.cellWidth,
              height: styles.tableCellHeight
            }
          })
        },
        textStyle: { textAlign: 'center' }
      })
      this.header2 = new BaseHeader({
        columns: this.columns.map(item => ({ ...item, name: `${new Date(item.name).getDate()}`})),
        style: {
          y: styles.tableCellHeight,
          clipPath: new Rect({
            style: {
              width: this.columns.length * this.cellWidth,
              height: styles.tableCellHeight
            }
          })
        }
      })
      this.appendChild(this.header1)
      this.appendChild(this.header2)
      this.totalWidth = this.header1.style.clipPath.style.width
    }
  }

  private renderRows(){
    this.content = new Group({
      style: {
        y: styles.tableCellHeight * 2,
        clipPath: new Rect({
          style: {
            width: this.width,
            height: this.height - styles.tableCellHeight * 2,
          },
        }),
      },
    });
    this.appendChild(this.content)

    this.scrollContent = new Group({
      style: {
        y: this.tableScrollTop,
      }
    })
    this.content.appendChild(this.scrollContent)

    // 横向分割线
    this.data.forEach((_, index) => {
      this.scrollContent.appendChild(new Line({
        style: {
          x1: 0,
          y1: styles.tableCellHeight * index,
          x2: this.columns.length * this.cellWidth,
          y2: styles.tableCellHeight * index,
          stroke: theme.gantterDividerColor,
          lineWidth: styles.gantterDividerSize
        }
      }))
      this.totalHeight += styles.tableCellHeight
    })

    // 纵向分割线
    this.columns.forEach((_, index) => {
      this.scrollContent.appendChild(new Line({
        style: {
          x1: this.cellWidth * index,
          y1: 0,
          x2: this.cellWidth * index,
          y2: styles.tableCellHeight * this.data.length,
          stroke: theme.gantterDividerColor,
          lineWidth: styles.gantterDividerSize
        }
      }))
    })
  }

  private renderGantterBar(){
    this.data.forEach((item, index) => {
      this.scrollContent.appendChild(
        new GantterBar({
          list: item[this.replaceKey.list],
          columns: this.columns,
          style: {
            x: 0,
            y: styles.tableCellHeight * index,
            clipPath: new Rect({
              style: {
                width: this.cellWidth * this.columns.length,
                height: styles.tableCellHeight
              }
            })
          }
        })
      )
    })
  }

  private renderScrollBar(){
    this.scrollBar = new ScrollBar({
      isVertical: false,
      scrollAreaLength: this.width,
      scrollTotalLength: this.totalWidth,
      style: {
        y: this.height - styles.scrollWeight
      }
    })
    this.appendChild(this.scrollBar)
    this.scrollBar.emitEvent('onScroll', ({ positonX }) => {
      this.header1.style.x = positonX
      this.header2.style.x = positonX
      this.scrollContent.style.x = positonX
    })
  }

  private bindEvent() {
    this.content.addEventListener('wheel', this.wheelEvent.bind(this));
  }

  private wheelEvent(event: any) {
    if (this.tableScrollTop >= 0 && event.deltaY < 0) {
      this.tableScrollTop = 0;
    } else if (
      this.tableScrollTop <= -(this.totalHeight - this.content.style.clipPath.style.height) &&
      event.deltaY > 0
    ) {
      this.tableScrollTop = -(this.totalHeight - this.content.style.clipPath.style.height);
    } else {
      this.tableScrollTop -= event.deltaY / 2;
    }
    if (this._emitEvents.onScroll) {
      this._emitEvents.onScroll({
        positonY: this.tableScrollTop,
      });
    }
  }
}
