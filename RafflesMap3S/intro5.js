class intro5 extends Phaser.Scene {
  constructor() {
    super({
      key: "intro5",
    });

    // Put global variable here
  }

  preload() {

    this.load.image("introPage-05","assets/introPage-05.png");

  }

  create() {
    console.log("*** intro5 scene");

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'introPage-05').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to preload scene");
        this.scene.start( "intro6");
      },
      this
    );

  }
}
