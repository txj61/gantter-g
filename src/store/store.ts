/*
 * @Author: Anthan
 * @Date: 2021-12-08 14:45:18
 * @LastEditTime: 2021-12-13 12:46:46
 * @LastEditors: Anthan
 * @Description:
 */
import { ITheme } from '@/theme/interface'
import { IStyles } from '@/styles/interface'
import { baseTheme } from '@/theme'
import { baseStyles } from '@/styles'


export interface IState {
  theme: ITheme
  styles: IStyles
  [key: string]: any
}

class Store {
  public state: IState = {
    theme: baseTheme,
    styles: baseStyles
  }

  public setter(key: keyof IState, value: any){
    this.state[key] = value
  }
  public getter<K extends keyof IState>(key: K): IState[K]{
    return this.state[key]
  }
}

export default Store
