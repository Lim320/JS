class intro10 extends Phaser.Scene {
  constructor() {
    super({
      key: "intro10",
    });

    // Put global variable here
  }

  preload() {

    this.load.image("introPage-09","assets/introPage-09.png");

  }

  create() {
    console.log("*** intro10 scene");

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'introPage-09').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

      // On spacebar event, call the world scene
      spaceDown.on(
        "down",
        function () {
          console.log("Jump to computerlab scene");
          
          let playerPos = {};
          playerPos.x = 592;
          playerPos.y = 1037;
          playerPos.dir = "down";
  
          this.scene.start( "computerlab",{ playerPos : playerPos });
        },
        this
      );

  }

   
}
