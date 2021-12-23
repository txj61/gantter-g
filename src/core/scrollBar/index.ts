/*
 * @Author: Anthan
 * @Date: 2021-12-13 13:10:06
 * @LastEditTime: 2021-12-14 16:39:23
 * @LastEditors: Anthan
 * @Description:滚动条
 */
import { Group, Rect } from '@antv/g';
import type { Rect as IRact } from '@antv/g';
import { IProp, IEmitEvent } from './interface';
import { theme, styles } from '@/store';
import { IPoint } from '@/common/interface';

export default class ScrollBar extends Group {
  // 是否竖向
  private _isVertical: boolean = true;

  // 滚动区域长（高）
  private _scrollAreaLength!: number;

  // 滚动内容总长（高）
  private readonly _scrollTotalLength!: number;

  // 滚动内容所在相对位置
  private _position: number = 0;

  // 最小滑块长度
  private readonly _minThumbLen: number = styles.scrollMinThumbLen;

  private thumbLen: number = styles.scrollMinThumbLen;

  private thumbPoint: IPoint = { x: 0, y: 0 };

  private controllor!: IRact;

  private thumb!: IRact;

  private diff!: number;

  private isMousedown: boolean = false;

  private _emitEvents: IEmitEvent = {
    onScroll: null,
  };

  constructor({
    isVertical,
    scrollAreaLength,
    scrollTotalLength,
    position,
    style,
    minThumbLen,
  }: IProp) {
    super({ style });

    this._isVertical = isVertical || this._isVertical;
    this._scrollAreaLength = scrollAreaLength;
    this._scrollTotalLength = scrollTotalLength;
    this._position = position || this._position;
    this._minThumbLen = minThumbLen || this._minThumbLen;

    if (this._scrollTotalLength > this._scrollAreaLength) {
      this.renderControllor();
      this.renderThumb();
      this.bindEvent();
    }
  }

  public set isVertical(v: boolean) {
    this._isVertical = v;
  }

  public get isVertical(): boolean {
    return this._isVertical;
  }

  public set scrollAreaLength(v: number) {
    this._scrollAreaLength = v;
  }

  public get scrollAreaLength(): number {
    return this._scrollAreaLength;
  }

  public set scrollTotalLength(v: number) {
    this._scrollAreaLength = v;
  }

  public get scrollTotalLength(): number {
    return this._scrollAreaLength;
  }

  public set position(v: number) {
    if (this.thumb && this._isVertical) {
      this.thumb.style.y =
        (-v * (this._scrollAreaLength - this.thumbLen)) /
        (this._scrollTotalLength - this._scrollAreaLength);
    } else if (this.thumb) {
      // 横向
    }
    this._position = v;
  }

  public get position(): number {
    return this._position;
  }

  public emitEvent(
    eventName: keyof IEmitEvent,
    event: IEmitEvent[keyof IEmitEvent],
  ) {
    this._emitEvents[eventName] = event;
  }

  private renderControllor() {
    if (this._isVertical) {
      this.controllor = new Rect({
        style: {
          width: styles.scrollWeight,
          height: this._scrollAreaLength,
          fill: theme.scrollBarSlideColor,
        },
      });
      this.appendChild(this.controllor);
    }
  }

  private renderThumb() {
    this.thumbLen =
      (this._scrollAreaLength / this._scrollTotalLength) *
      this.scrollAreaLength;
    this.thumbLen =
      this.thumbLen < this._minThumbLen ? this._minThumbLen : this.thumbLen;

    if (this._isVertical) {
      this.thumb = new Rect({
        style: {
          width: styles.scrollWeight,
          height: this.thumbLen,
          y: this.thumbPoint.y,
          fill: theme.scrollBarThumbColor,
          radius: styles.scrollBorderRadius,
          cursor: 'pointer',
        },
      });
      this.appendChild(this.thumb);
    }
  }

  private bindEvent() {
    this.thumb.addEventListener('mouseover', () => {
      this.thumb.style.fill = theme.scrollBarThumbHoverColor;
    });
    this.thumb.addEventListener('mouseout', () => {
      this.thumb.style.fill = theme.scrollBarThumbColor;
    });
    this.thumb.addEventListener(
      'mousedown',
      (event: { [key: string]: any }) => {
        this.thumb.style.fill = theme.scrollBarThumbDownColor;
        if (this._isVertical) {
          this.diff = event.client.y - this.thumbPoint.y;
        } else {
          // 横向
        }
        this.isMousedown = true;
      },
    );
    document.body.addEventListener('mousemove', event => {
      event.preventDefault();
      if (this.isMousedown && this._isVertical) {
        if (event.clientY - this.diff <= 0) {
          this.thumb.style.y = 0;
        } else if (
          event.clientY - this.diff >=
          this._scrollAreaLength - this.thumb.style.height
        ) {
          this.thumb.style.y = this._scrollAreaLength - this.thumb.style.height;
        } else {
          this.thumb.style.y = event.clientY - this.diff;
        }
        this._position =
          (-(this._scrollTotalLength - this._scrollAreaLength) *
            this.thumb.style.y) /
          (this._scrollAreaLength - this.thumbLen);

        if (this._emitEvents.onScroll) {
          this._emitEvents.onScroll({
            areaLength: this._scrollAreaLength,
            totalLength: this._scrollTotalLength,
            positonX: 0,
            positonY: this._position,
          });
        }
      }
      if (this.isMousedown && !this._isVertical) {
        // 横向
      }
    });
    document.body.addEventListener('mouseup', () => {
      this.isMousedown = false;
      if (this._isVertical) {
        this.thumbPoint.y = this.thumb.style.y ?? 0;
      } else {
        // 横向
      }
    });
  }

  private removeEvent() {
    this.thumb.removeAllEventListeners();
    // document.body.removeEventListener('mouseover', )
  }
}