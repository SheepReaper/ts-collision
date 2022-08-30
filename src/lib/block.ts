import p5 from 'p5';

import { BaseEntity, BaseEntityOptions } from './entity';
import { Bounds, BoxBounds, BoxCollidable, Drawable } from './types';

class BlockOptions extends BaseEntityOptions {
  public color = 50;

  constructor(options?: Partial<BlockOptions>) {
    super(options);
    Object.assign(this, options);
  }
}

export class Block extends BaseEntity implements Drawable, BoxCollidable {
  public boundary: Bounds | null = null;
  public color: number;

  constructor(options?: Partial<BlockOptions>) {
    super(options);
    const _options = new BlockOptions(options);

    this.color = _options.color;
  }

  public get area(): number {
    return this.size.x * this.size.y;
  }

  public get nextBounds(): BoxBounds {
    return {
      top: this.top + this.velocity.y,
      bottom: this.bottom + this.velocity.y,
      left: this.left + this.velocity.x,
      right: this.right + this.velocity.x,
      area: this.area,
    };
  }

  public draw(p: p5) {
    p.push();
    p.fill(this.color);
    p.rect(this.left, this.top, this.boxWidth, this.boxHeight);
    p.pop();
  }

  public update() {
    // this.velocity.y += 0.1;
    this.position.add(this.velocity);
  }
}
