
class Person {
    constructor(x, y, infected, quarantine,inf_behaviour) {
        this.x = x;
        this.y = y;
        this.quarantine = quarantine;
        this.infected = infected;
        let direction = random(0, 200) * 2 * PI / 200;
        this.speedx = cos(direction);
        this.speedy = sin(direction);
        this.counter = 0;
        this.inf_behaviour = inf_behaviour;
    }

    size = 10;
    show() {
        if (this.infected) {
            stroke(255);
            fill(255, 0, 0);
            ellipse(this.x, this.y, this.size, this.size);
        }
        else {
            stroke(255);
            noStroke();
            fill(0, 0, 255);
            ellipse(this.x, this.y, this.size, this.size);
        }
    }

    move() {
        if (!(this.quarantine)) {
            this.x += this.speedx;
            this.y += this.speedy;
            if (this.infected) {
                this.counter += 1;
            }
            if ((this.counter > this.inf_behaviour) && this.infected) {
                this.quarantine = true;
            }

        }
        if (this.x < 0) {
            this.speedx *= -1;
        }
        if (this.y < 0) {
            this.speedy *= -1;
        }
        if (this.x > w) {
            this.speedx *= -1;
        }
        if (this.y > h) {
            this.speedy *= -1;
        }

    }

    dist(x, y) {
        return Math.sqrt((this.x - x) * (this.x - x) + (this.y - y) * (this.y - y))
    }

    // check contact, if distance is small the transmission of disease is dependent on transmission probabilty
    contact(person) {

        if (this.dist(person.x, person.y) < this.size) {
            if (random() > trans_prob) {
                person.infected = true;
            }
        }

    }
}