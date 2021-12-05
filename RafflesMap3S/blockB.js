class blockB extends Phaser.Scene {

    constructor() {
        super({ key: 'blockB' });
        
        // Put global variable here
    }


    init(data) {
        this.playerPos = data.playerPos
        this.inventory = data.inventory
    }

    preload() {
    //step 1 load Json
        this.load.tilemapTiledJSON("office","assets/BlockB-office.json");

    //load image
    this.load.image("atlas","assets/atlas32x32.png");
    this.load.image("modern","assets/mordern32x32.png");
     //star_collect
     this.load.image("star","assets/star.png");

    //npc lecturer movement
    this.load.atlas('lecturer','assets/lecturer.png','assets/lecturer.json');

    }

    create() {
        console.log('*** blockB scene');

        let map = this.make.tilemap({key: "office"});

        let atlasTiles = map.addTilesetImage("atlas32x32","atlas");
        let mordernTiles = map.addTilesetImage("mordern32x32","modern");

        let tilesArray = [ atlasTiles, mordernTiles ]

        this.bgLayer = map.createLayer("backgroundLayer",tilesArray, 0, 0);
        this.itemLayer = map.createLayer("itemLayer",tilesArray, 0, 0);
        this.furnitureLayer = map.createLayer("furnitureLayer",tilesArray, 0, 0);
        this.carpetLayer = map.createLayer("carpetLayer",tilesArray, 0, 0);
        this.frameLayer = map.createLayer("frameLayer",tilesArray, 0, 0);
    

    this.physics.world.bounds.width = this.bgLayer.width; 
    this.physics.world.bounds.height = this.bgLayer.height;

    //lecturer_npc_animation
    this.anims.create({
        key:'lecturerAnimation',
        frames: [
          { key: 'lecturer', frame: 'lecturer_2'},
          { key: 'lecturer', frame: 'lecturer_1'},
        ],
        frameRate: 2,
        repeat: -1
      })

      //main_character
      this.player = this.physics.add.sprite(
        this.playerPos.x,
        this.playerPos.y,
        this.playerPos.dir,
      );

    //lecturer_npc
    this.add.sprite(1049,790, "lecturer").play("lecturerAnimation");

    //enable debug
    window.player = this.player;


    this.player.setCollideWorldBounds(true); // don't go out of the this.map 

    // // create the arrow keys
     this.cursors = this.input.keyboard.createCursorKeys();

    // // camera follow player 
    this.cameras.main.startFollow(this.player);

    this.frameLayer.setCollisionByExclusion(-1, true)
    this.furnitureLayer.setCollisionByExclusion(-1, true)
    this.itemLayer.setCollisionByExclusion(-1, true) 


    this.physics.add.collider(this.player, this.frameLayer);
    this.physics.add.collider(this.player, this.furnitureLayer);
    this.physics.add.collider(this.player, this.itemLayer); 
    
    this.laptop = this.physics.add.sprite(-10, -10, 'laptop');

     //star
     this.star3 = this.add.sprite(180,40,"star").setScale(2).setScrollFactor(0).setVisible(false);

        
    }

    update() {

      //hold and drop book
      if (window.holdlaptop == 3) {

        this.laptop.x = this.player.x+32
        this.laptop.y = this.player.y
      }

      if (
        this.player.x > 990&&
        this.player.x < 1010&&
        this.player.y > 780&&
        this.player.y < 794
      ) {

        console.log("droplaptop")
        window.holdlaptop = 0
        this.star3.setVisible(true);
        window.stars++;
      }

    //go back to worldmap, check for blockB exit
    if ( this.player.x > 560 && this.player.x < 719
        && this.player.y > 1167 ) {
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
    playerPos.x = 554;
    playerPos.y = 585;
    playerPos.dir = "down";
    this.scene.start("world",{ playerPos : playerPos });
  }

    

}
