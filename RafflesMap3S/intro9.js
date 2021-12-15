class intro9 extends Phaser.Scene {
  constructor() {
    super({
      key: "intro9",
    });

    // Put global variable here
  }

  preload() {

    this.load.image("introPage-10","assets/introPage-10.png");

  }

  create() {
    console.log("*** intro9 scene");

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'introPage-10').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

     // On spacebar event, jump to room1
     spaceDown.on(
      "down",
      function () {
        console.log("Jump to room1 scene");
        let playerPos = {};
        playerPos.x = 1130;
        playerPos.y = 449;
        playerPos.dir = "left";
        this.scene.start( "room1",{ playerPos : playerPos });
      },
      this
    );

  }
}
