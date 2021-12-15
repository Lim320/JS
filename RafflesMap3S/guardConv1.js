class guardConv1 extends Phaser.Scene {
  constructor() {
    super({
      key: "guardConv1",
    });

    // Put global variable here
  }

  preload() {

    this.load.image("guardConv01","assets/guardConv01.png");

  }

  create() {
    console.log("*** guardConv1 scene");

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'guardConv01').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

         // On spacebar event, jump to giftConv2
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to guardConv2 scene");
        this.scene.start( "guardConv2");
      },
      this
    );
  }
}
