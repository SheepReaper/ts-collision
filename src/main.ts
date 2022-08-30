import p5 from 'p5';

import { frameLookCount } from './config';
import { Block } from './lib/block';
import { BoundaryCollider } from './lib/boundary.collider';
import { BoxCollider } from './lib/box.collider';
import { FpsTracker } from './lib/fps.counter';
import { PressureCounter } from './lib/pressure.counter';
import { ColliderGroup } from './lib/types';
import { getRandomBlockOptions } from './lib/utils';

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

const blocks = Array.from(
  { length: Number(entityNumInput.value) || 200 },
  () => new Block(getRandomBlockOptions())
);

const updateEntityCount = () =>
  (entityNumInput.value = blocks.length.toString());

const addBlock = () => {
  blocks.push(
    new Block({
      ...getRandomBlockOptions(),
      position: me.createVector(me.random(me.width), me.random(me.height)),
    })
  );

  updateEntityCount();
};

const removeBlock = () => {
  blocks.splice(me.random(blocks.length), 1);

  updateEntityCount();
};

addEntityButton.addEventListener("click", addBlock);
removeEntityButton.addEventListener("click", removeBlock);

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
