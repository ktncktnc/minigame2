var Enemy = cc.Sprite.extend({
    idleAnimation: null,
    walkAnimation: null,
    idleAction: null,
    walkAction: null,
    isWalk: false,
    left: false,
    type: null,
    active: true,
    pos: [10, 10],
    ctor : function(type){
        if(type > 2) type = 2;
        this._super();
        this.type = type;
        this.init();
    },

    init : function(){
        this.idleAnimation = new cc.Animation();
        this.walkAnimation = new cc.Animation();
        addAnimation(this.idleAnimation, MW.ENEMY_NAME[this.type], true);
        addAnimation(this.walkAnimation, MW.ENEMY_NAME[this.type], false);
        this.idleAnimation.setDelayPerUnit(MW.DELAY_PERUNIT);
        this.walkAnimation.setDelayPerUnit(MW.DELAY_PERUNIT);
        this.idleAction = cc.animate(this.idleAnimation);
        this.walkAction = cc.animate(this.walkAnimation);
        this.anchorX = 0.5;
        this.anchorY = 0.7;
        this.setScale(0.9);
        this.runAction(this.idleAction.repeatForever());
    },
    walk : function(){
        this.stopAllActions();
        this.runAction(this.walkAction.repeatForever());
    },
    idle : function(){
        //this.stopAllActions();
        //this.runAction(this.idleAction.repeatForever());
        this.isWalk = false;
    },

    walkTo: function(x, y){
        this.isWalk = true;
        var end_point = cc.p(x, y);
        var moveTo = cc.sequence(
            cc.moveBy(MW.VELOCITY.ENEMIES[this.type], end_point),
            cc.CallFunc(this.idle, this)
        );
        this.runAction(moveTo);
    },

    destroy: function(){
        this.visible = false;
        this.active = false;
        this.setPosition(3000, 3000);
    }
});

Enemy.create = function(type){
    var enemy = new Enemy(type);
    gameScreen.board.addChild(enemy, MW.ZORDER.ENEMY);
    MW.CONTAINER.ENEMIES.push(enemy);
    return enemy;
}

Enemy.getOrCreateEnemy = function(){
    var enemy = null;
    for(var i = 0; i < MW.CONTAINER.ENEMIES.length; i++){
        enemy = MW.CONTAINER.ENEMIES[i];
        if(enemy.active == false){
            enemy.active = true;
            enemy.visible = true;
            return enemy;
        }
    }
    var rand = getRandomInt(0, 3);
    enemy = Enemy.create(rand);
    return enemy;
}

Enemy.preset = function(){
    var enemy = null;
    var rand;
    for(var i = 0; i < 5; i++){
        rand = getRandomInt(0, 3);
        enemy = Enemy.create(rand);
        enemy.visible = false;
        enemy.active = false;
    }
}