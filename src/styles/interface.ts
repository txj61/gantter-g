/*
 * @Author: Anthan
 * @Date: 2021-12-10 10:19:30
 * @LastEditTime: 2021-12-13 17:54:10
 * @LastEditors: Anthan
 * @Description:
 */

export interface IStyles {
  // 字体
  readonly fontFamily: string;
  // 字号
  readonly fontSize: number;
  // 字体粗细
  readonly fontWeight: 'normal' | 'bold' | 'bolder' | 'lighter' | number;

  // 滚动条宽度
  readonly scrollWeight: number;
  // 滚动条圆角
  readonly scrollBorderRadius: number;
  // 滚动条最小滑块长度
  readonly scrollMinThumbLen: number;

  // 表格边框
  readonly tableBorderSize: number;
  // 表头分割线
  readonly tableHeaderDividerSize?: number;
  // 表头下边线
  readonly tableHeaderBottomBorderSize?: number;
  // 表头字号
  readonly tableHeaderFontSize?: number;
  // 表格横向分割线
  readonly tableRowDividerSize: number;
  // 表格纵向分割线
  readonly tableColDividerSize: number;
  // 表头下分割线
  readonly tableHeaderRowDividerSize: number;
  // 表头横向分割线
  readonly tableHeaderColDividerSize: number;
  // 表格单元格默认宽度
  readonly tableCellWidth: number;
  // 表格单元格高度
  readonly tableCellHeight: number;
  // 表格单元格字号
  readonly tableCellFontSize?: number;
  // 表格字体粗细
  readonly tableCellFontWeight?:
    | 'normal'
    | 'bold'
    | 'bolder'
    | 'lighter'
    | number;
  // 表格单元格padding
  readonly tableCellPadding?: number;
}