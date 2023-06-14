class ScorePanel{
    score = 0;
    level = 1;

    scoreEle:HTMLElement;
    levelEle:HTMLElement;

    //Set a variable for the level
    maxLevel: number;
    //Set a variable for which score can upgrade
    upScore: number;

    constructor(maxLevel:number = 10,upScore: number = 10){
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    //Add score method
    addScore(){
        this.score++;
        this.scoreEle.innerHTML = this.score + '';

        //this.scoreEle.innerHTML = ++this.score + '';//Short form

        if(this.score % this.upScore === 0){
            this.levelUp();
        }
    }

    //Upgrade method
    levelUp(){
        if(this.level < this.maxLevel){
            this.levelEle.innerHTML = ++this.level + '';
        }
        
    }
}

export default ScorePanel;