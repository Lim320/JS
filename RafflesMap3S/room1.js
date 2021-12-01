class room1 extends Phaser.Scene {

    constructor() {
        super({ key: 'room1' });
        // window.holdbook = 0
        
        // Put global variable here
    }


    init(data) {
        this.playerPos = data.playerPos;
    }

    preload() {
    //step 1 load Json
        this.load.tilemapTiledJSON("BAr1","assets/BlockA-counter.json");

    //load image
    this.load.image("atlas","assets/atlas32x32.png");
    this.load.image("modern","assets/mordern32x32.png");

    //npc sas movement
    this.load.atlas('sas','assets/sas.png','assets/sas.json');

    //collect items
    this.load.image("book","assets/book.png");
    }

    create() {
        console.log('*** room1 scene');

        let map = this.make.tilemap({key: "BAr1"});

        let atlasTiles = map.addTilesetImage("atlas32x32","atlas");
        let mordernTiles = map.addTilesetImage("mordern32x32","modern");

        let tilesArray = [ atlasTiles, mordernTiles ]

        this.bgLayer = map.createLayer("backgroundLayer",tilesArray, 0, 0);
        this.frameLayer = map.createLayer("frameLayer",tilesArray, 0, 0);
        this.carpetLayer = map.createLayer("carpetLayer",tilesArray, 0, 0);
        this.furnitureLayer = map.createLayer("furnitureLayer",tilesArray, 0, 0);
        this.itemLayer = map.createLayer("itemLayer",tilesArray, 0, 0);


    this.physics.world.bounds.width = this.bgLayer.width; 
    this.physics.world.bounds.height = this.bgLayer.height;

    //collect item
    this.book = this.physics.add.sprite(423, 381, 'book');

    //collect action
    // this.physics.add.overlap(this.player, this.book, this.holditem, null, this);

    //lecturer_sas_animation
    this.anims.create({
        key:'sasAnimation',
        frames: [
          { key: 'sas', frame: 'sas_2'},
          { key: 'sas', frame: 'sas_1'},
        ],
        frameRate: 2,
        repeat: -1
      })


    //sas_npc
    this.sas = this.physics.add.sprite(647,656, "sas").play("sasAnimation");
 
    //mainCharacter
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

    this.frameLayer.setCollisionByExclusion(-1, true)
    this.furnitureLayer.setCollisionByExclusion(-1, true)
    this.itemLayer.setCollisionByExclusion(-1, true) 
    this.carpetLayer.setCollisionByExclusion(-1, true) 

    this.physics.add.collider(this.player, this.frameLayer);
    this.physics.add.collider(this.player, this.furnitureLayer);
    this.physics.add.collider(this.player, this.itemLayer); 
    // this.physics.add.collider( this.sas, this.player) 
    }

    update() {

        //hold book
        // if (window.holdbook == 1){

        //     this.book.x = this.player.x+32
        //     this.book.y = this.player.y
        // }

    //go back to worldmap, check for blockA exit
    if ( this.player.x > 592 && this.player.x < 687
        && this.player.y > 1165 ) {
            this.world();
        }

    //go to computerlab
    if ( this.player.x > 1170
        && this.player.y > 390 && this.player.y < 495 ) {
            this.computerlab();
        }

    //go to library
    if ( this.player.x < 114
        && this.player.y > 784 && this.player.y < 879 ) {
            this.library();
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

        // Function to jump to worldmap
     world(player, tile) {
        console.log("world function");
        let playerPos = {};
        playerPos.x = 373;
        playerPos.y = 1103;
        playerPos.dir = "down";
        this.scene.start("world",{playerPos: playerPos});
     }

        // Function to jump to computerlab
        computerlab(player, tile) {
            console.log("computerlab function");
            let playerPos = {};
            playerPos.x = 172;
            playerPos.y = 441;
            playerPos.dir = "right";
            this.scene.start("computerlab",{playerPos: playerPos});
        }

        // Function to jump to library
        library(player, tile) {
            console.log("library function");
            let playerPos = {};
            playerPos.x = 1120;
            playerPos.y = 460;
            playerPos.dir = "left";
            this.scene.start("library",{playerPos: playerPos});
        }

        //function to hold book
        // holditem(player) {
        //     console.log("hold item")

        //     window.holdbook = 1
        // }

    

}
