import p5 from "p5";

import { frameLookCount } from "./config";
import { BoundaryCollider, BoxCollider, ColliderGroup } from "./lib/colliders";
import { FpsTracker, PressureCounter } from "./lib/counters";
import { createRandomBlock, createRandomBlocks } from "./lib/shapes";

const canvasFrameElem = document.getElementById("canvas-frame");

const pressureTrackerElem = document.getElementById("pressure-counter");
const addEntityButton = document.getElementById(
  "add-entity-button"
) as HTMLButtonElement;
const removeEntityButton = document.getElementById(
  "remove-entity-button"
) as HTMLButtonElement;

const entityNumInput = document.getElementById(
  "entity-number-input"
) as HTMLInputElement;
const heatInput = document.getElementById(
  "container-heat-input"
) as HTMLInputElement;

const fpsTracker = new FpsTracker({
  frameLookCount,
  element: document.getElementById("fps-counter"),
});

const pressureCounter = new PressureCounter(pressureTrackerElem);

const blocks = createRandomBlocks(Number(entityNumInput.value));

const updateEntityCount = () =>
  (entityNumInput.value = blocks.length.toString());

const addBlock = () => {
  blocks.push(createRandomBlock());

  updateEntityCount();
};

const removeBlock = () => {
  blocks.splice(me.random(blocks.length), 1);

  updateEntityCount();
};

const setNumBlocks = (numBlocks: number) => {
  blocks.length = 0;
  blocks.push(...createRandomBlocks(numBlocks, me));
  updateEntityCount();
};

addEntityButton.addEventListener("click", addBlock);
removeEntityButton.addEventListener("click", removeBlock);
entityNumInput.addEventListener("input", (e) => {
  setNumBlocks(Number((e.target as HTMLInputElement).value));
});

const edgeCollider = new BoundaryCollider({
  boxes: blocks,
  onCollisionActions: [
    () => pressureCounter.count(),
    (e) => {
      e.velocity.add(Number(heatInput.value));
    },
  ],
  // logCollisions: true,
});

const colliders = new ColliderGroup(
  new BoxCollider(blocks, false),
  edgeCollider
);

const me = new p5((p: p5) => {
  p.setup = () => {
    p.background(50);

    if (canvasFrameElem) {
      p.createCanvas(canvasFrameElem.clientWidth, canvasFrameElem.clientHeight);
      edgeCollider.resizeBoundary({
        top: 0,
        left: 0,
        right: p.width,
        bottom: p.height,
      });
      blocks.map((b) => {
        b.position = p.createVector(p.random(p.width), p.random(p.height));
        b.draw(p);
      });
    }
  };

  p.draw = () => {
    p.background(50);
    fpsTracker.tick();
    colliders.doCollisions();
    blocks.map((b) => {
      b.update();
      b.draw(p);
    });
  };

  p.windowResized = () => {
    if (canvasFrameElem) {
      p.resizeCanvas(
        canvasFrameElem.clientWidth,
        canvasFrameElem.clientHeight,
        true
      );
      edgeCollider.resizeBoundary({
        top: 0,
        left: 0,
        right: p.width,
        bottom: p.height,
      });
    }
  };
}, canvasFrameElem ?? undefined);
