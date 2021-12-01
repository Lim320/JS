class blockC extends Phaser.Scene {

    constructor() {
        super({ key: 'blockC' });
        
        // Put global variable here
    }


    init(data) {
        this.playerPos = data.playerPos
        this.inventory = data.inventory
    }

    preload() {
    //step 1 load Json
        this.load.tilemapTiledJSON("jewelry","assets/BlockC-jewelry.json");

    //load image
    this.load.image("atlas","assets/atlas32x32.png");
    this.load.image("modern","assets/mordern32x32.png");

    //collect items
    this.load.image("gift","assets/gift.png");

    //npc girl1 movement
    this.load.atlas('npc1','assets/npc1.png','assets/npc1.json');

    //npc girl2 movement
    this.load.atlas('npc2','assets/npc2.png','assets/npc2.json');

    }

    create() {
        console.log('*** blockC scene');

        let map = this.make.tilemap({key: "jewelry"});

        let atlasTiles = map.addTilesetImage("atlas32x32","atlas");
        let mordernTiles = map.addTilesetImage("mordern32x32","modern");

        let tilesArray = [ atlasTiles, mordernTiles ]

        this.bgLayer = map.createLayer("backgroundLayer",tilesArray, 0, 0);
        this.carpetLayer = map.createLayer("carpetLayer",tilesArray, 0, 0);
        this.furnitureLayer = map.createLayer("furnitureLayer",tilesArray, 0, 0);
        this.itemLayer = map.createLayer("itemLayer",tilesArray, 0, 0);
        this.frameLayer = map.createLayer("frameLayer",tilesArray, 0, 0);
        
    this.physics.world.bounds.width = this.bgLayer.width;   
    this.physics.world.bounds.height = this.bgLayer.height;      
    
    this.gift = this.physics.add.sprite(217, 381, 'gift');
    
     //girl_npc1_animation
     this.anims.create({
        key:'npc1Animation',
        frames: [
          { key: 'npc1', frame: 'npc1_1'},
          { key: 'npc1', frame: 'npc1_2'},
        ],
        frameRate: 2,
        repeat: -1
      })

      //girl_npc2_animation
    this.anims.create({
        key:'npc2Animation',
        frames: [
          { key: 'npc2', frame: 'npc2_2'},
          { key: 'npc2', frame: 'npc2_1'},
        ],
        frameRate: 2,
        repeat: -1
      })

    //main_character
    this.player = this.physics.add.sprite(
      this.playerPos.x,
      this.playerPos.y,
      this.playerPos.dir
    );

      //girl_npc1
    this.add.sprite(445,728, "npc1").play("npc1Animation");

    //girl_npc2
    this.add.sprite(1030,451, "npc2").play("npc2Animation");

    //enable debug
    window.player = this.player;


    this.player.setCollideWorldBounds(true); // don't go out of the this.map 

    // // create the arrow keys
     this.cursors = this.input.keyboard.createCursorKeys();

    // // camera follow player 
    this.cameras.main.startFollow(this.player);

    this.furnitureLayer.setCollisionByExclusion(-1, true)
    this.itemLayer.setCollisionByExclusion(-1, true) 
    this.frameLayer.setCollisionByExclusion(-1, true)
    
    this.physics.add.collider(this.player, this.furnitureLayer);
    this.physics.add.collider(this.player, this.itemLayer); 
    this.physics.add.collider(this.player, this.frameLayer);
        
    }

    update() {

    //go back to worldmap, check for blockC exit
    if ( this.player.x > 560 && this.player.x < 719
        && this.player.y > 1160 ) {
            this.world();
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
    playerPos.x = 1257;
    playerPos.y = 623;
    playerPos.dir = "down";
    this.scene.start("world",{ playerPos : playerPos });
  }

    

}
