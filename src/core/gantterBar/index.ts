import { Group, Rect } from '@antv/g'
import { IProps } from './interface'
import { IGantterItem } from '@/common/interface'

export default class GantterBar extends Group {

  private list: IGantterItem[] = []

  constructor({ style, list }: IProps){
    super({ style })

    this.list = list || []

  }

  private render(){
    this.list.forEach(item => {
      this.appendChild(new Rect({
        // style: {}
      }))
    })
  }
}
