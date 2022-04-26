/*
 * @Author: Anthan
 * @Date: 2021-12-06 15:19:07
 * @LastEditTime: 2021-12-10 16:53:28
 * @LastEditors: Anthan
 * @Description:
 */
import React, { useEffect, useState } from 'react'
import { Canvas } from '@antv/g'
import type { Canvas as ICanvas } from '@antv/g'
import { Renderer } from '@antv/g-canvas'
import { Layout } from './core'
import type { Layout as ILayout } from './core'
import { ITheme } from './theme/interface'
import { IStyles } from './styles/interface'
import { IGantterReplaceKeys, IColumn, IData, ITooltip, IGantterBarText, IDateUnit } from './common/interface'
import store from './store'
import { Select } from './components'

interface Props{
  dataSource?: IData[]
  columns?: IColumn[]
  width?: string | number
  height?: string | number
  theme?: Partial<ITheme>
  styles?: Partial<IStyles>,
  gantterReplaceKeys?: IGantterReplaceKeys
  showOrder?: boolean | string
  tooltip?: ITooltip
  gantterBarText?: IGantterBarText
  loading?: boolean
}

let canvas: ICanvas
let layout: ILayout

export default React.memo((props: Props) => {
  const { theme, styles, width, height, columns, dataSource, gantterReplaceKeys, showOrder, tooltip, gantterBarText, loading } = props
  const [dateUnit, setDateUnit] = useState<IDateUnit>(store.getter('dateUnit') || 'month')

  useEffect(() => {
    store.setter('theme', theme ? {
      ...store.state.theme,
      ...theme
    } : store.state.theme)
    store.setter('styles', styles ? {
      ...store.state.styles,
      ...styles
    } : store.state.styles)
    store.setter('showOrder', showOrder ?? store.getter('showOrder'))
    store.setter('tooltip', {
      ...store.getter('tooltip'),
      ...tooltip
    })
    store.setter('gantterBarText', {
      ...store.getter('gantterBarText'),
      ...gantterBarText
    })

    canvas = new Canvas({
      container: 'gantter-g-view',
      width: Number(width) || document.getElementById('gantter-g-view')?.offsetWidth || styles?.defaultWidth || 1000,
      height: Number(height) || styles?.defaultHeight || 500,
      renderer: new Renderer()
    })
    store.setter('container', canvas)

    layout = new Layout({
      width: Number(width) || document.getElementById('gantter-g-view')?.offsetWidth || styles?.defaultWidth || 1000,
      height: Number(height) || styles?.defaultHeight || 500,
      columns: columns,
      data: dataSource,
      gantterReplaceKeys,
      loading
    })
    canvas.appendChild(layout)
  }, [dataSource, dateUnit, loading])

  return (
    <div>
      <div style={{
        width: `${width}px`,
        height: '40px',
        display: 'flex',
      }}>
        <Select defaultValue={dateUnit} options={[
          { value: 'day', label: '按日' },
          { value: 'month', label: '按月' },
          { value: 'year', label: '按年' },
        ]} onChange={value => {
          store.setter('dateUnit', value?.value as IDateUnit)
          setDateUnit(value?.value as IDateUnit)
        }} />
      </div>
      <div id="gantter-g-view" />
    </div>
  )
}, () => false)
