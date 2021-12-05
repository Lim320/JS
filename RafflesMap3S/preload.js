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
    this.load.image("gift","assets/gift.png");

     //main character movement
     this.load.atlas( 'left', 'assets/left.png', 'assets/left.json'); 
     this.load.atlas( 'right', 'assets/right.png', 'assets/right.json');
     this.load.atlas( 'up', 'assets/up.png', 'assets/up.json');
     this.load.atlas( 'down', 'assets/down.png', 'assets/down.json');

     //collect sound
     this.load.audio("collect","assets/collectsound.wav");

     //background music
     this.load.audio("bgmusic","assets/bgsound.mp3");


    //  //star_collect
    //  this.load.image("star","assets/star.png");
    
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
    var key1 = this.input.keyboard.addKey(49);
    var key2 = this.input.keyboard.addKey(50);
    var key3 = this.input.keyboard.addKey(51);
    var key4 = this.input.keyboard.addKey(52);
    var key5 = this.input.keyboard.addKey(53);
    var key6 = this.input.keyboard.addKey(54);
    var key7 = this.input.keyboard.addKey(55);
    var key8 = this.input.keyboard.addKey(56);

    

   // On spacebar event, call the world scene
   spaceDown.on(
    "down",
    function () {
      console.log("Jump to preload scene");
      this.scene.start( "intro1");
    },
    this
  );

  //call the computerlab scene
  key1.on("down", function(){
    let playerPos = {};
    playerPos.x = 592;
    playerPos.y = 1037;
    playerPos.dir = "down";
    this.scene.start("computerlab",{ playerPos : playerPos });
  },
  this
  );

   //call the world scene
  key2.on("down", function(){
    let playerPos = {};
    playerPos.x = 686;
    playerPos.y = 713;
    playerPos.dir = "up";
    this.scene.start("world",{ playerPos : playerPos });
  },
  this
  );

   //call the blockB scene
  key3.on("down", function(){
    let playerPos = {};
    playerPos.x = 639;
    playerPos.y = 1105;
    playerPos.dir = "up";
    this.scene.start("blockB",{ playerPos : playerPos });
  },
  this
  );

  //call the blockC scene
  key4.on("down", function(){
    let playerPos = {};
    playerPos.x = 639;
    playerPos.y = 1122;
    playerPos.dir = "up";
    this.scene.start("blockC",{ playerPos : playerPos });
  },
  this
  );

  //call the blockD scene
  key5.on("down", function(){
    let playerPos = {};
    playerPos.x = 123;
    playerPos.y = 543;
    playerPos.dir = "right";
    this.scene.start("blockD",{ playerPos : playerPos });
  },
  this
  );

  //call the library scene
  key6.on("down", function(){
    let playerPos = {};
    playerPos.x = 1120;
    playerPos.y = 460;
    playerPos.dir = "left";
    this.scene.start("library",{ playerPos : playerPos });
  },
  this
  );

  //call the room1 scene
  key7.on("down", function(){
    let playerPos = {};
    playerPos.x = 643;
    playerPos.y = 1089;
    playerPos.dir = "up";
    this.scene.start("room1",{ playerPos : playerPos });
  },
  this
  );

  //call the cafeteria scene
  key8.on("down", function(){
    let playerPos = {};
    playerPos.x = 86;
    playerPos.y = 540;
    playerPos.dir = "right";
    this.scene.start("cafeteria",{ playerPos : playerPos });
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
