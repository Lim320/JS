class intro8 extends Phaser.Scene {
  constructor() {
    super({
      key: "intro8",
    });

    // Put global variable here
  }

  preload() {

    this.load.image("introPage-08","assets/introPage-08.png");

  }

  create() {
    console.log("*** intro8 scene");

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'introPage-08').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

     // On spacebar event, call the world scene
     spaceDown.on(
      "down",
      function () {
        console.log("Jump to intro10 scene");
        this.scene.start( "intro10");
      },
      this
    );

  }
}
