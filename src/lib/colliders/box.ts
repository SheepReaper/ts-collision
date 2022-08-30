import p5 from "p5";

import { BoxCollidable, Collider } from "./types";
import { boxesCollide, collideX, hasId } from "./utils";

export class BoxCollider implements Collider {
  static #tempVelocity: p5.Vector = new p5.Vector();

  constructor(private boxes: BoxCollidable[], private logCollisions = false) {}

  public doCollisions() {
    this.boxes.map((thisBox, i, a) => {
      if (i < a.length - 1) {
        a.slice(i + 1).map((thatBox) => {
          const currentlyColliding = boxesCollide(thisBox, thatBox);
          const willCollide = boxesCollide(
            thisBox.nextBounds,
            thatBox.nextBounds
          );

          if (!currentlyColliding && willCollide) {
            let type = "none";

            if (collideX(thisBox, thatBox)) {
              type = "vertical";
              BoxCollider.#tempVelocity.y = thisBox.velocity.y;
              thisBox.velocity.y = thatBox.velocity.y;
              thatBox.velocity.y = BoxCollider.#tempVelocity.y;
            } else {
              type = "horizontal";
              BoxCollider.#tempVelocity.x = thisBox.velocity.x;
              thisBox.velocity.x = thatBox.velocity.x;
              thatBox.velocity.x = BoxCollider.#tempVelocity.x;
            }

            if (this.logCollisions && hasId(thisBox) && hasId(thatBox)) {
              console.log(["collision", type, thisBox.id, thatBox.id]);
            }
          }
        });
      }
    });
  }
}
