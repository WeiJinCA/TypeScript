import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";


class GameControl{

    snake:Snake;
    food:Food;
    scorePanel:ScorePanel;
    isLive = true;//Record whether the game is over

    //Create a property to store the moving direction of the snake (that is, the direction of the key)
    direction:string = 'Right';

    constructor(){
        this.snake = new Snake;
        this.food = new Food;
        this.scorePanel = new ScorePanel;

        this.init();
    }

    //Init Game
    init(){
        //Bind the keyboard key press event
        //this points to whoever invoked it, here is #document
        //bind(): to create a new function; at this time, the current object gameControl is given to 'this'
        document.addEventListener('keydown',this.keydownHandler.bind(this));

        this.run();
    }

    /*
        ArrowUp
        ArrowDown
        ArrowLeft
        ArrowRight
    */ 
    //Create a keyboard press response function
    keydownHandler(event:KeyboardEvent){
        //Check whether the button event.key is legal, here can only be four direction keys
        this.direction = event.key;
    }

    //Control the movement of the snake: change the position of the snake according to the direction
    run(){
        let X = this.snake.X;
        let Y = this.snake.Y;

        switch(this.direction){
            case "ArrowUp":
            case "Up"://for IE browser
                Y -= 10;
                break;
            case "ArrowDown":
            case "Down"://for IE browser
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left"://for IE browser
                X -= 10;
                break;
            case "ArrowRight":
            case "Right"://for IE browser
                X += 10;
                break;
        }

        //Check if the snake is late for food
        this.checkEat(X,Y);

        try {
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (e :unknown) {
            if(e instanceof Error){
                alert(e.message + ' GAME OVER!' );
            }else{
                alert('An unknown error occurred.');
            }

            this.isLive = false;
            
        }

        this.isLive && setTimeout(this.run.bind(this),300 - (this.scorePanel.level -1 ) * 30);
    }

    //Check if the snake is late for food
    checkEat(X:number,Y:number){
            if(X === this.food.X && Y === this.food.Y){
                //Change food location
            this.food.change();
            //Add score
            this.scorePanel.addScore();
            //Add snake length
            this.snake.addBody();
            }
    }
}

export default GameControl;