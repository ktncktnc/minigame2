var Enemy = cc.Sprite.extend({
    idleAnimation: null,
    walkAnimation: null,
    idleAction: null,
    walkAction: null,
    isWalk: false,
    left: false,
    type: null,
    active: true,
    pos: null,
    hp: null,
    cur_index: null,
    ctor : function(type){
        if(type > 2) type = 2;
        this._super();
        this.type = type;
        this.init();
    },

    init : function(){
        this.pos = [CONFIG.MAPSIZE[0] - 1, CONFIG.MAPSIZE[1] - 1];
        this.addChild(cc.Node.create());
        this.hp = 500;
        this.cur_index = 0;
        this.idleAnimation = new cc.Animation();
        this.walkAnimation = new cc.Animation();
        addAnimation(this.idleAnimation, CONFIG.ENEMY_NAME[this.type], true);
        addAnimation(this.walkAnimation, CONFIG.ENEMY_NAME[this.type], false);
        this.idleAnimation.setDelayPerUnit(CONFIG.DELAY_PERUNIT);
        this.walkAnimation.setDelayPerUnit(CONFIG.DELAY_PERUNIT);
        this.idleAction = cc.animate(this.idleAnimation);
        this.walkAction = cc.animate(this.walkAnimation);
        this.anchorX = 0.5;
        this.anchorY = 0.7;
        this,this.cur_index = 0;
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
            cc.moveBy(CONFIG.VELOCITY.ENEMIES[this.type], end_point),
            cc.CallFunc(this.idle, this)
        );
        this.runAction(moveTo);
    },

    destroy: function(){
        this.visible = false;
        this.active = false;
        
        this.setPosition(3000, 3000);
        
    },
    hit: function(){
        this.hp -= 250;
        if(this.hp <= 0){
            this.destroy();
            return 1;
        }
        return 0;
    }
});

Enemy.create = function(type){
    var enemy = new Enemy(type);
    gameScreen.board.addChild(enemy, CONFIG.ZORDER.ENEMY);
    CONFIG.CONTAINER.ENEMIES.push(enemy);
    return enemy;
}

Enemy.getOrCreateEnemy = function(){
    var enemy = null;
    for(var i = 0; i < CONFIG.CONTAINER.ENEMIES.length; i++){
        enemy = CONFIG.CONTAINER.ENEMIES[i];
        if(enemy.active == false){
            enemy.init();
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