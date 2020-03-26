
class Person {
    constructor(x,y,infected, quarantine) {
        this.x = x;
        this.y = y;
        this.quarantine = quarantine;
        this.infected = infected;
    }

    show() {
        if(this.infected){
            //stroke(255);
            fill(255, 0,0);
            ellipse(this.x, this.y, 10, 10);
        }
        else {
            fill(0, 0,255);
            ellipse(this.x, this.y, 10, 10);
        }
    }
}