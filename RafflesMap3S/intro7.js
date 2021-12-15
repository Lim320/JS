class intro7 extends Phaser.Scene {
  constructor() {
    super({
      key: "intro7",
    });

    // Put global variable here
  }

  preload() {

    this.load.image("introPage-07","assets/introPage-07.png");

  }

  create() {
    console.log("*** intro7scene");

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'introPage-07').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to intro8 scene");
        this.scene.start( "intro8");
      },
      this
    );

  }
}
