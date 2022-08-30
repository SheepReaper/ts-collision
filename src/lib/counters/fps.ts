export class FpsOptions {
  public element: HTMLElement | null = null;
  public elementTag: keyof HTMLElementTagNameMap = "div";
  public elementUpdateIntervalMs = 1000;
  public frameLookCount = 3;

  constructor(partial: Partial<FpsOptions> = {}) {
    Object.assign(this, partial);
  }
}

export class FpsTracker {
  #framePointer = 0;
  #frames: number[];
  #isFirstCycle = true;
  #options: FpsOptions;

  public element: HTMLElement;

  constructor(options: Partial<FpsOptions> = {}) {
    this.#options = new FpsOptions(options);
    const { frameLookCount, element, elementTag, elementUpdateIntervalMs } =
      this.#options;

    this.element = element ?? document.createElement(elementTag);

    this.#frames = new Proxy(
      Array.from({ length: frameLookCount }, () => new Date().valueOf()),
      {
        get(target, prop) {
          const index = Number(prop);

          return target[index + (index < 0 ? target.length : 0)];
        },
      }
    );

    setInterval(
      () => (this.element.innerText = Math.round(this.fps).toString()),
      elementUpdateIntervalMs
    );
  }

  public get fps() {
    return (
      this.#options.frameLookCount /
      ((this.#frames[this.#framePointer - 1] -
        this.#frames[
          this.#isFirstCycle
            ? 0
            : this.#framePointer - this.#options.frameLookCount
        ]) /
        1000)
    );
  }

  public tick() {
    this.#frames[this.#framePointer] = new Date().valueOf();
    this.pointNext();
  }

  private pointNext() {
    if (++this.#framePointer === this.#options.frameLookCount) {
      this.#framePointer = 0;

      if (this.#isFirstCycle) {
        this.#isFirstCycle = false;
      }
    }
  }
}
