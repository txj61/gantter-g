/*
 * @Author: Anthan
 * @Date: 2021-12-08 14:45:18
 * @LastEditTime: 2021-12-13 13:15:16
 * @LastEditors: Anthan
 * @Description:
 */

import Store from './store'

const store = new Store()

export const theme = store.getter('theme')
export const styles = store.getter('styles')
export const dateUnit = store.getter('dateUnit')

export default store
