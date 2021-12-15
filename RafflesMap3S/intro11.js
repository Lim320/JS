class intro11 extends Phaser.Scene {
  constructor() {
    super({
      key: "intro11",
    });

    // Put global variable here
  }

  preload() {

    this.load.image("introPage-11","assets/introPage-11.png");

  }

  create() {
    console.log("*** intro11 scene");

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'introPage-11').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

     //function to jump to blockC
     spaceDown.on(
      "down",
      function () {
    console.log("Jump to blockC scene");
    console.log("blockC function");
    let playerPos = {};
    playerPos.x = 639;
    playerPos.y = 1122;
    playerPos.dir = "up";
    this.scene.start("blockC",{ playerPos : playerPos });
  },
  this
    );

  }
}
