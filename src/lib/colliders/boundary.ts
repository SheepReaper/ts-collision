import { Bounds } from "../shapes/types";
import { Action, BoxCollidable, Collider, ConditionAction } from "./types";
import { hasId, isOutOfXBounds, isOutOfYBounds } from "./utils";

export class BoundaryColliderOptions {
  public actions: ConditionAction<BoundaryCollider, BoxCollidable>[] = [];
  public bounds: Bounds = { top: 0, left: 0, right: 0, bottom: 0 };
  public boxes: BoxCollidable[] = [];
  public logCollisions = false;
  public onCollisionActions: Action<BoundaryCollider, BoxCollidable>[] = [];
  public replaceDefaultActions = false;

  constructor(options?: Partial<BoundaryColliderOptions>) {
    Object.assign(this, options);
  }
}

export class BoundaryCollider implements Collider {
  readonly #options: BoundaryColliderOptions;

  static #defaultActions: ConditionAction<BoundaryCollider, BoxCollidable>[] = [
    [
      (e, c) => isOutOfXBounds(e.nextBounds, c.#options.bounds),
      (e) => (e.velocity.x *= -1),
    ],
    [
      (e, c) => isOutOfYBounds(e.nextBounds, c.#options.bounds),
      (e) => (e.velocity.y *= -1),
    ],
  ];

  public readonly actions: ConditionAction<BoundaryCollider, BoxCollidable>[];

  constructor(options?: Partial<BoundaryColliderOptions>) {
    this.#options = new BoundaryColliderOptions(options);

    this.actions = this.#options.replaceDefaultActions
      ? this.#options.actions
      : [...BoundaryCollider.#defaultActions, ...this.#options.actions];
  }

  public doCollisions() {
    this.#options.boxes.map((b) => {
      if (
        this.actions
          .filter(([conditionFn]) => conditionFn(b, this))
          .map(([, action]) => action(b, this)).length
      ) {
        if (this.#options.logCollisions) {
          console.log({
            message: "boundaryCollision",
            id: hasId(b) ? b.id : "unknown",
          });
        }
        this.#options.onCollisionActions.map((a) => a(b, this));
      }
    });
  }

  public resizeBoundary(bounds: Bounds) {
    this.#options.bounds = bounds;
  }
}
