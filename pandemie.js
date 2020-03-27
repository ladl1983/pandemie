let npersons = 200;
let start_infected = 0.01;
let ninfected = parseInt(npersons * start_infected);
let persons = [];
let infected = [];
let w = 840;
let h = 480;
let trans_prob = 0.5;
let slider_behaviour;
let temp_slider_value;
let slider_inf_behaviour;
let temp_inf_slider_value;
let ratios = [];
let counter = 0;

function setup() {
  createCanvas(w, h);
  background(100);
  //slider = createSlider(1, 10, 1);
  // for (let i = 0; i < TOTAL; i++) {
  //   birds[i] = new Bird();
  // }
  slider_behaviour = createSlider(0, 1, 0.9, 0.01);
  slider_behaviour.position(20, 20);
  temp_slider_value = slider_behaviour.value()
  slider_inf_behaviour = createSlider(0, 300, 200,5);
  slider_inf_behaviour.position(20, 40);
  temp_inf_slider_value = slider_inf_behaviour.value()

  for (let n = 0; n <= npersons - ninfected; n++) {
    let quarantine = false;
    if (random() < temp_slider_value) {
      quarantine = true;
    }
    persons[n] = new Person(random(w), random(h), false, quarantine, temp_inf_slider_value);
  }
  let k = 0
  for (let n = npersons - ninfected; n <= npersons; n++) {
    infected[k] = new Person(random(w), random(h), true, false, temp_inf_slider_value);
    k += 1
  }
}


function draw() {

  counter += 1;
  if (slider_behaviour.value() != temp_slider_value) {
    reset();
  }
  if (slider_inf_behaviour.value() != temp_inf_slider_value)
  {
    reset();
  }
  background(150);


  for (let person of persons) {
    person.show();
    person.move();
  }
  fill(255, 255, 255);
  noStroke();
  text(temp_slider_value, slider_behaviour.x * 2 + slider_behaviour.width - 25, 30);
  text('Stay at home rate for healthy', slider_behaviour.x * 2 + slider_behaviour.width, 30);
  text(temp_inf_slider_value, slider_behaviour.x * 2 + slider_behaviour.width - 25, 50);
  text('Time infected people run around', slider_behaviour.x * 2 + slider_behaviour.width, 50);

  for (let person of infected) {
    person.show();
    person.move();
  }

  if (counter % 5 == 0) {
    ratios.push([persons.length / (npersons + ninfected), infected.length / (npersons + ninfected)]);
    if (ratios.length > 300) {
      ratios.shift();
    }
    
  }
  let posx = 0;
    for (let ratio of ratios) {
      stroke(0, 0, 255);
      line(posx, 480, posx, 480 - ratio[0] * 50);
      stroke(255, 0, 0);
      line(posx, 480 - ratio[0] * 50, posx, 480 - 50);
      posx += 1;
    }

  for (let i = infected.length - 1; i >= 0; i--) {
    for (let p = persons.length - 1; p >= 0; p--) {
      infected[i].contact(persons[p])
      if (persons[p].infected) {
        infected.push(persons.splice(p, 1)[0]);
      }
    }
  }

  console.log(temp_inf_slider_value);
}

function reset() {
  counter = 0;
  ratios = [];
  persons = [];
  infected = [];
  temp_slider_value = slider_behaviour.value()
  temp_inf_slider_value = slider_inf_behaviour.value()

  for (let n = 0; n <= npersons - ninfected; n++) {
    let quarantine = false;
    if (random() < temp_slider_value) {
      quarantine = true;
    }
    persons[n] = new Person(random(w), random(h), false, quarantine,temp_inf_slider_value);
  }
  let k = 0
  for (let n = npersons - ninfected; n <= npersons; n++) {
    infected[k] = new Person(random(w), random(h), true, false,temp_inf_slider_value);
    k += 1
  }
}