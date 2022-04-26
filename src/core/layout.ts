/*
 * @Author: Anthan
 * @Date: 2021-12-09 15:19:28
 * @LastEditTime: 2021-12-14 16:20:59
 * @LastEditors: Anthan
 * @Description:布局
 */

import { Group, Rect, BaseStyleProps } from '@antv/g';
import { BaseTable, ScrollBar, GantterTable , DragDivider, Popover, Loading } from './';
import type { BaseTable as IBaseTable, ScrollBar as IScrollBar, GantterTable as IGantterTable, DragDivider as IDragDivider, Popover as IPopover, Loading as ILoading } from './';
import { IColumn } from '../common/interface';
import store, { styles, theme } from '../store';
import { IGantterReplaceKeys } from '../common/interface'

interface IProps {
  width: number;
  height: number;
  columns?: IColumn[];
  data?: { [key: string]: any }[];
  style?: BaseStyleProps;
  gantterReplaceKeys?: IGantterReplaceKeys
  loading?: boolean
}

export default class Layout extends Group {
  private baseTable!: IBaseTable;

  private scrollbar!: IScrollBar;

  private gantterTable!: IGantterTable

  private dragDivider!: IDragDivider

  private popover!: IPopover

  private loading!: ILoading

  constructor({ width, height, columns, data, style, gantterReplaceKeys, loading }: IProps) {
    super({ style });

    store.setter('gantterReplaceKeys', {
      ...store.getter('gantterReplaceKeys'),
      ...gantterReplaceKeys,
    })

    const columnsWidth: number = columns?.reduce((total, item) => {
      return total + (item.width ?? store.getter('styles').tableCellWidth)
    }, 0) ?? width / 2
    store.setter('dragX', columnsWidth > width * .4 ? width * .4 : columnsWidth + (store.getter('showOrder') ? (store.getter('styles').tableOrderCellWidth ?? 0) : 0))

    this.render({ width, height, columns, data, style, gantterReplaceKeys, loading })
  }

  render({ width, height, columns, data, loading }: IProps){
    // 左侧表格
    this.baseTable = new BaseTable({
      columns,
      data,
      style: {
        clipPath: new Rect({
          style: {
            width: store.getter('dragX') || 0,
            height,
          },
        }),
      },
    });
    this.appendChild(this.baseTable);
    this.baseTable.emitEvent('onScroll', ({ positonY }) => {
      this.scrollbar.position = positonY;
      this.gantterTable.tableScrollTop = positonY
    });

    // 气泡卡片
    this.popover = new Popover({
      zIndex: 100
    })
    this.popover.hide()

    // 右侧甘特图
    this.gantterTable = new GantterTable({
      columns,
      data,
      popover: this.popover,
      style: {
        x: store.getter('dragX'),
        clipPath: new Rect({
          style: {
            width: width - (store.getter('dragX') || 0),
            height,
          }
        })
      }
    })
    this.appendChild(this.gantterTable)
    this.gantterTable.emitEvent('onScroll', ({ positonY }) => {
      this.scrollbar.position = positonY;
      this.baseTable.tableScrollTop = positonY;
    })

    if(data && data.length){
      // 竖向滚动条
      this.scrollbar = new ScrollBar({
        scrollAreaLength: this.baseTable.tableScrollHeight,
        scrollTotalLength: this.baseTable.totalHeight,
        style: {
          x: width - styles.scrollWeight,
          y: this.baseTable.headerHeight
        },
      });
      this.appendChild(this.scrollbar);
      this.scrollbar.emitEvent('onScroll', ({ positonY }) => {
        this.baseTable.tableScrollTop = positonY;
        this.gantterTable.tableScrollTop = positonY
      });
    }

    // 拖动条
    this.dragDivider = new DragDivider({
      style: {
        width: styles.dragWeight,
        height: data && data.length ? styles.defaultHeight : this.baseTable.headerHeight,
        x: store.getter('dragX'),
        fill: theme.dragDividerColor,
        cursor: 'col-resize'
      }
    })
    this.appendChild(this.dragDivider)
    this.dragDivider.emitEvent('onDrag', ({ x }) => {
      store.setter('dragX', x)
      this.baseTable.resize({ width: x })
      this.gantterTable.resize({ width: width - (x || 0) })
      this.gantterTable.style.x = x
    })

    this.appendChild(this.popover)

    if(loading){
      this.loading = new Loading({
        style: {
          width,
          height
        }
      })
      this.appendChild(this.loading)
    }
  }
}
