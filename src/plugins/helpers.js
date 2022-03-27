function* uid() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const helpers = {
  getId : uid(),
  randomNumber(min = 0, max = 1) {
    return min + Math.round(Math.random() * max);
  },
  colorGenerate() {
    const maxValue = 200;
    const r = this.randomNumber(0, maxValue);
    const g = this.randomNumber(0, maxValue);
    const b = this.randomNumber(0, maxValue);
    return `rgb(${ r }, ${ g }, ${ b })`;
  },
  getObjectCurrentStatus(shapes = [], leftSide = false) {
    return shapes.reduce((total, current) => {
        const left = leftSide ? 50 - current.left : current.left;
        total += current.weight * left;
        return total;
      },0);
  }
};

export default helpers;
