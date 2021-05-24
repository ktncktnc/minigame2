var Sword = cc.Sprite.extend({
    active:true,
    ctor:function(){
        this._super(res.SWORD);
        gameScreen.board.addChild(this, 1000);
        this.setScale(0.3);
        cc.log("add child");

    },
    destroy: function(){
        this.active = false;
        this.visible = false;
        this.stopAllActions();
        this.setPosition(0,0);
    }
});

Sword.create = function(){
    var sword = new Sword();
    MW.CONTAINER.SWORDS.push(sword);
    return sword;
}

Sword.getOrCreateSword = function(){
    var sword = null;
    for(var i = 0; i < MW.CONTAINER.SWORDS.length; i++){
        sword = MW.CONTAINER.SWORDS[i];
        if(sword.active == false){
            sword.active = true;
            sword.visible = true;
            return sword;
        }
    }
    sword = Sword.create();
    return sword;

}

Sword.preset = function(){
    var sword = null;
    for(var i = 0; i < 20; i++){
        sword = Sword.create(MW.LASER.PLAYER, res.LASER1);
        sword.active = false;
        sword.visible = false;
       // MW.CONTAINER.PLAYER_LASERS.push(sword);
    };

    for(var i = 0; i < 20; i++){
        sword = Sword.create(MW.LASER.ENEMY, res.LASER2);
        sword.active = false;
        sword.visible = false;
        // MW.CONTAINER.PLAYER_LASERS.push(sword);
    }

}