import store from '@/store'
import { Rect, Circle, Group } from '@antv/g'
import type { Circle as ICircle, Group as IGroup } from '@antv/g'
import { IProps } from './interface'

export default class Loading extends Rect {

  private content!: IGroup

  private circleList: ICircle[] = []

  // loading小圆半径
  private circleR: number = 6

  // loading小圆数量
  private circleNum: number = 4

  // loading小圆间隔
  private circleSpace: number = 5

  constructor({ style }: IProps){
    super({ style })

    this.style.fill = store.getter('theme').loadingBackgroundColor

    this.render()
  }

  private render(){
    this.content = new Group({
      style: {
        x: this.style.width / 2,
        y: this.style.height / 2
      }
    })
    this.appendChild(this.content)

    for(let i: number = 0; i < this.circleNum; i++){
      this.circleList.push(new Circle({
        style: {
          r: this.circleR,
          fill: store.getter('theme').loadingColor,
          x: (this.circleR * 2 * this.circleNum + this.circleSpace * (this.circleNum - 1)) / 2 + (this.circleR * 2 + this.circleSpace) * i,
          y: -this.circleR
        }
      }))
      this.content.appendChild(this.circleList[i])
    }
  }
}
