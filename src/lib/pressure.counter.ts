export class PressureCounter {
  #lastIndex = 0;
  #measurements: number[];
  #resolution = 12;

  constructor(private elem?: HTMLElement | null) {
    this.#measurements = new Array<number>(this.#resolution).fill(0);
  }

  public get avg() {
    return this.#measurements.reduce((p, c) => p + c) / (this.#resolution - 1);
  }

  public count() {
    const newIndex = new Date().getSeconds() % this.#resolution;
    const nextIndex = newIndex + 1;

    if (newIndex !== this.#lastIndex) {
      this.#measurements[nextIndex === this.#resolution ? 0 : nextIndex] = 0;
      this.#lastIndex = newIndex;
    }

    this.#measurements[newIndex]++;

    if (this.elem) {
      this.elem.innerText = this.avg.toString();
    }

    // console.log(this.#measurements);
  }
}
