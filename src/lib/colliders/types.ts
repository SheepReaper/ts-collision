import { BoxBounds, HasVelocity } from "../shapes/types";

export interface Collider {
  doCollisions(): void;
}

export type Action<TCollider, TEntity> = (
  entity: TEntity,
  collider: TCollider
) => void;

export interface BoxCollidable extends BoxBounds, HasVelocity {
  nextBounds: BoxBounds;
}

export type Condition<TCollider, TEntity> = (
  entity: TEntity,
  collider: TCollider
) => boolean;

export type ConditionAction<TCollider, TEntity> = [
  Condition<TCollider, TEntity>,
  Action<TCollider, TEntity>
];
