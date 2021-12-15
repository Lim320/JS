class intro4 extends Phaser.Scene {
  constructor() {
    super({
      key: "intro4",
    });

    // Put global variable here
  }

  preload() {

    this.load.image("introPage-04","assets/introPage-04.png");

  }

  create() {
    console.log("*** intro4 scene");

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'introPage-04').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to preload scene");
        this.scene.start( "intro5");
      },
      this
    );

  }
}
