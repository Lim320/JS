class world extends Phaser.Scene {
  constructor() {
    super({
      key: "world" });
  }

  // incoming data from scene below
  init(data) {
    
    this.playerPos = data.playerPos;
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

    //npc guard movement
    this.load.atlas('guard','assets/guard.png','assets/guard.json');

  //  //main character movement
  //   this.load.atlas( 'left', 'assets/left.png', 'assets/left.json'); 
  //   this.load.atlas( 'right', 'assets/right.png', 'assets/right.json');
  //   this.load.atlas( 'up', 'assets/up.png', 'assets/up.json');
  //   this.load.atlas( 'down', 'assets/down.png', 'assets/down.json');
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

    //guard_npc_animation
    this.anims.create({
      key:'guardAnimation',
      frames: [
        { key: 'guard', frame: 'guard_2'},
        { key: 'guard', frame: 'guard_1'},
      ],
      frameRate: 2,
      repeat: -1
    })

    this.physics.world.bounds.width = this.groundLayer.width; 
    this.physics.world.bounds.height = this.groundLayer.height;

    //mainCharacter
    this.player = this.physics.add.sprite(
      this.playerPos.x,
      this.playerPos.y,
      this.playerPos.dir,
    );


    //guard_npc
    this.add.sprite(770, 457, "guard").play("guardAnimation");

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

     //collect item
     this.gift = this.physics.add.sprite(-10, -10, 'gift');
     this.laptop = this.physics.add.sprite(-10, -10, 'laptop');
  } 
  /////////////////// end of create //////////////////////////////

  update() {


     //hold gift
     if (window.holdgift == 2) {

      this.gift.x = this.player.x+32
      this.gift.y = this.player.y
    }

     //hold laptop
     if (window.holdlaptop == 3) {

      this.laptop.x = this.player.x+32
      this.laptop.y = this.player.y
  }

    // check for BlockA door1
    if ( this.player.x > 338 && this.player.x < 371
          && this.player.y > 1072 && this.player.y < 1095 ) {

            this.room1()
          }
    
    // check for BlockB door
    if ( this.player.x > 510 && this.player.x < 590
      && this.player.y > 550 && this.player.y < 565 ) {

        this.blockB()
      }
    
    // check for BlockC door
      if ( this.player.x > 1240 && this.player.x < 1280
        && this.player.y > 588 && this.player.y < 600 ) {
  
          this.blockC()
        }

     //this is exit for endScene!
     if ( this.player.x > 656 && this.player.x < 720
        && this.player.y > 1238) {
  
          this.endScene()
        }


    //check for BlockD entrance
      if ( this.player.x > 1570 && this.player.x < 1648
        && this.player.y > 395 && this.player.y < 418 ) {

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
    let playerPos = {};
    playerPos.x = 643;
    playerPos.y = 1089;
    playerPos.dir = "up";
    this.scene.start("room1",{ playerPos : playerPos });
  }

  //function to jump to blockB
  blockB(player, tile) {
    console.log("blockB function");
    let playerPos = {};
    playerPos.x = 639;
    playerPos.y = 1105;
    playerPos.dir = "up";
    this.scene.start("blockB",{ playerPos : playerPos });
  }

  //function to jump to blockC
  blockC(player, tile) {
    console.log("blockC function");
    let playerPos = {};
    playerPos.x = 639;
    playerPos.y = 1122;
    playerPos.dir = "up";
    this.scene.start("blockC",{ playerPos : playerPos });
  }

  //function to jump to blockD
  blockD(player, tile) {
    console.log("blockD function");
    let playerPos = {};
    playerPos.x = 123;
    playerPos.y = 543;
    playerPos.dir = "right";
    this.scene.start("blockD",{ playerPos : playerPos });
  }

  //function to jump to endScene
  endScene(player,tile) {
    console.log("endScene function");
    this.scene.start("endScene");
  }

} //////////// end of class world ////////////////////////
