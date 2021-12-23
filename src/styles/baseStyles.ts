/*
 * @Author: Anthan
 * @Date: 2021-12-10 10:18:10
 * @LastEditTime: 2021-12-13 17:21:15
 * @LastEditors: Anthan
 * @Description:基础样式
 */
import { IStyles } from '@/styles/interface'

const baseStyles: IStyles = {
  fontFamily: 'PingFang SC',
  fontSize: 14,
  fontWeight: 'normal',

  scrollWeight: 8,
  scrollBorderRadius: 4,
  scrollMinThumbLen: 20,

  tableCellWidth: 100,
  tableCellHeight: 38,
  tableBorderSize: 0,
  tableHeaderColDividerSize: 0,
  tableHeaderRowDividerSize: 0,
  tableRowDividerSize: .5,
  tableColDividerSize: .5,
  tableCellPadding: 8,
}

export default baseStyles