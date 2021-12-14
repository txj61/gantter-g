/*
 * @Author: Anthan
 * @Date: 2021-12-10 10:19:30
 * @LastEditTime: 2021-12-13 17:54:10
 * @LastEditors: Anthan
 * @Description:
 */


export interface IStyles {
  // 字体
  fontFamily: string
  // 字号
  fontSize: number
  // 字体粗细
  fontWeight: 'normal' | 'bold' | 'bolder' | 'lighter' | number

  // 滚动条宽度
  scrollWeight: number
  // 滚动条圆角
  scrollBorderRadius: number
  // 滚动条最小滑块长度
  scrollMinThumbLen: number

  // 表格边框
  tableBorderSize: number
  // 表头分割线
  tableHeaderDividerSize?: number
  // 表头下边线
  tableHeaderBottomBorderSize?: number
  // 表头字号
  tableHeaderFontSize?: number
  // 表格横向分割线
  tableRowDividerSize: number
  // 表格纵向分割线
  tableColDividerSize: number
  // 表头下分割线
  tableHeaderRowDividerSize: number
  // 表头横向分割线
  tableHeaderColDividerSize: number
  // 表格单元格默认宽度
  tableCellWidth: number
  // 表格单元格高度
  tableCellHeight: number
  // 表格单元格字号
  tableCellFontSize?: number
  // 表格字体粗细
  tableCellFontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number
  // 表格单元格padding
  tableCellPadding?: number
}
