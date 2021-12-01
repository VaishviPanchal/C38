class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = height;
  }

  addPlayer() {
    var playerIndex = "players/player" + this.index;

    if (this.index === 1) {
      this.positionX = width / 2 - 100;
    } else {
      this.positionX = width / 2 + 100;
    }

    database.ref(playerIndex).set({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY
    });
  }

  getCount() {
    var playerCountRef = database.ref("playerCount");
    playerCountRef.on("value", data => {
      playerCount = data.val();
    });
  }

  updateCount(count) {
    database.ref("/").update({
      playerCount: count
    });
  }

  static getPlayersInfo() {
    database.ref("players").on("value",(data)=>{
      allPlayers = data.val();
    })
  }

  update(){
    var plrIndexRef = "players/player"+this.index;
    database.ref(plrIndexRef).update({
      positionX : this.positionX,
      positionY : this.positionY,
    })
  }

  getDistance(){
    database.ref("players/player"+this.index).on("value",(data)=>{
      var data = data.val();
      this.positionX  = data.positionX,
      this.positionY = data.positionY;
    })
  }
}