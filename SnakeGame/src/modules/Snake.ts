class Snake{
    element:HTMLElement;//Snake container,
    head: HTMLElement; // Snake head， Represents the first div element below the snake
    bodies:HTMLCollection; //The body of the snake (including the head)

    constructor(){
        this.element = document.getElementById('snake')!;
        this.head = document.querySelector('#snake > div')!; // as HTMLElement
        this.bodies = this.element.getElementsByTagName('div');
    }

    //Get the X coordinate of the snake (the coordinate of the snake head)
    get X(){

        return this.head.offsetLeft;
    }
        //Get the Y coordinate
    get Y(){
        return this.head.offsetTop;
    }

    //Set coordinates
    set X(value :number){

        if(this.X === value){
            return;//If the direction value does not change, the subsequent
        }

        if(value < 0 ||  value > 290){//Hit the wall
            throw new Error('Hit the wall');
        }

        //Determine whether a U-turn occurs when the body is larger than 1 section
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            //console.log("A U-turn occurred in the horizontal direction");
            //After turning around, you need to let the snake continue to go forward, and turning around is prohibited
            if (value > this.X) {
                //When the value is changed to a large value, it means that the U-turn is going to the right, and it should continue to go left
                value  = this.X -10;
            }else{
                value  = this.X +10;
            }    
        }

        this.moveBody();

        this.head.style.left = value + 'px';
        this.checkHeadBody();//Check to see if the snake head hits itself
    }

    set Y(value :number){

        if(this.Y === value){
            return;//If the direction value does not change, the subsequent
        }

        if(value < 0 ||  value > 290){//Hit the wall
            throw new Error('Hit the wall');
        }

        //Determine whether a U-turn occurs when the body is larger than 1 section
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            //console.log("A U-turn occurred in the vertical direction");
            //After turning around, you need to let the snake continue to go forward, and turning around is prohibited
            if (value > this.Y) {
                //When the value is changed to a large value, it means that the U-turn is going down, and it should be allowed to go up
                value  = this.Y -10;
            }else{
                value  = this.Y +10;
            }    
        }

        this.moveBody();

        this.head.style.top = value + 'px';
        this.checkHeadBody();//Check to see if the snake head hits itself
    }

    //How to set the snake to increase the body
    addBody(){
        //Add a div to the element
        this.element.insertAdjacentHTML("beforeend",'<div></div>');
    }

    moveBody(){

        //Set the rear body to the position of the front body
        for (let i = this.bodies.length-1; i > 0; i--) {

            //Get the position of the front body
            let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i-1] as HTMLElement).offsetTop;

            //Set the value to the current body
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }

    //Check to see if the snake head hits itself
    checkHeadBody(){
        //Get all the bodies and check if they overlap with the coordinates of the snake head
        for (let i=1; i<this.bodies.length; i++){
            let bd = this.bodies[i] as HTMLElement;
            if(this.X === bd.offsetLeft && this.Y === bd.offsetTop){
                //Hit the body, game over
                throw new Error('Hit the body~~');
            }          
        }
    }
}

export default Snake;