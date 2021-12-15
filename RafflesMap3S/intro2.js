class intro2 extends Phaser.Scene {
  constructor() {
    super({
      key: "intro2",
    });

    // Put global variable here
  }

  preload() {

    this.load.image("introPage-02","assets/introPage-02.png");

  }

  create() {
    console.log("*** intro2 scene");

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'introPage-02').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to preload scene");
        this.scene.start( "intro3");
      },
      this
    );

  }
}
