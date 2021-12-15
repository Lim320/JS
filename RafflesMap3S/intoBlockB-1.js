class intoBlockB1 extends Phaser.Scene {
  constructor() {
    super({
      key: "intoBlockB1",
    });

    // Put global variable here
  }

  preload() {

    this.load.image("introPage09-2","assets/introPage09-2.png");

  }

  create() {
    console.log("*** intoBlockB1 scene");

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'introPage09-2').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

        //function to jump to blockB
        spaceDown.on(
          "down",
          function () {
          console.log("blockB function");
          let playerPos = {};
          playerPos.x = 639;
          playerPos.y = 1105;
          playerPos.dir = "up";
          this.scene.start("blockB",{ playerPos : playerPos });
        },
        this
        );

  }
}
