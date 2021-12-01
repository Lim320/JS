class cafeteria extends Phaser.Scene {

    constructor() {
        super({ key: 'cafeteria' });
        
        // Put global variable here
    }


    init(data) {
        this.playerPos = data.playerPos
        this.inventory = data.inventory
    }

    preload() {
    //step 1 load Json
        this.load.tilemapTiledJSON("cafeteriatile","assets/cafeteria1.json");

    //load image
    this.load.image("atlas","assets/atlas32x32.png");
    this.load.image("interior","assets/interior32x32.png")
    this.load.image("modern","assets/mordern32x32.png");

     //collect items
     this.load.image("food","assets/food.png");
     this.load.image("lemonJuice","assets/lemonJuice.png");

     //npc cafeteria movement
     this.load.atlas('cafeteria','assets/cafeteria.png','assets/cafeteria.json');

     //npc friends movement
     this.load.atlas('friends','assets/friends.png','assets/friends.json');

     //npc3 boy movement
     this.load.atlas('npc3','assets/npc3.png','assets/npc3.json');
 
     //npc4 boy movement
     this.load.atlas('npc4','assets/npc4.png','assets/npc4.json');

    }

    create() {
        console.log('*** cafeteria scene');

        let map = this.make.tilemap({key: "cafeteriatile"});

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

    //lecturer_npc_animation
    this.anims.create({
        key:'cafeteriaAnimation',
        frames: [
          { key: 'cafeteria', frame: 'cafeteria_2'},
          { key: 'cafeteria', frame: 'cafeteria_1'},
        ],
        frameRate: 2,
        repeat: -1
      })

      //friends_npc_animation
    this.anims.create({
        key:'friendsAnimation',
        frames: [
          { key: 'friends', frame: 'friends_1'},
          { key: 'friends', frame: 'friends_2'},
        ],
        frameRate: 2,
        repeat: -1
      })

      //boy_npc3_animation
    this.anims.create({
        key:'npc3Animation',
        frames: [
          { key: 'npc3', frame: 'npc3_2'},
          { key: 'npc3', frame: 'npc3_1'},
        ],
        frameRate: 2,
        repeat: -1
      })

      //boy_npc4_animation
    this.anims.create({
        key:'npc4Animation',
        frames: [
          { key: 'npc4', frame: 'npc4_2'},
          { key: 'npc4', frame: 'npc4_1'},
        ],
        frameRate: 2,
        repeat: -1
      })

      //main character
      this.player = this.physics.add.sprite(
        this.playerPos.x,
        this.playerPos.y,
        this.playerPos.dir
      );

    //lecturer_npc
    this.add.sprite(395,418, "cafeteria").play("cafeteriaAnimation");

    //lecturer_npc
    this.add.sprite(679,592, "friends").play("friendsAnimation");

    //lecturer_npc
    this.add.sprite(859,896, "npc3").play("npc3Animation");

    //lecturer_npc
    this.add.sprite(198,869, "npc4").play("npc4Animation");

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

    //collect item_gift
    this.gift = this.physics.add.sprite(-10, -10, 'gift');

    //collect item_remove_food and lemonJuice
    this.food = this.physics.add.sprite(359, 419, 'food');
    this.lemonJuice = this.physics.add.sprite(183, 419, 'lemonJuice');

     //overlap_food and lemonJuice
     this.physics.add.overlap(this.player, this.food, this.collectItem2, null, this );
     this.physics.add.overlap(this.player, this.lemonJuice, this.collectItem3, null, this );


    }

    update() {

       //hold and drop gift
     if (window.holdgift == 2) {

      this.gift.x = this.player.x+32
      this.gift.y = this.player.y
    }

      if (
        this.player.x > 630&&
        this.player.x < 650&&
        this.player.y > 580&&
        this.player.y < 600
      ) {

        console.log("dropgift")
        window.holdgift = 0
      }

    //go back to blockD classroom
    if ( this.player.x < 50
        && this.player.y > 493 && this.player.y < 590 ) {
  
          this.blockD();
        }

    //go back to worldmap, check for blockB exit
    if ( this.player.x > 1227 
        && this.player.y > 432 && this.player.y < 527 ) {
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
    playerPos.x = 1624;
    playerPos.y = 432;
    playerPos.dir = "down";
    this.scene.start("world",{playerPos: playerPos});
  }

  //function to jump to blockD
  blockD(player, tile) {
    console.log("blockD function");
    let playerPos = {};
    playerPos.x = 1199;
    playerPos.y = 543;
    playerPos.dir = "left";
    this.scene.start("blockD",{playerPos: playerPos});
  }

  collectItem2 (player,food)
  {
  food.disableBody(true,true);
   }

   collectItem3 (player,lemonJuice)
  {
  lemonJuice.disableBody(true,true);
   }

    

}
