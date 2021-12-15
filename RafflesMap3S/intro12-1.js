class intro12point1 extends Phaser.Scene {
  constructor() {
    super({
      key: "intro12point1",
    });

    // Put global variable here
  }

  preload() {

    this.load.image("introPage-12-1","assets/introPage-12-1.png");

  }

  create() {
    console.log("*** intro12point1 scene");

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'introPage-12-1').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

     // On spacebar event, call the world scene
     spaceDown.on(
      "down",
      function () {
        console.log("Jump to intro12 scene");
        this.scene.start( "intro12");
      },
      this
    );

  }
}
