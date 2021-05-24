var Princess = cc.Sprite.extend({
    idleAnimation: null,
    walkAnimation: null,
    idleAction: null,
    walkAction: null,
    pos: null,
    ctor : function(){
        this._super(res.KNIGHT_IDLE_1);
        this.init();
    },

    init : function(){
        this.anchorX = 0.5;
        this.anchorY = 0.7;
        this.pos = []
        this.pos.push(0);
        this.pos.push(0);
        this.setScale(0.9);
        this.idleAnimation = new cc.Animation();
        this.walkAnimation = new cc.Animation();
        addAnimation(this.idleAnimation, "Princess", true);
        addAnimation(this.walkAnimation, "Princess", false);
        this.idleAnimation.setDelayPerUnit(MW.DELAY_PERUNIT);
        this.walkAnimation.setDelayPerUnit(MW.DELAY_PERUNIT);
        this.idleAction = cc.animate(this.idleAnimation);
        this.walkAction = cc.animate(this.walkAnimation);
        this.runAction(this.idleAction.repeatForever());
    },
    walk : function(){
        this.stopAllActions();
        this.runAction(this.walkAction.repeatForever());
    },
    walkTo : function(x, y){
        this.walk();
        var move = cc.MoveTo(x, y);
    },
    idle : function(){
        this.stopAllActions();
        this.runAction(this.idleAction.repeatForever());
    }
});
