class giftConv2 extends Phaser.Scene {
  constructor() {
    super({
      key: "giftConv2",
    });

    // Put global variable here
  }

  preload() {

    this.load.image("giftCon-02","assets/giftCon-02.png");

  }

  create() {
    console.log("*** giftConv2 scene");

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'giftCon-02').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

         // On spacebar event, jump to giftConv2
    spaceDown.on(
      "down",
      function () {
      console.log("cafeteria function");
      let playerPos = {};
      playerPos.x = 605;
      playerPos.y = 585;
      playerPos.dir = "right";
      this.scene.start("cafeteria",{playerPos: playerPos});
    },
    this
    );

  }
}
