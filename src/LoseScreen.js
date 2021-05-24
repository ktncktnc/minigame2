var LoseScreen = cc.Layer.extend({
    player: null,
    princess: null,
    ctor: function(){
        this._super();
        this.player = new Player();
        this.princess = new Princess();
        size = cc.director.getWinSize();
        this.addChild(this.player, 100);
        this.addChild(this.princess, 100);
        this.setScale(2.5);
        this.player.setPosition(size.width/2 + 20, size.height/2);
        this.princess.setPosition(size.width/2 - 20, size.height/2);
        this.player.setScaleX(-this.player.scaleX);
        this.princess.setScaleX(-this.princess.scaleX);
        gameScreen.addChild(this, 100);
        var playerMove = cc.sequence(
            cc.moveBy(2.5, cc.p(15, 0)),
            //,
            cc.CallFunc(this.done, this)
        );
        var princessMove = cc.sequence(
            cc.moveBy(2.5, cc.p(-15, 0))
        );
        this.player.runAction(playerMove);
        this.princess.runAction(princessMove);
    },
    done: function(){
        fr.view(MainScreen);
    },
    destroy: function(){
        this.player = null;
        this.princess = null;
    }
});