class intro1 extends Phaser.Scene {
  constructor() {
    super({
      key: "intro1",
    });

    // Put global variable here
  }

  preload() {

    this.load.image("introPage-01","assets/introPage-01.png");

  }

  create() {
    console.log("*** intro1 scene");

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'introPage-01').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to intro2 scene");
        this.scene.start( "intro2");
      },
      this
    );

    // Add any text in the main page
    // this.add.text(90, 600, "Press spacebar to continue", {
    //   font: "30px ARCHADECLASSIC ",
    //   fill: "#000000",
    // });

    // Create all the game animations here
  }
}
