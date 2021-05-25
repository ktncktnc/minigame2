var gameScreen = null;

var GameScreen = cc.Layer.extend({
    board: null,
    size: null,
    level: null,
    state: null,
    lvup: null,
    ctor: function(){
        this._super();
        gameScreen = this;
        this.level = 1;
        this.state = CONFIG.GAME_STATE.HOME;
        this.board = new GameBoard();
        
        this.board.setScale(2.5);
        this.addKeyboardEvent();
        this.addKeyboardEvent();

        this.schedule(this.Update, 0.02, cc.REPEAT_FOREVER, 0);
        // this.addChild(this.board.player, 400);
        // this.board.player.setPosition(400, 400);
        // this.board.player.setScale(1);
    },

    addKeyboardEvent: function(){
        if('keyboard' in cc.sys.capabilities){
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function (key, event){
                    if(gameScreen.state == CONFIG.GAME_STATE.HOME){
                        gameScreen.board.startGame();
                    }
                    if(key == 32){
                        var des = gameScreen.board.findShotPos();
                        gameScreen.board.player.shot(des);
                    }
                    gameScreen.board.moveObject(gameScreen.board.player,key - 37, 1);
                },
                onKeyReleased: function (key, event) {
                }
            }, this);
        }
    },
    Update: function(){
        var state = this.board.checkDone();
        if(state > 0){
            this.board.setVisible(false);
            this.board.destroy();
            if(state == 1)this.lvup = new LvDoneScreen();
            else if(state == 2)this.lvup = new LoseScreen();
            this.unschedule(this.Update);
            this.board = null;
            return;
            //this.lvup.setPosition(size.width/2, size.height/2);
        }
        this.board.checkHp();
    }

});