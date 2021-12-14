/*
 * @Author: Anthan
 * @Date: 2021-12-09 17:13:48
 * @LastEditTime: 2021-12-14 09:19:22
 * @LastEditors: Anthan
 * @Description:
 */

export interface ITheme {
  // 通用
  backgroundColor: string
  borderColor: string
  fontColor: string

  // 滚动条滑道颜色
  scrollBarSlideColor: string
  // 滚动条滑块颜色
  scrollBarThumbColor: string
  // 鼠标移入滑块颜色
  scrollBarThumbHoverColor: string
  // 鼠标按下滑块颜色
  scrollBarThumbDownColor: string

  // 表头分割线
  tableHeaderDividerColor?: string
  // 表头下边线
  tableHeaderBottomBorderColor?: string
  // 表头背景
  tableHeaderBackgroundColor: string
  // 表头文字
  tableHeaderFontColor?: string
  // 表格横向分割线
  tableRowDividerColor?: string
  // 表格纵向分割线
  tableColDividerColor?: string
  // 表格奇数行背景
  tableOddBackgroundColor: string
  // 表格偶数行背景
  tableEvenBackgroundColor: string
  // 表格文字
  tableCellFontColor?: string

}
