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
import { IColumn, IData } from './interface'
import { Layout } from '@/core'
import { ITheme } from '@/theme/interface'
import { IStyles } from '@/styles/interface'
import store from '@/store'

interface Props{
  dataSource?: IData[]
  columns?: IColumn[]
  width?: string | number
  height?: string | number
  theme?: ITheme
  styles?: IStyles
}

export default (props: Props) => {

  useEffect(() => {
    store.setter('theme', props.theme ? {
      ...store.state.theme,
      ...props.theme
    } : store.state.theme)
    store.setter('styles', props.styles ? {
      ...store.state.styles,
      ...props.styles
    } : store.state.styles)
    const canvas = new Canvas({
      container: 'gantter-g-view',
      width: Number(props.width) || 500,
      height: Number(props.height) || 400,
      renderer: new Renderer()
    })

    const layout = new Layout({
      width: Number(props.width) || 500,
      height: Number(props.height) || 400,
      columns: props.columns,
      data: props.dataSource
    })

    canvas.appendChild(layout)

  }, [props.dataSource])

  return (
    <div>
      <div id="gantter-g-view" />
    </div>
  )
}
