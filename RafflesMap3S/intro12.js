class intro12 extends Phaser.Scene {
  constructor() {
    super({
      key: "intro12",
    });

    // Put global variable here
  }

  preload() {

    this.load.image("introPage-12","assets/introPage-12.png");

  }

  create() {
    console.log("*** intro12 scene");

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'introPage-12').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

   //function to jump to blockD
   spaceDown.on(
    "down",
    function () {
    console.log("cafeteria function");
    let playerPos = {};
    playerPos.x = 86;
    playerPos.y = 540;
    playerPos.dir = "right";
    this.scene.start("cafeteria",{playerPos: playerPos});
},
this
);

  }
}
