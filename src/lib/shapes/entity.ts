import p5 from "p5";
import { v4 as uuid } from "uuid";

import { HasId } from "../types";
import { vectorize } from "../utils";
import { Bounds, CoordOrVector, HasBoxSize, Movable } from "./types";

export class BaseEntityOptions {
  public position: CoordOrVector = { x: 0, y: 0 };
  public size: CoordOrVector = { x: 0, y: 0 };
  public velocity: CoordOrVector = { x: 0, y: 0 };

  constructor(partial?: Partial<BaseEntityOptions>) {
    Object.assign(this, partial);
  }
}

export abstract class BaseEntity implements Movable, Bounds, HasBoxSize, HasId {
  public readonly id = uuid();

  public position: p5.Vector;
  public size: p5.Vector;
  public velocity: p5.Vector;

  constructor(options?: Partial<BaseEntityOptions>) {
    const { position, velocity, size } = new BaseEntityOptions(options);

    this.position = vectorize(position);
    this.velocity = vectorize(velocity);
    this.size = vectorize(size);
  }

  public get bottom(): number {
    return this.position.y + this.size.y;
  }

  public get boxHeight(): number {
    return this.size.y;
  }

  public get boxWidth(): number {
    return this.size.x;
  }

  public get left(): number {
    return this.position.x;
  }

  public get nextPosition(): p5.Vector {
    return p5.Vector.add(this.position, this.velocity);
  }

  public get right(): number {
    return this.position.x + this.size.x;
  }

  public get top(): number {
    return this.position.y;
  }

  public update(): void {
    this.position.add(this.velocity);
  }
}
