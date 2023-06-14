
class Food{
    //Define an attribute to represent the element corresponding to the food
    element:HTMLElement; 

    constructor(){
        this.element = document.getElementById('food')!;//Add an exclamation point to indicate that this value will not be empty
    }

    //Get the X-axis coordinates of food
    get X(){
        return this.element.offsetLeft;
    }
    //Get the Y-axis coordinates of food
    get Y(){
        return this.element.offsetTop;
    }

    //Change food location
    change(){
        //To generate random points, you must first understand the range of food
        //Food position range 0 - 290 (width - food width 10)
        //The size of the food moving one grid is 10; otherwise the snake will not be able to eat
        let top = Math.round(Math.random() * 29) * 10;
        let left = Math.round(Math.random() * 29) * 10;

        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
    }
}

export default Food;