/*
 * @Author: Anthan
 * @Date: 2021-12-09 17:13:48
 * @LastEditTime: 2021-12-14 09:19:22
 * @LastEditors: Anthan
 * @Description:
 */

export interface ITheme {
  // 通用
  readonly backgroundColor: string;
  readonly borderColor: string;
  readonly fontColor: string;

  // 拖动条颜色
  readonly dragDividerColor: string
  // 拖动条边框颜色
  readonly dragDividerBorderColor: string

  // 滚动条滑道颜色
  readonly scrollBarSlideColor: string;
  // 滚动条滑块颜色
  readonly scrollBarThumbColor: string;
  // 鼠标移入滑块颜色
  readonly scrollBarThumbHoverColor: string;
  // 鼠标按下滑块颜色
  readonly scrollBarThumbDownColor: string;

  // 表头分割线
  readonly tableHeaderDividerColor?: string;
  // 表头下边线
  readonly tableHeaderBottomBorderColor?: string;
  // 表头背景
  readonly tableHeaderBackgroundColor: string;
  // 表头文字
  readonly tableHeaderFontColor?: string;
  // 表格横向分割线
  readonly tableRowDividerColor?: string;
  // 表格纵向分割线
  readonly tableColDividerColor?: string;
  // 表格奇数行背景
  readonly tableOddBackgroundColor: string;
  // 表格偶数行背景
  readonly tableEvenBackgroundColor: string;
  // 表格文字
  readonly tableCellFontColor?: string;

  // 甘特图已结束颜色
  readonly gantterStopColor?: string
  // 甘特图进行中颜色
  readonly gantterProgressColor?: string
  // 甘特图未开始颜色
  readonly gantterUnbeginColor?: string
  // 甘特图分割线
  readonly gantterDividerColor?: string
  // 甘特图鼠标移入阴影颜色
  readonly gantterBarShadowColor?: string
  // 甘特图描边颜色
  readonly gantterbarLineColor?: string

  // 气泡卡片背景色
  readonly popoverBackground?: string
  // 气泡卡片阴影颜色
  readonly popoverShadowColor?: string

  // loading背景颜色
  readonly loadingBackgroundColor?: string
  // loading颜色
  readonly loadingColor?: string
}
