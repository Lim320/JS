class computerlab extends Phaser.Scene {

    constructor() {
        super({ key: 'computerlab' });
        window.holdlaptop = 0
        
        // Put global variable here
    }


    init(data) {
        this.playerPos = data.playerPos
        this.inventory = data.inventory
    }

    preload() {
    //step 1 load Json
        this.load.tilemapTiledJSON("computerlabBA","assets/BlockA-computerLab.json");

    //load image
    this.load.image("atlas","assets/atlas32x32.png");
    this.load.image("modern","assets/mordern32x32.png");

    //collect items
    this.load.image("bag","assets/bag.png");
    this.load.image("laptop","assets/laptop.png");
    //star_collect
    this.load.image("star","assets/star.png");

    //score

    }

    create() {
        console.log('*** computerlab scene');
        console.log("star:", window.stars);

        let map = this.make.tilemap({key: "computerlabBA"});

           //background_sound
           window.music = this.sound
          .add("bgmusic", {
         loop: true,
         }).setVolume(0.3);window.music.play();

         //collectsound
         this.collectsound = this.sound.add("collect");

        let atlasTiles = map.addTilesetImage("atlas32x32","atlas");
        let mordernTiles = map.addTilesetImage("mordern32x32","modern");

        let tilesArray = [ atlasTiles, mordernTiles ]

        this.bgLayer = map.createLayer("backgroundLayer",tilesArray, 0, 0);
        this.itemLayer = map.createLayer("itemLayer",tilesArray, 0, 0);
        this.carpetLayer = map.createLayer("carpetLayer",tilesArray, 0, 0);
        this.furnitureLayer = map.createLayer("furnitureLayer",tilesArray, 0, 0);
        this.frameLayer = map.createLayer("frameLayer",tilesArray, 0, 0);
        
    this.physics.world.bounds.width = this.bgLayer.width; 
    this.physics.world.bounds.height = this.bgLayer.height;

    // this text will show the score
    // this.scoreText = this.add.text(650, 50, this.score, {
    //   fontSize: '30px',
    //   fill: '#000000'
    //   });

      // fix the text to the camera
      // this.scoreText.setScrollFactor(0);
      // this.scoreText.visible = true;

      // this.anims.create({
      //   key: this.player,
      //   frames: [{key: this.player, frame: this.player}],
      //   frameRate: 10,
      //   });

    //main character
    // this.player = this.physics.add.sprite(186, 441, "right");

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

    this.itemLayer.setCollisionByExclusion(-1, true)
    this.furnitureLayer.setCollisionByExclusion(-1, true)
    this.frameLayer.setCollisionByExclusion(-1, true) 


    this.physics.add.collider(this.player, this.itemLayer);
    this.physics.add.collider(this.player, this.furnitureLayer);
    this.physics.add.collider(this.player, this.frameLayer); 

    //collect item laptop
    this.laptop = this.physics.add.sprite(684, 1109, 'laptop');

    //collect item bag_remove
    this.bag = this.physics.add.sprite(607, 1109, 'bag');

    //overlap_bag
    this.physics.add.overlap(this.player, this.bag, this.collectItem, null, this );

    //collect action_laptop
    this.physics.add.overlap(this.player, this.laptop, this.holditem3, null, this);

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


     //hold laptop
     if (window.holdlaptop == 3) {

      this.laptop.x = this.player.x+50
      this.laptop.y = this.player.y
  }

    //go back to blockA counter
    if ( this.player.x < 116
        && this.player.y > 400 && this.player.y < 495 ) {
  
          this.intro9();
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

     // Function to jump to computerlab
     intro9(player, tile) {
      console.log("intro9 function");
      this.scene.start("intro9");
      }

  //function to hold book
  holditem3(player) {
    console.log("hold item3")

    window.holdlaptop = 3
    this.star2.setVisible(true);
    window.stars = window.stars + 1
    this.collectsound.play();

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
    return false;
}

//function of collect item
collectItem (player,bag)
  {
  bag.disableBody(true,true);
  window.stars = window.stars + 1
  this.collectsound.play();

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
  return false;
   }

    

}
