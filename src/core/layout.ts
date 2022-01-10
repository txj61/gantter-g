/*
 * @Author: Anthan
 * @Date: 2021-12-09 15:19:28
 * @LastEditTime: 2021-12-14 16:20:59
 * @LastEditors: Anthan
 * @Description:布局
 */

import { Group, Rect, BaseStyleProps } from '@antv/g';
import { BaseTable, ScrollBar, GantterTable, DragDivider } from '@/core';
import type { BaseTable as IBaseTable, ScrollBar as IScrollBar, GantterTable as IGantterTable, DragDivider as IDragDivider } from '@/core';
import { IColumn } from '@/common/interface';
import { styles } from '@/store';
import { IGantterReplaceKeys } from '@/common/interface'
import store from '@/store'

interface IProps {
  width: number;
  height: number;
  columns?: IColumn[];
  data?: { [key: string]: any }[];
  style?: BaseStyleProps;
  gantterReplaceKeys?: IGantterReplaceKeys
}

export default class Layout extends Group {
  private baseTable: IBaseTable;

  private scrollbar!: IScrollBar;

  private gantterTable!: IGantterTable

  private dragDivider!: IDragDivider

  constructor({ width, height, columns, data, style, gantterReplaceKeys }: IProps) {
    super({ style });

    store.setter('gantterReplaceKeys', {
      ...store.getter('gantterReplaceKeys'),
      ...gantterReplaceKeys,
    })
    store.setter('dragX', width / 2)

    // 左侧表格
    this.baseTable = new BaseTable({
      columns,
      data,
      style: {
        clipPath: new Rect({
          style: {
            width: store.getter('dragX'),
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

    // 右侧甘特图
    this.gantterTable = new GantterTable({
      columns,
      data,
      style: {
        x: store.getter('dragX'),
        clipPath: new Rect({
          style: {
            width: width - store.getter('dragX'),
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

    // 拖动条
    // this.dragDivider = new DragDivider({
    //   position: store.getter('dragX'),
    //   height: styles.defaultHeight,
    //   style: {
    //     x: store.getter('dragX')
    //   }
    // })
    // this.appendChild(this.dragDivider)
  }
}
