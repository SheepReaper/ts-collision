import { BoxBounds, XBounds, YBounds } from "../shapes/types";
import { Domain, HasId } from "../types";

export const hasId = (maybeHasId: unknown): maybeHasId is HasId =>
  typeof (maybeHasId as HasId).id !== "undefined";

const isInXBounds = (collisionBox: XBounds, boundary: XBounds) =>
  collisionBox.left > boundary.left && collisionBox.right < boundary.right;

export const isOutOfXBounds = (collisionBox: XBounds, boundary: XBounds) =>
  !isInXBounds(collisionBox, boundary);

const isInYBounds = (collisionBox: YBounds, boundary: YBounds) =>
  collisionBox.top > boundary.top && collisionBox.bottom < boundary.bottom;

export const isOutOfYBounds = (collisionBox: YBounds, boundary: YBounds) =>
  !isInYBounds(collisionBox, boundary);

const domainsCollide = ([l1, u1]: Domain, [l2, u2]: Domain) =>
  !(l1 > u2 || l2 > u1);

export const collideX = (
  { left: l1, right: r1 }: XBounds,
  { left: l2, right: r2 }: XBounds
) => domainsCollide([l1, r1], [l2, r2]);

export const collideY = (
  { top: t1, bottom: b1 }: YBounds,
  { top: t2, bottom: b2 }: YBounds
) => domainsCollide([t1, b1], [t2, b2]);

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
