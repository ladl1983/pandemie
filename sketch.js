function setup() {
    createCanvas(840, 480);
    //slider = createSlider(1, 10, 1);
    for (let i = 0; i < TOTAL; i++) {
      birds[i] = new Bird();
    }
  }