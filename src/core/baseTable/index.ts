/*
 * @Author: Anthan
 * @Date: 2021-12-09 16:02:31
 * @LastEditTime: 2021-12-14 16:27:47
 * @LastEditors: Anthan
 * @Description:左侧表格
 */
import { Group, Rect } from '@antv/g';
import type { Group as IGroup } from '@antv/g';
import { IProps, IEmitEvent } from './interface';
import { IColumn, IData } from '@/common/interface'
import { BaseRow, BaseHeader, ScrollBar } from '@/core';
import { styles } from '@/store';
import type { BaseRow as IBaseRow, BaseHeader as IBaseHeader, ScrollBar as IScrollBar } from '@/core'

export default class BaseTable extends Group {
  public totalHeight: number = 0;

  private readonly columns: IColumn[];

  private readonly data: IData[];

  private readonly width: number;

  private readonly height: number;

  private readonly rowHeight: number = styles.tableCellHeight;

  private header!: IBaseHeader;

  private content!: IGroup;

  private scrollContent!: IGroup

  private readonly rows: IBaseRow[] = [];

  private scrollBar!: IScrollBar

  private totalWidth!: number

  private _scrollTop: number = 0;

  private _headerHeight: number = styles.tableCellHeight * 2;

  private _emitEvents: IEmitEvent = {
    onScroll: undefined,
  };

  constructor({ columns, data, style }: IProps) {
    super({ style });

    this.columns = columns || [];
    this.data = data || [];
    this.width = this.style.clipPath.style.width;
    this.height = this.style.clipPath.style.height;
    this.totalWidth = this.columns.reduce((total, item) => {
      return item.width ? total + item.width : total + styles.tableCellWidth
    }, 0)

    this.renderRows();
    this.renderHeader();
    this.renderScrollBar()

    this.bindEvent();
  }

  public set tableScrollTop(v: number) {
    this._scrollTop = v;
    this.rows.forEach((item, index) => {
      item.style.y = this.rowHeight * index + this.tableScrollTop;
    });
  }

  public get tableScrollTop(): number {
    return this._scrollTop;
  }

  public get tableScrollHeight(): number {
    return this.content.style.clipPath.style.height
  }

  public get headerHeight(): number {
    return this._headerHeight
  }

  public emitEvent(
    eventName: keyof IEmitEvent,
    event: IEmitEvent[keyof IEmitEvent],
  ) {
    this._emitEvents[eventName] = event;
  }

  public renderHeader() {
    this.header = new BaseHeader({
      columns: this.columns,
      style: {
        clipPath: new Rect({
          style: {
            width: this.totalWidth,
            height: this._headerHeight
          }
        })
      }
    });
    this.appendChild(this.header);
  }

  public renderRows() {
    this.content = new Group({
      style: {
        y: this._headerHeight,
        clipPath: new Rect({
          style: {
            width: this.totalWidth,
            height: this.height - this._headerHeight,
          },
        }),
      },
    });
    this.appendChild(this.content);

    this.scrollContent = new Group({
      style: {
        y: this.tableScrollTop
      }
    })
    this.content.appendChild(this.scrollContent)

    this.data.forEach((item, index) => {
      this.rows.push(
        new BaseRow({
          columns: this.columns,
          data: item,
          isOdd: Boolean(index % 2),
          style: {
            x: 0,
            y: this.rowHeight * index,
          },
        }),
      );
      this.scrollContent.appendChild(this.rows[index]);
      this.totalHeight += this.rowHeight;
    });
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
      this.header.style.x = positonX
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
