var Player = cc.Sprite.extend({
    idleAnimation: null,
    walkAnimation: null,
    idleAction: null,
    walkAction: null,
    left: true,
    isWalk: false,
    active: true,
    pos: [0, 0],
    ctor : function(){
        this._super(res.KNIGHT_IDLE_1);
        this.init();
    },

    init : function(){
        this.active = false;
        this.anchorX = 0.5;
        this.anchorY = 0.9;
        

        this.setScaleY(0.9);
        this.setScaleX(-0.9);
        this.idleAnimation = new cc.Animation();
        this.walkAnimation = new cc.Animation();
        addAnimation(this.idleAnimation, "Knight", true);
        addAnimation(this.walkAnimation, "Knight", false);
        this.idleAnimation.setDelayPerUnit(MW.DELAY_PERUNIT);
        this.walkAnimation.setDelayPerUnit(MW.DELAY_PERUNIT);
        this.idleAction = new cc.Sequence(cc.animate(this.idleAnimation));
        this.walkAction = new cc.Sequence(cc.animate(this.walkAnimation));
        this.runAction(this.walkAction.repeatForever());
    },
    walk : function(){
        //this.stopAllActions();
        this.runAction(this.walkAction.repeatForever());
    },
    walkTo : function(x, y){
        this.isWalk = true;
        var end_point = cc.p(x, y);
        var moveTo = cc.sequence(
            cc.moveBy(MW.VELOCITY.PLAYER, end_point),
            cc.CallFunc(this.idle, this)
        );
        this.runAction(moveTo);
    },
    idle : function(){
        this.isWalk = false;
        //this.stopAction(this.walkAction);
        //this.runAction(this.idleAction.repeatForever());
    },
    shot: function(des){
        sword = Sword.getOrCreateSword();
        sword.setPosition(this.x, this.y - 15);

        var throwSword = cc.sequence(
            cc.moveTo(1, des),
            cc.CallFunc(sword.destroy, sword)
        );
        sword.runAction(throwSword);
    }
});

Player.create = function(){
    var player = new Player();
    MW.CONTAINER.PLAYERS.push(player);
    return player;
}

Player.getOrCreatePlayer = function(){
    var player = null;
    for(var i = 0; i < MW.CONTAINER.PLAYERS.length; i++){
        player = MW.CONTAINER.PLAYERS[i];
        if(!player.active){
            player.active = true;
            player.visible = true;
            return player;
        }
    }
    player = Player.create();
    return player;
}