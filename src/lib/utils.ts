import p5 from 'p5';

import {
  Bounds,
  BoxBounds,
  CoordOrVector,
  Domain,
  HasId,
  XBounds,
  YBounds,
} from './types';

const isVector = (maybeVector: CoordOrVector): maybeVector is p5.Vector =>
  maybeVector instanceof p5.Vector;

export const vectorize = (vectorLike: CoordOrVector) =>
  isVector(vectorLike) ? vectorLike : new p5.Vector(vectorLike.x, vectorLike.y);

const isInXBounds = (collisionBox: XBounds, boundary: XBounds) =>
  collisionBox.left > boundary.left && collisionBox.right < boundary.right;

export const isOutOfXBounds = (collisionBox: XBounds, boundary: XBounds) =>
  !isInXBounds(collisionBox, boundary);

const isInYBounds = (collisionBox: YBounds, boundary: YBounds) =>
  collisionBox.top > boundary.top && collisionBox.bottom < boundary.bottom;

export const isOutOfYBounds = (collisionBox: YBounds, boundary: YBounds) =>
  !isInYBounds(collisionBox, boundary);

const isInBounds = (collisionBox: Bounds, boundary: Bounds) =>
  isInXBounds(collisionBox, boundary) && isInYBounds(collisionBox, boundary);

const isOutOfBounds = (collisionBox: Bounds, boundary: Bounds) =>
  isOutOfXBounds(collisionBox, boundary) ||
  isOutOfYBounds(collisionBox, boundary);

export const collideX = (
  { left: l1, right: r1 }: XBounds,
  { left: l2, right: r2 }: XBounds
) => domainsCollide([l1, r1], [l2, r2]);

export const collideY = (
  { top: t1, bottom: b1 }: YBounds,
  { top: t2, bottom: b2 }: YBounds
) => domainsCollide([t1, b1], [t2, b2]);

const domainsCollide = ([l1, u1]: Domain, [l2, u2]: Domain) =>
  !(l1 > u2 || l2 > u1);

export const boxesCollide = (
  collisionBox1: BoxBounds,
  collisionBox2: BoxBounds
) => {
  if (collisionBox1.area === 0 || collisionBox2.area === 0) {
    return false;
  }

  return (
    collideX(collisionBox1, collisionBox2) &&
    collideY(collisionBox1, collisionBox2)
  );
};

export const hasId = (maybeHasId: unknown): maybeHasId is HasId =>
  typeof (maybeHasId as HasId).id !== "undefined";

  export const getRandomBlockOptions = () => ({
    color: Math.random() * 255,
    size: { x: 40, y: 40 },
    velocity: { x: Math.random() * 5, y: Math.random() * 5 },
  });
