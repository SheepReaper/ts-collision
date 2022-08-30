import p5 from 'p5';

export interface HasBoxSize {
}

export type HasId = { id: number | string };

export interface XBounds {
}

export interface YBounds {
}

export type Bounds = XBounds & YBounds;

interface Updatable {
  update(): void;
}

export interface Movable extends Updatable, HasVelocity {
}

export interface Drawable {
  draw(p5: p5): void;
}

type Coord = { x: number; y: number };

export type CoordOrVector = p5.Vector | Coord;

export interface HasArea {
}

export type BoxBounds = Bounds & HasArea;

export interface HasVelocity {
  velocity: p5.Vector;
}

export interface BoxCollidable extends BoxBounds, HasVelocity {
}

export type Domain = [lower: number, upper: number];

export type Action<TCollider, TEntity> = (
  entity: TEntity,
  collider: TCollider
) => void;

export type Condition<TCollider, TEntity> = (
  entity: TEntity,
  collider: TCollider
) => boolean;

export type ConditionAction<TCollider, TEntity> = [
  Condition<TCollider, TEntity>,
  Action<TCollider, TEntity>
];

export interface Collider {
  doCollisions(): void;
}

export class ColliderGroup extends Array<Collider> {
  constructor(...colliders: Collider[]) {
    super(...colliders)
  }
  public doCollisions() {
    this.map((c) => c.doCollisions());
  }
}
