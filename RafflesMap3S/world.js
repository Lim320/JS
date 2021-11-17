class world extends Phaser.Scene {
  constructor() {
    super({
      key: "world",
    });
  }

  // incoming data from scene below
  init(data) {

    // let playerPos.x = data.player.x
    // let playerPos.y = data.player.y

  }

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("worldmap","assets/RafflesklMap.json");

    // // Step 2 : Preload any images here, nickname, filename 

    this.load.image("kenny","assets/kenny.png");
    this.load.image("pippoya","assets/pippoya.png");
    this.load.image("raffles","assets/rafflesTiless-01.png");
    this.load.image("tree","assets/tree.png");
    this.load.image("village","assets/village32x32.png");

    this.load.atlas( 'left', 'assets/left.png', 'assets/left.json'); 
    this.load.atlas( 'right', 'assets/right.png', 'assets/right.json');
    this.load.atlas( 'up', 'assets/up.png', 'assets/up.json');
    this.load.atlas( 'down', 'assets/down.png', 'assets/down.json');
  }

  create() {
    console.log("*** world scene");

    //Step 3 - Create the map from main
    let map = this.make.tilemap({key:'worldmap'}); 

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let kennyTiles = map.addTilesetImage("kenny03", "kenny"); 
    let rafflesTiles = map.addTilesetImage("raffles01", "raffles");
    let pippoyaTiles = map.addTilesetImage("pippoya05", "pippoya");
    // let treeTiles = map.addTilesetImage("tree04", "tree");
    let treeTiles = map.addTilesetImage("village32x32","village");
     

    let tilesArray = [ kennyTiles,rafflesTiles, pippoyaTiles,treeTiles ] 

    // Step 5  Load in layers by layers 
    this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0); 
    this.decorLayer = map.createLayer("decorLayer", tilesArray, 0, 0);
    this.buildingLayer = map.createLayer("BuildingLayer", tilesArray, 0, 0);
      
    this.anims.create({ 
      key: 'left',
      frames: [
        { key: 'left', frame: 'left(2)'}, 
        { key: 'left', frame: 'left(3)'},
        { key: 'left', frame: 'left(1)'},
        { key: 'left', frame: 'left(4)'},

      ],
      frameRate: 6, 
      repeat: -1
    })

    this.anims.create({
      key: 'right',
      frames: [
        { key: 'right', frame: 'right(2)'},
        { key: 'right', frame: 'right(3)'},
        { key: 'right', frame: 'right(1)'},
        { key: 'right', frame: 'right(4)'},

      ],
      frameRate: 6,
      repeat: -1
    })



    this.anims.create({
      key: 'up',
      frames: [
        { key: 'up', frame: 'up(2)'},
        { key: 'up', frame: 'up(4)'},
        { key: 'up', frame: 'up(1)'},
        { key: 'up', frame: 'up(3)'},
      ],
      frameRate: 6,
      repeat: -1
    })

     this.anims.create({
      key: 'down',
      frames: [
        { key: 'down', frame: 'down(1)'},
        { key: 'down', frame: 'down(2)'},
        { key: 'down', frame: 'down(3)'},
        { key: 'down', frame: 'down(4)'},
      ],
      frameRate: 6,
      repeat: -1
    })

    this.physics.world.bounds.width = this.groundLayer.width; 
    this.physics.world.bounds.height = this.groundLayer.height;

    // Object layers
    var startPoint = map.findObject(
      "objectLayer",
      (obj) => obj.name === "startPoint"
    );
    // var endPoint = map.findObject(
    //   "objectLayer",
    //   (obj) => obj.name === "endPoint"
    // );

    var start = map.findObject("objectLayer",(obj) => obj.name === "start");

    this.player = this.physics.add.sprite(start.x, start.y, 'up');

    //enable debug
    window.player = this.player;


    this.player.setCollideWorldBounds(true); // don't go out of the this.map 

    // // create the arrow keys
     this.cursors = this.input.keyboard.createCursorKeys();

    // // camera follow player 
    this.cameras.main.startFollow(this.player);


    this.decorLayer.setCollisionByExclusion(-1, true) 
    this.buildingLayer.setCollisionByExclusion(-1, true)

    this.physics.add.collider(this.player, this.decorLayer); 
    this.physics.add.collider(this.player, this.buildingLayer);
  } 
  /////////////////// end of create //////////////////////////////

  update() {

    // check for BlockA door1
    if ( this.player.x > 338 && this.player.x < 371
          && this.player.y > 1072 && this.player.y < 1095 ) {

            this.room1()
          }
    
    // check for BlockB door
    if ( this.player.x > 546 && this.player.x < 570
      && this.player.y > 560 && this.player.y < 565 ) {

        this.blockB()
      }
    
    // check for BlockC door
      if ( this.player.x > 1244 && this.player.x < 1274
        && this.player.y > 592 && this.player.y < 600 ) {
  
          this.blockC()
        }

    //check for BlockD entrance
      if ( this.player.x > 1603 && this.player.x < 1633
        && this.player.y > 400 && this.player.y < 405 ) {

          this.blockD()
        }

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-200);
      this.player.anims.play("left", true); 
    } 
    else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(200);
      this.player.anims.play("right", true);
    } 
    else if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-200);
      this.player.anims.play("up", true);
      //console.log('up');
    } 
    else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(200);
      this.player.anims.play("down", true);
      //console.log('down');
    } 
    else {
      this.player.anims.stop(); 
      this.player.body.setVelocity(0, 0);
    }
  } /////////////////// end of update //////////////////////////////

  // Function to jump to room1
  room1(player, tile) {
    console.log("room1 function");
    this.scene.start("room1");
  }

  //function to jump to blockB
  blockB(player, tile) {
    console.log("blockB function");
    this.scene.start("blockB");
  }

  //function to jump to blockC
  blockC(player, tile) {
    console.log("blockC function");
    this.scene.start("blockC");
  }

  //function to jump to blockD
  blockD(player, tile) {
    console.log("blockD function");
    this.scene.start("blockD");
  }

} //////////// end of class world ////////////////////////
