class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide();
    background("yellow")
    text("Result of Quiz", 340, 50)
    Contestant.getPlayerInfo();
    if(allContestants !== undefined){
      var display_position = 130;
      var correctAnswer = "3";
      for(var plr in allContestants){
        if (correctAnswer === allContestants[plr].answer)
          fill("green")
        else
          fill("red");
        textSize(15);
        text(allContestants[plr].name + ": " + allContestants[plr].answer, 120,display_position += 100);

      }
    }
  }

}
