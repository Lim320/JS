class intoLibrary1 extends Phaser.Scene {
  constructor() {
    super({
      key: "intoLibrary1",
    });

    // Put global variable here
  }

  preload() {

    this.load.image("introPage10-2","assets/introPage10-2.png");

  }

  create() {
    console.log("*** intoLibrary1 scene");

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'introPage10-2').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

        //function to jump to blockB
        spaceDown.on(
          "down",
          function () {
          console.log("library function");
          let playerPos = {};
          playerPos.x = 1120;
          playerPos.y = 460;
          playerPos.dir = "left";
          this.scene.start("library",{playerPos: playerPos});
        },
        this
        );
  }
}
