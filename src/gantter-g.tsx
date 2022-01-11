/*
 * @Author: Anthan
 * @Date: 2021-12-06 15:19:07
 * @LastEditTime: 2021-12-10 16:53:28
 * @LastEditors: Anthan
 * @Description:
 */
import React, { useEffect } from 'react'
import { Canvas } from '@antv/g'
import { Renderer } from '@antv/g-canvas'
import { Layout } from '@/core'
import { ITheme } from '@/theme/interface'
import { IStyles } from '@/styles/interface'
import { IGantterReplaceKeys, IColumn, IData } from '@/common/interface'
import store from '@/store'

interface Props{
  dataSource?: IData[]
  columns?: IColumn[]
  width?: string | number
  height?: string | number
  theme?: Partial<ITheme>
  styles?: Partial<IStyles>,
  gantterReplaceKeys?: IGantterReplaceKeys
}

export default (props: Props) => {
  const { theme, styles, width, height, columns, dataSource, gantterReplaceKeys } = props
  useEffect(() => {
    store.setter('theme', theme ? {
      ...store.state.theme,
      ...theme
    } : store.state.theme)
    store.setter('styles', styles ? {
      ...store.state.styles,
      ...styles
    } : store.state.styles)
    store.setter('container', document.getElementById('gantter-g-view'))
    const canvas = new Canvas({
      container: 'gantter-g-view',
      width: Number(width) || styles?.defaultWidth || 1000,
      height: Number(height) || styles?.defaultHeight || 500,
      renderer: new Renderer()
    })

    const layout = new Layout({
      width: Number(width) || styles?.defaultWidth || 1000,
      height: Number(height) || styles?.defaultHeight || 500,
      columns: columns,
      data: dataSource,
      gantterReplaceKeys: gantterReplaceKeys
    })

    canvas.appendChild(layout)

  }, [props.dataSource])

  return (
    <div>
      <div id="gantter-g-view" />
    </div>
  )
}
