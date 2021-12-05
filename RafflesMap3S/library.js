class library extends Phaser.Scene {

    constructor() {
        super({ key: 'library' });
        
        // Put global variable here
    }


    init(data) {
        this.playerPos = data.playerPos
        this.inventory = data.inventory
    }

    preload() {
    //step 1 load Json
        this.load.tilemapTiledJSON("libraryBA","assets/BlockA-library.json");

    //load image
    this.load.image("atlas","assets/atlas32x32.png");
    this.load.image("modern","assets/mordern32x32.png");

    //librarian_npc
    this.load.atlas('librarian','assets/librarys.png','assets/librarys.json');

    }

    create() {
        console.log('*** library scene');

        let map = this.make.tilemap({key: "libraryBA"});

        let atlasTiles = map.addTilesetImage("atlas32x32","atlas");
        let mordernTiles = map.addTilesetImage("mordern32x32","modern");

        let tilesArray = [ atlasTiles, mordernTiles ]

        this.bgLayer = map.createLayer("backgroundLayer",tilesArray, 0, 0);
        this.chairLayer = map.createLayer("chairLayer",tilesArray, 0, 0);
        this.carpetLayer = map.createLayer("carpetLayer",tilesArray, 0, 0);
        this.furnitureLayer = map.createLayer("furnitureLayer",tilesArray, 0, 0);
        this.frameLayer = map.createLayer("frameLayer",tilesArray, 0, 0);
        
    this.physics.world.bounds.width = this.bgLayer.width; 
    this.physics.world.bounds.height = this.bgLayer.height;

      //librarian_npc_animation
      this.anims.create({
        key:'librarianAnimation',
        frames: [
          { key: 'librarian', frame: 'library_2'},
          { key: 'librarian', frame: 'library_1'},
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
      

      //collect item
      this.book = this.physics.add.sprite(-10, -10, 'book');
      this.laptop = this.physics.add.sprite(-10, -10, 'laptop');

    //guard_npc
    this.add.sprite(838, 440, "librarian").play("librarianAnimation")

   

    //enable debug
    window.player = this.player;


    this.player.setCollideWorldBounds(true); // don't go out of the this.map 

    // // create the arrow keys
     this.cursors = this.input.keyboard.createCursorKeys();

    // // camera follow player 
    this.cameras.main.startFollow(this.player);

    this.chairLayer.setCollisionByExclusion(-1, true)
    this.furnitureLayer.setCollisionByExclusion(-1, true)
    this.frameLayer.setCollisionByExclusion(-1, true) 


    this.physics.add.collider(this.player, this.chairLayer);
    this.physics.add.collider(this.player, this.furnitureLayer);
    this.physics.add.collider(this.player, this.frameLayer); 
    


        
    }

    update() {

      //hold and drop book
      if (window.holdbook == 1) {

        this.book.x = this.player.x+32
        this.book.y = this.player.y
      }

      if (
        this.player.x > 800&&
        this.player.x < 825&&
        this.player.y > 460&&
        this.player.y < 480
      ) {

        console.log("dropbook")
        window.holdbook = 0
      }

      //hold laptop
     if (window.holdlaptop == 3) {

      this.laptop.x = this.player.x+32
      this.laptop.y = this.player.y
  }

    //go back to blockA counter
    if ( this.player.x > 1163
        && this.player.y > 400 && this.player.y < 495 ) {
  
          this.room1();
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
  room1(player, tile) {
    console.log("room1 function");
    let playerPos = {};
    playerPos.x = 172;
    playerPos.y = 823;
    playerPos.dir = "right";
    this.scene.start("room1",{playerPos: playerPos});
  }

    

}
