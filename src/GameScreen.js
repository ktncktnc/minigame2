var gameScreen = null;

var GameScreen = cc.Layer.extend({
    board: null,
    size: null,
    ctor: function(){
        this._super();
        gameScreen = this;
        this.board = new GameBoard();
        this.board.setScale(2.5);
        this.addKeyboardEvent();
        // this.addChild(this.board.player, 400);
        // this.board.player.setPosition(400, 400);
        // this.board.player.setScale(1);
    },

    addKeyboardEvent: function(){
        if('keyboard' in cc.sys.capabilities){
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function (key, event){
                    gameScreen.board.moveObject(gameScreen.board.player,key - 37, 1);
                },
                onKeyReleased: function (key, event) {
                }
            }, this);
        }
    },

});