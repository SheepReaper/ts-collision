import p5 from "p5";

import { BoxCollidable } from "../colliders/types";
import { BaseEntity, BaseEntityOptions } from "./entity";
import { Bounds, BoxBounds, Drawable } from "./types";

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
    this.position.add(this.velocity);
  }
}

export const getRandomBlockOptions = (p?: p5) => ({
  color: Math.random() * 255,
  size: { x: 40, y: 40 },
  velocity: { x: Math.random() * 5, y: Math.random() * 5 },
  ...(p
    ? { position: p.createVector(p.random(p.width), p.random(p.height)) }
    : {}),
});

export const createRandomBlock = (p?: p5) =>
  new Block(getRandomBlockOptions(p));

export const createRandomBlocks = (numBlocks: number, p?: p5) =>
  Array.from({ length: numBlocks }, () => createRandomBlock(p));
