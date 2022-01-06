/*
 * @Author: Anthan
 * @Date: 2021-12-13 14:53:22
 * @LastEditTime: 2021-12-13 14:56:05
 * @LastEditors: Anthan
 * @Description:甘特图表格
 */
import { Group, Rect } from '@antv/g';
import type { Group as IGroup } from '@antv/g'
import { IProps } from './interface';
import { IGantterReplaceKeys, IData, IDateUnit } from '@/common/interface'
import { totalDateRange, dateUnit, gantterColumns } from '@/util/util'
import store, { styles } from '@/store'
import { BaseRow, BaseHeader, GantterBar } from '@/core'
import type { BaseRow as IBaseRow, BaseHeader as IBaseHeader } from '@/core'

export default class GantterTable extends Group {

  private replaceKey: Required<IGantterReplaceKeys> = {
    list: 'list',
    start: 'start',
    end: 'end',
    title: 'title',
    content: 'content',
    color: ''
  }

  private width: number

  private height: number

  private columns: string[] = []

  private data: IData[] = []

  private totalRangeDate: [Required<IGantterReplaceKeys>['start'], Required<IGantterReplaceKeys>['end']]

  private cellWidth: number = styles.gantterCellWidth

  private unit: IDateUnit = 'month'

  private header1!: IBaseHeader

  private header2!: IBaseHeader

  private content!: IGroup

  private scrollContent!: IGroup

  private columnsDate: { [key: string]: string[] } = {}

  private rows: IBaseRow[] = [];

  private _scrollTop: number = 0;

  private totalHeight: number = 0

  constructor({ replaceKey, style, data }: IProps) {
    super({ style });

    this.replaceKey = {
      ...this.replaceKey,
      ...replaceKey
    }
    this.data = data || []
    this.totalRangeDate = totalDateRange(this.data, this.replaceKey)
    this.width = this.style.clipPath.style.width
    this.height = this.style.clipPath.style.height

    store.setter('dateUnit', dateUnit(this.totalRangeDate[0], this.totalRangeDate[1]))
    this.unit = store.getter('dateUnit')

    this.columns = gantterColumns(this.totalRangeDate[0], this.totalRangeDate[1], this.unit)
    if(this.columns.length > 0){
      this.cellWidth = this.columns.length * styles.gantterCellWidth > this.width ? styles.gantterCellWidth : this.width / this.columns.length
    }

    this.renderHeader()
    this.renderRows()
    this.renderGantterBar()
  }

  public set tableScrollTop(v: number) {
    this._scrollTop = v;
    this.rows.forEach((item, index) => {
      item.style.y = styles.tableCellHeight * index + this.tableScrollTop;
    });
  }

  public get tableScrollTop(): number {
    return this._scrollTop;
  }

  private renderHeader(){
    if(this.unit === 'year'){
      this.header1 = new BaseHeader({
        columns: this.columns.map(item => {
          return {
            name: `${new Date(item).getFullYear()}年`,
            key: item,
            width: this.cellWidth
          }
        }),
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
    }else if(this.unit === 'month'){
      const years: string[] = Array.from(new Set(this.columns.map(item => new Date(item).getFullYear().toString())))
      years.forEach(item => {
        this.columnsDate[item] = this.columns.filter(i => new Date(i).getFullYear().toString() === item)
      })
      this.header1 = new BaseHeader({
        columns: Object.keys(this.columnsDate).map(item => {
          return {
            name: `${item}年`,
            key: item,
            width: this.columnsDate[item].length * this.cellWidth
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
        textStyle: {
          textAlign: 'center'
        }
      })
      this.header2 = new BaseHeader({
        columns: this.columns.map(item => {
          return {
            name: `${new Date(item).getMonth() + 1}月`,
            key: item,
            width: this.cellWidth
          }
        }),
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
    }else if(this.unit === 'day'){

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

    this.data.forEach((item, index) => {
      this.rows.push(
        new BaseRow({
          columns: this.columns.map(item => ({ name: '', key: item, width: this.cellWidth })),
          data: item,
          style: {
            x: 0,
            y: styles.tableCellHeight * index,
          },
        }),
      );
      this.scrollContent.appendChild(this.rows[index]);
      this.totalHeight += styles.tableCellHeight;
    });
  }

  private renderGantterBar(){
    this.data.forEach((item, index) => {
      this.scrollContent.appendChild(
        new GantterBar({
          list: item[this.replaceKey.list],
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
}
