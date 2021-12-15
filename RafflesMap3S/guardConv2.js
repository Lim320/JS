class guardConv2 extends Phaser.Scene {
  constructor() {
    super({
      key: "guardConv2",
    });

    // Put global variable here
  }

  preload() {

    this.load.image("guardConv02","assets/guardConv02.png");

  }

  create() {
    console.log("*** guardConv2 scene");

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'guardConv02').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

         // On spacebar event, jump to giftConv2
    spaceDown.on(
      "down",
      function () {
      console.log("world function");
      let playerPos = {};
      playerPos.x = 689;
      playerPos.y = 468;
      playerPos.dir = "right";
      this.scene.start("world",{playerPos: playerPos});
    },
    this
    );

  }
}
