/*
 * @Author: Anthan
 * @Date: 2021-12-09 16:02:31
 * @LastEditTime: 2021-12-14 16:27:47
 * @LastEditors: Anthan
 * @Description:左侧表格
 */
import { Group, Rect, Text } from '@antv/g';
import type { Group as IGroup, Rect as IRect } from '@antv/g';
import { IProps, IEmitEvent } from './interface';
import { IColumn, IData, ISize } from '../../common/interface'
import { BaseRow, BaseHeader, ScrollBar } from '../';
import store, { styles, theme } from '../../store';
import type { BaseRow as IBaseRow, BaseHeader as IBaseHeader, ScrollBar as IScrollBar } from '../'

export default class BaseTable extends Group {
  public totalHeight: number = 0;

  private readonly columns: IColumn[];

  private readonly data: IData[];

  private width: number;

  private height: number;

  private readonly rowHeight: number = styles.tableCellHeight;

  private header!: IBaseHeader;

  private content!: IGroup;

  private scrollContent!: IGroup

  private readonly rows: IBaseRow[] = [];

  private scrollBar!: IScrollBar

  private totalWidth!: number

  private _scrollTop: number = 0;

  private _headerHeight: number = styles.tableCellHeight * 2;

  private showOrder: boolean | string = store.getter('showOrder')

  private orderCellWidth: number = styles.tableOrderCellWidth || 50

  private tooltip!: IRect

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
    this.totalWidth += this.showOrder ? this.orderCellWidth : 0

    this.renderRows();
    this.renderHeader();
    this.renderScrollBar();
    this.renderTooltip();

    this.bindEvent();
  }

  public set tableScrollTop(v: number) {
    this._scrollTop = v;
    this.scrollContent.style.y = v
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

  public resize({ width, height }: ISize){
    this.width = width ?? this.width
    this.height = height ?? this.height
    this.style.clipPath.style.width = this.width
    this.style.clipPath.style.height = this.height
    this.content.style.clipPath.style.width = this.width
    this.content.style.clipPath.style.height = this.height - this._headerHeight
    this.scrollBar.scrollAreaLength = this.width
  }

  private renderHeader() {
    this.header = new BaseHeader({
      columns: this.showOrder ? [
        { name: '序号', key: this.showOrder === true ? 'id' : this.showOrder, width: this.orderCellWidth },
        ...this.columns
      ] : this.columns,
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

  private renderRows() {
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
    this.appendChild(this.content);

    this.scrollContent = new Rect({
      style: {
        width: this.totalWidth,
        height: this.totalHeight,
        y: this.tableScrollTop
      }
    })
    this.content.appendChild(this.scrollContent)

    this.data.forEach((item, index) => {
      this.rows.push(
        new BaseRow({
          columns: this.showOrder ? [
            { name: '序号', key: this.showOrder === true ? 'id' : this.showOrder, width: this.orderCellWidth },
            ...this.columns
          ] : this.columns,
          data: this.showOrder ? {
            ...item,
            [this.showOrder === true ? 'id' : this.showOrder]: (index + 1).toString()
          } : item,
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

  private renderTooltip(params?: {text?: string, x?: number, y?: number}){
    if(!this.tooltip){
      this.tooltip = new Rect({
        style: {
          width: styles.popoverWidth,
          height: 50,
          fill: theme.popoverBackground,
          shadowBlur: styles.popoverShadowBlur,
          shadowColor: theme.popoverShadowColor,
          radius: styles.popoverRadius
        }
      })
      this.tooltip.hide()
      this.appendChild(this.tooltip)

      this.tooltip.appendChild(new Text({
        style: {
          text: params?.text || '',
          textBaseline: 'top',
          textAlign: 'left',
          padding: styles.popoverPadding,
          wordWrapWidth: styles.popoverWidth - styles.popoverTextPadding * 2,
          wordWrap: true
        }
      }))
    }else{
      const text = this.tooltip.childNodes.find(item => item instanceof Text) as Text
      text.style.text = params?.text || ''
      this.tooltip.style.x = params?.x
      this.tooltip.style.y = params?.y
      this.tooltip.style.height = text.getBoundingClientRect().height + styles.popoverTextPadding * 2
    }
  }

  private bindEvent() {
    this.content.addEventListener('wheel', this.wheelEvent.bind(this));
    this.scrollContent.childNodes.forEach(item => {
      if(item instanceof BaseRow){
        item.emitEvent('onCellMouseOver', (event: any) => {
          if(event.detail.column.tooltip){
            this.tooltip.show()
            this.renderTooltip({
              text: event.detail.text,
              x: event.offset.x - this.tooltip.style.width / 2,
              y: event.offset.y - this.tooltip.style.height * 1.5
            })
          }
        })
        item.emitEvent('onCellMouseOut', () => {
          this.tooltip.hide()
        })
      }
    })
  }

  private wheelEvent(event: any) {
    if(this.content.style.clipPath.style.height >= this.totalHeight) {
      this.tableScrollTop = 0;
      return
    }
    if (this.tableScrollTop >= event.deltaY) {
      this.tableScrollTop = 0;
    } else if (this.tableScrollTop <= -(this.totalHeight - this.content.style.clipPath.style.height) + event.deltaY) {
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
