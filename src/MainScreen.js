var MainScreen = cc.Layer.extend({
    title: null,
    start: null,
    exit: null,
    size: null,
    ctor: function(){
        this._super();
        this.init();
    },

    init: function(){
        this.size = cc.director.getWinSize();
        this.title = cc.TextFieldTTF.create("Giai Cuu Cong Chua", "04b_03", 40);
        this.addChild(this.title, 100);
        this.title.setTextColor(cc.color(255, 0, 0, 255));
        this.title.setPosition(this.size.width/2, this.size.height - 100);


        var newGameNormal = new cc.Sprite(res.BUTTON, cc.rect(0, 0, CONFIG.BUTTON_SIZE[0], CONFIG.BUTTON_SIZE[1]));
        var newGameSelected = new cc.Sprite(res.BUTTON, cc.rect(0, CONFIG.BUTTON_SIZE[1], CONFIG.BUTTON_SIZE[0], CONFIG.BUTTON_SIZE[1]));
        var newGameDisabled = new cc.Sprite(res.BUTTON, cc.rect(0, CONFIG.BUTTON_SIZE[1], CONFIG.BUTTON_SIZE[0], CONFIG.BUTTON_SIZE[1]));
        this.start = new cc.MenuItemSprite(newGameNormal, newGameSelected, newGameDisabled, function () {
            this.onNewGame();
        }.bind(this));
		this.start.scale = 0.5;

        var exitNormal = new cc.Sprite(res.BUTTON,  cc.rect(0,  CONFIG.BUTTON_SIZE[1]*2,  CONFIG.BUTTON_SIZE[0], CONFIG.BUTTON_SIZE[1]));
        var exitSelected = new cc.Sprite(res.BUTTON, cc.rect(0, CONFIG.BUTTON_SIZE[1]*3, CONFIG.BUTTON_SIZE[0], CONFIG.BUTTON_SIZE[1]));
        var exitDisabled = new cc.Sprite(res.BUTTON, cc.rect(0, CONFIG.BUTTON_SIZE[1]*3, CONFIG.BUTTON_SIZE[0], CONFIG.BUTTON_SIZE[1]));
        this.exit = new cc.MenuItemSprite(exitNormal, exitSelected, exitDisabled, function () {
            this.onExitGame();
            //flareEffect(flare, this, this.onNewGame);		//write your own flare effect
        }.bind(this));
        this.exit.scale = 0.5;

        var menu = new cc.Menu(this.start, this.exit);
        menu.alignItemsVerticallyWithPadding(15);
        this.addChild(menu, 1, 2);
        menu.x = this.size.width / 2;
        menu.y = this.size.height / 2 + 50;
    },
    
    onNewGame: function(){
        fr.view(GameScreen);
    },
    onExitGame: function(){
        cc.director.end();
    }

});