class giftConv1 extends Phaser.Scene {
  constructor() {
    super({
      key: "giftConv1",
    });

    // Put global variable here
  }

  preload() {

    this.load.image("giftCon-01","assets/giftCon-01.png");

  }

  create() {
    console.log("*** giftConv1 scene");

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'giftCon-01').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

         // On spacebar event, jump to giftConv2
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to giftConv2 scene");
        this.scene.start( "giftConv2");
      },
      this
    );
  }
}
