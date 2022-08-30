import { Collider } from "./types";

export class ColliderGroup extends Array<Collider> {
  constructor(...colliders: Collider[]) {
    super(...colliders);
  }
  public doCollisions() {
    this.map((c) => c.doCollisions());
  }
}
