class intro3 extends Phaser.Scene {
  constructor() {
    super({
      key: "intro3",
    });

    // Put global variable here
  }

  preload() {

    this.load.image("introPage-03","assets/introPage-03.png");

  }

  create() {
    console.log("*** intro3 scene");

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'introPage-03').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to preload scene");
        this.scene.start( "intro4");
      },
      this
    );

  }
}
