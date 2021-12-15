class intro9 extends Phaser.Scene {
  constructor() {
    super({
      key: "intro9",
    });

    // Put global variable here
  }

  preload() {

    this.load.image("introPage-10","assets/introPage-10.png");

  }

  create() {
    console.log("*** intro9 scene");

    // Add any sound and music here
    // ( 0 = mute to 1 is loudest )
    //this.music = this.sound.add('bgMusic').setVolume(0.3) // 10% volume

    //this.music.play()
    //window.music = this.music

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'introPage-10').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

     // On spacebar event, call the world scene
     spaceDown.on(
      "down",
      function () {
        console.log("Jump to room1 scene");
        let playerPos = {};
        playerPos.x = 1130;
        playerPos.y = 449;
        playerPos.dir = "left";
        this.scene.start( "room1",{ playerPos : playerPos });
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

  // // Function to jump to room1
  // room1(player, tile) {
  //   console.log("room1 function");
  //   let playerPos = {};
  //   playerPos.x = 1150;
  //   playerPos.y = 449;
  //   playerPos.dir = "left";
  //   this.scene.start("room1",{playerPos: playerPos});
  // }
}
