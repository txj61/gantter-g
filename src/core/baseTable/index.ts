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
import { BaseRow, BaseHeader } from '@/core';
import { styles } from '@/store';

export default class BaseTable extends Group {
  public totalHeight: number = 0;

  private readonly columns: IColumn[];

  private readonly data: IData[];

  private readonly width: number;

  private readonly height: number;

  private readonly rowHeight: number = styles.tableCellHeight;

  private header!: IGroup;

  private content!: IGroup;

  private readonly rows: IGroup[] = [];

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

    this.renderRows();
    this.renderHeader();

    this.bindEvent();
  }

  public set tableScrollTop(v: number) {
    this._scrollTop = v;
    this.rows.forEach((item, index) => {
      item.style.y = this.rowHeight * index + this.tableScrollTop;
    });
    // this.content.style.y = this._scrollTop
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
            width: this.width,
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
            width: this.width,
            height: this.height - this._headerHeight,
          },
        }),
      },
    });

    this.data.forEach((item, index) => {
      this.rows.push(
        new BaseRow({
          columns: this.columns,
          data: item,
          isOdd: Boolean(index % 2),
          style: {
            x: 0,
            y: this.rowHeight * index + this.tableScrollTop,
          },
        }),
      );
      this.content.appendChild(this.rows[index]);
      this.totalHeight += this.rowHeight;
    });

    this.appendChild(this.content);
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
      if (this._emitEvents.onScroll) {
        this._emitEvents.onScroll({
          positonY: this.tableScrollTop,
        });
      }
    }
  }
}
