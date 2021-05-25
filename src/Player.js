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
        this.idleAnimation.setDelayPerUnit(CONFIG.DELAY_PERUNIT);
        this.walkAnimation.setDelayPerUnit(CONFIG.DELAY_PERUNIT);
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
            cc.moveBy(CONFIG.VELOCITY.PLAYER, end_point),
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
            cc.moveTo(0.9/(8.5*1.5*16)*Math.sqrt(Math.pow(des.x - this.x, 2) + Math.pow(des.y - this.y, 2)), des),
            cc.CallFunc(sword.destroy, sword)
        );
        sword.runAction(throwSword);
    }
});

Player.create = function(){
    var player = new Player();
    CONFIG.CONTAINER.PLAYERS.push(player);
    return player;
}

Player.getOrCreatePlayer = function(){
    var player = null;
    for(var i = 0; i < CONFIG.CONTAINER.PLAYERS.length; i++){
        player = CONFIG.CONTAINER.PLAYERS[i];
        if(!player.active){
            player.active = true;
            player.visible = true;
            return player;
        }
    }
    player = Player.create();
    return player;
}