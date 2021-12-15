class intro6 extends Phaser.Scene {
  constructor() {
    super({
      key: "intro6",
    });

    // Put global variable here
  }

  preload() {

    this.load.image("introPage-06","assets/introPage-06.png");

  }

  create() {
    console.log("*** intro6 scene");

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'introPage-06').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to intro7 scene");
        this.scene.start( "intro7");
      },
      this
    );

  }
}
