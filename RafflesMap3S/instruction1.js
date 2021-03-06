const COLOR_PRIMARY = 0x3574dc;
const COLOR_LIGHT = 0xffffff;
const COLOR_DARK = 0xff00ff;

var content1 = 'Class are over... I should take my laptop and go.... oh wait, I have to go to the counter, I think I left something there... ***Press spacebar to continue';

class instruction1 extends Phaser.Scene {

    constructor() {
        super({ key: 'instruction1' });
        
        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.inventory = data.inventory
    }

    preload() {
    // //step 1 load Json
    //     this.load.tilemapTiledJSON("office","assets/BlockB-office.json");

    // //load image
    // this.load.image("atlas","assets/atlas32x32.png");
    // this.load.image("modern","assets/mordern32x32.png");

    // //npc lecturer movement
    // this.load.atlas('lecturer','assets/lecturer.png','assets/lecturer.json');

    this.load.scenePlugin({
      key: "rexuiplugin",
      url: "./rexuiplugin.min.js",
      sceneKey: "rexUI",
    });

    }

    create() {
      console.log("instruction1", this);

      createTextBox(this, 50, 500, {
        wrapWidth: 400,
      }).start(content1, 50);
  
      // Detect spacebar pressed
      var spaceDown = this.input.keyboard.addKey("SPACE");
  
      spaceDown.on(
        "down",
        function () {
          console.log("Spacebar pressed, goto computerlab");
          this.scene.start("computerlab", { player: this.player });
        },
        this
      );
    }

    update() {}
}

const GetValue = Phaser.Utils.Objects.GetValue;

var createTextBox = function (scene, x, y, config) {
  var wrapWidth = GetValue(config, "wrapWidth", 0);
  var fixedWidth = GetValue(config, "fixedWidth", 0);
  var fixedHeight = GetValue(config, "fixedHeight", 0);
  var textBox = scene.rexUI.add
    .textBox({
      x: x,
      y: y,

      background: scene.rexUI.add
        .roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY)
        .setStrokeStyle(2, COLOR_LIGHT),

      text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
      action: scene.add
        .image(0, 0, "nextPage")
        .setTint(COLOR_LIGHT)
        .setVisible(false),

      space: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
        icon: 10,
        text: 10,
      },
    })
    .setOrigin(0)
    .layout();

  textBox
    .setInteractive()
    .on(
      "pointerdown",
      function () {
        var icon = this.getElement("action").setVisible(false);
        this.resetChildVisibleState(icon);
        if (this.isTyping) {
          this.stop(true);
        } else {
          this.typeNextPage();
        }
      },
      textBox
    )
    .on(
      "pageend",
      function () {
        if (this.isLastPage) {
          return;
        }

        var icon = this.getElement("action").setVisible(true);
        this.resetChildVisibleState(icon);
        icon.y -= 30;
        var tween = scene.tweens.add({
          targets: icon,
          y: "+=30", // '+=100'
          ease: "Bounce", // 'Cubic', 'Elastic', 'Bounce', 'Back'
          duration: 500,
          repeat: 0, // -1: infinity
          yoyo: false,
        });
      },
      textBox
    );
  //.on('type', function () {
  //})

  return textBox;
};

var getBuiltInText = function (scene, wrapWidth, fixedWidth, fixedHeight) {
  return scene.add
    .text(0, 0, "", {
      fontSize: "20px",
      wordWrap: {
        width: wrapWidth,
      },
      maxLines: 20,
    })
    .setFixedSize(fixedWidth, fixedHeight);
};

