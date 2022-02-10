/*
 * @Author: Anthan
 * @Date: 2021-12-08 14:45:18
 * @LastEditTime: 2021-12-13 12:46:46
 * @LastEditors: Anthan
 * @Description:
 */
import { ITheme } from '../theme/interface'
import { IStyles } from '../styles/interface'
import { baseTheme } from '../theme'
import { baseStyles } from '../styles'
import { IDateUnit, IGantterReplaceKeys, ITooltip, IEvent, IGantterBarText } from '../common/interface'
import type { Popover as IPopover } from '../core'
import type { Canvas as ICanvas } from '@antv/g'

export interface IState {
  theme: ITheme
  styles: IStyles
  dateUnit?: IDateUnit
  showOrder: boolean | string
  gantterReplaceKeys: Required<IGantterReplaceKeys>
  popover?: IPopover
  tooltip?: ITooltip
  events: IEvent,
  container?: ICanvas
  dragX?: number
  gantterBarText?: IGantterBarText
  // [key: string]: any
}

class Store {
  public state: IState = {
    theme: baseTheme,
    styles: baseStyles,
    gantterReplaceKeys: {
      list: 'list',
      start: 'start',
      end: 'end',
      title: 'title',
      content: 'content',
      color: ''
    },
    showOrder: true,
    events: {},
    tooltip: {
      show: true,
      formatter: item => {
        const replaceKeys: Required<IGantterReplaceKeys> = this.state.gantterReplaceKeys
        return [
          {
            text: item[replaceKeys.title],
            style: {
              fontSize: 14,
              fontWeight: 'bold',
            }
          },
          {
            text: `${item[replaceKeys.start]} - ${item[replaceKeys.end]}`,
            style: {
              fontSize: 14
            }
          }
        ]
      }
    }
  }

  public setter<K extends keyof IState>(key: K, value: IState[K]){
    this.state[key] = value
  }
  public getter<K extends keyof IState>(key: K): IState[K]{
    return this.state[key]
  }
}

export default Store
