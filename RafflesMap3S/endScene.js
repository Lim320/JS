class endScene extends Phaser.Scene {
  constructor() {
    super({
      key: "endScene",
    });

    // Put global variable here
  }

  preload() {

    this.load.image("end","assets/endSceneyay.png");

    //endscene music
    this.load.audio("endMusic","assets/endMusic.mp3");

  }

  create() {
    console.log("*** endScene scene");

    window.music.stop();

         this.music = this.sound
          .add("endMusic", {
         loop: true,
         }).setVolume(0.3);this.music.play();

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'end').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to preload scene");
        this.scene.start( "preload");
        this.music.stop();
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
