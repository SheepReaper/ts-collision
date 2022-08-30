import p5 from "p5";

export interface HasBoxSize {
  size: p5.Vector;
}

interface Updatable {
  update(): void;
}

export interface Movable extends Updatable, HasVelocity {}

export interface Drawable {
  draw(p5: p5): void;
}

type Coord = { x: number; y: number };

export type CoordOrVector = p5.Vector | Coord;

export interface XBounds {
  left: number;
  right: number;
}

export interface YBounds {
  bottom: number;
  top: number;
}

export type Bounds = XBounds & YBounds;

export type BoxBounds = Bounds & HasArea;

export interface HasVelocity {
  velocity: p5.Vector;
}

export interface HasArea {
  area: number;
}
