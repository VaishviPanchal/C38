class Game {
  constructor() {}

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width/2 - 100 , height - 100)
    car1.addImage("c1",car1_img);
    car1.scale = 0.07;
    cars.push(car1)


    car2 = createSprite(width/2 + 100 , height - 100)
    car2.addImage("c2",car2_img);
    car2.scale = 0.07;
    cars.push(car2);
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
  }

  play() {
    this.handleElements();
    Player.getPlayersInfo();
    
    if (allPlayers !== undefined){
     image(track,0,-height*5,width,height*5);
     var index = 0;

     for(var plr in allPlayers){
       index += 1 // index  = index+1
       var x = allPlayers[plr].positionX;
       var y = height - allPlayers[plr].positionY;

       cars[index-1].position.x = x;
       cars[index-1].position.y = y;

       //if the players index is the 

       if(index === player.index){
         stroke(10);
         fill("red");
         ellipse(x,y,60,60);
         //camera.position.x = cars[index-1].position.x;
         camera.position.y = cars[index-1].position.y;
       }

     }

     this.handlePlayerControls();
     drawSprites();
    }
  }

  handlePlayerControls(){
    if(keyIsDown(UP_ARROW)){
      player.positionY += 10;
      player.update();
    }
  }
 
  update(gs){
    database.ref("/").update({
      gameState : gs
    })
  }
}
