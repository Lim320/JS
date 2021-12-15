class blockD extends Phaser.Scene {

    constructor() {
        super({ key: 'blockD' });
        
        // Put global variable here
    }


    init(data) {
        this.playerPos = data.playerPos
        this.inventory = data.inventory
    }

    preload() {
    //step 1 load Json
        this.load.tilemapTiledJSON("bDclassroom","assets/classroom3.json");

    //load image
    this.load.image("atlas","assets/atlas32x32.png");
    this.load.image("interior","assets/interior32x32.png")
    this.load.image("modern","assets/mordern32x32.png");
    }

    create() {
        console.log('*** blockD scene');
        console.log("star:", window.stars);

        let map = this.make.tilemap({key: "bDclassroom"});

        let atlasTiles = map.addTilesetImage("atlas32x32","atlas");
        let interiorTiles = map.addTilesetImage("interior32x32","interior");
        let mordernTiles = map.addTilesetImage("mordern32x32","modern");

        let tilesArray = [ atlasTiles, mordernTiles, interiorTiles ]

        this.bgLayer = map.createLayer("groundLayer",tilesArray, 0, 0);
        this.wallLayer = map.createLayer("wallLayer",tilesArray, 0, 0);
        this.tableLayer = map.createLayer("tableLayer",tilesArray, 0, 0);
        this.itemLayer = map.createLayer("itemLayer",tilesArray, 0, 0);

    this.physics.world.bounds.width = this.bgLayer.width; 
    this.physics.world.bounds.height = this.bgLayer.height;


      //main character
      this.player = this.physics.add.sprite(
        this.playerPos.x,
        this.playerPos.y,
        this.playerPos.dir
      );

    //enable debug
    window.player = this.player;


    this.player.setCollideWorldBounds(true); // don't go out of the this.map 

    // // create the arrow keys
     this.cursors = this.input.keyboard.createCursorKeys();

    // // camera follow player 
    this.cameras.main.startFollow(this.player);

    this.wallLayer.setCollisionByExclusion(-1, true)
    this.tableLayer.setCollisionByExclusion(-1, true)
    this.itemLayer.setCollisionByExclusion(-1, true) 


    this.physics.add.collider(this.player, this.wallLayer);
    this.physics.add.collider(this.player, this.tableLayer);
    this.physics.add.collider(this.player, this.itemLayer); 
    
   //collect item
   this.gift = this.physics.add.sprite(-10, -10, 'gift');

    //star
    this.star1 = this.add.sprite(40,40,"star").setScale(2).setScrollFactor(0).setVisible(false);
    this.star2 = this.add.sprite(110,40,"star").setScale(2).setScrollFactor(0).setVisible(false);
    this.star3 = this.add.sprite(180,40,"star").setScale(2).setScrollFactor(0).setVisible(false);
    this.star4 = this.add.sprite(250,40,"star").setScale(2).setScrollFactor(0).setVisible(false);
    this.star5 = this.add.sprite(320,40,"star").setScale(2).setScrollFactor(0).setVisible(false);
    this.star6 = this.add.sprite(390,40,"star").setScale(2).setScrollFactor(0).setVisible(false);
 
    if ( window.stars ===1) {
     this.star1.setVisible(true);
   }
   else if ( window.stars === 2) {
     this.star1.setVisible(true);
     this.star2.setVisible(true);
 
 } else if ( window.stars === 3) {
     this.star1.setVisible(true);
     this.star2.setVisible(true);
     this.star3.setVisible(true);
 } 
 else if ( window.stars === 4) {
   this.star1.setVisible(true);
   this.star2.setVisible(true);
   this.star3.setVisible(true);
   this.star4.setVisible(true);
 }
 else if ( window.stars === 5) {
   this.star1.setVisible(true);
   this.star2.setVisible(true);
   this.star3.setVisible(true);
   this.star4.setVisible(true);
   this.star5.setVisible(true);
 }
 else if ( window.stars === 6) {
   this.star1.setVisible(true);
   this.star2.setVisible(true);
   this.star3.setVisible(true);
   this.star4.setVisible(true);
   this.star5.setVisible(true);
   this.star6.setVisible(true);
 }
  
    }

    update() {

       //hold gift
     if (window.holdgift == 2) {

      this.gift.x = this.player.x-32
      this.gift.y = this.player.y
  }

    //go back to worldmap, check for blockB exit
    if ( this.player.x < 55
        && this.player.y > 493 && this.player.y < 590 ) {
            this.world();
        }

    //entrance for cafeteria
    if ( this.player.x > 1220
        && this.player.y > 496 && this.player.y < 591 ) {
  
          this.intro12point1();
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
    }

    // Function to jump to room1
  world(player, tile) {
    console.log("world function");
    let playerPos = {};
    playerPos.x = 1624;
    playerPos.y = 432;
    playerPos.dir = "down";
    this.scene.start("world",{playerPos: playerPos});
  }

    // Function to jump to computerlab
    intro12point1(player, tile) {
      console.log("intro12point1 function");
      this.scene.start("intro12point1");
      }

    

    

}
