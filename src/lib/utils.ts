import p5 from "p5";

import { CoordOrVector } from "./shapes/types";

const isVector = (maybeVector: CoordOrVector): maybeVector is p5.Vector =>
  maybeVector instanceof p5.Vector;

export const vectorize = (vectorLike: CoordOrVector) =>
  isVector(vectorLike) ? vectorLike : new p5.Vector(vectorLike.x, vectorLike.y);

// const isInBounds = (collisionBox: Bounds, boundary: Bounds) =>
//   isInXBounds(collisionBox, boundary) && isInYBounds(collisionBox, boundary);

// const isOutOfBounds = (collisionBox: Bounds, boundary: Bounds) =>
//   isOutOfXBounds(collisionBox, boundary) ||
//   isOutOfYBounds(collisionBox, boundary);
