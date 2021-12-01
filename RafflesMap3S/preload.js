class preload extends Phaser.Scene {
  constructor() {
    super({
      key: "preload",
    });

    // Put global variable here
  }

  preload() {

    this.load.image("cover","assets/coverPage.png");

    //collect items
    this.load.image("bag","assets/bag.png");
    this.load.image("laptop","assets/laptop.png");
    this.load.image("book","assets/book.png");

     //main character movement
     this.load.atlas( 'left', 'assets/left.png', 'assets/left.json'); 
     this.load.atlas( 'right', 'assets/right.png', 'assets/right.json');
     this.load.atlas( 'up', 'assets/up.png', 'assets/up.json');
     this.load.atlas( 'down', 'assets/down.png', 'assets/down.json');
    
  }

  create() {
    console.log("*** preload scene");

    // Add any sound and music here
    // ( 0 = mute to 1 is loudest )
    //this.music = this.sound.add('bgMusic').setVolume(0.3) // 10% volume

    //this.music.play()
    //window.music = this.music

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'cover').setOrigin(0, 0);

     //main character animation_movement
     this.anims.create({ 
      key: 'left',
      frames: [
        { key: 'left', frame: 'left(1)'}, 
        { key: 'left', frame: 'left(2)'},
        { key: 'left', frame: 'left(4)'},
        { key: 'left', frame: 'left(3)'},

      ],
      frameRate: 6, 
      repeat: -1
    })

    this.anims.create({
      key: 'right',
      frames: [
        { key: 'right', frame: 'right(1)'},
        { key: 'right', frame: 'right(2)'},
        { key: 'right', frame: 'right(4)'},
        { key: 'right', frame: 'right(3)'},

      ],
      frameRate: 6,
      repeat: -1
    })



    this.anims.create({
      key: 'up',
      frames: [
        { key: 'up', frame: 'up(1)'},
        { key: 'up', frame: 'up(2)'},
        { key: 'up', frame: 'up(4)'},
        { key: 'up', frame: 'up(3)'},
      ],
      frameRate: 6,
      repeat: -1
    })

     this.anims.create({
      key: 'down',
      frames: [
        { key: 'down', frame: 'down(2)'},
        { key: 'down', frame: 'down(1)'},
        { key: 'down', frame: 'down(4)'},
        { key: 'down', frame: 'down(3)'},
      ],
      frameRate: 6,
      repeat: -1
    })


    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    

   // On spacebar event, call the world scene
   spaceDown.on(
    "down",
    function () {
      console.log("Jump to preload scene");
      this.scene.start( "intro1");
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
