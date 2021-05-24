var Barrier = cc.Sprite.extend({
    active: true,
    pos: null,
    ctor : function(){
        var rand = getRandomInt(0, 2);
        if(rand == 0)
            this._super(res.HOLE);
        else
            this._super(res.SPIKE);
        this.init();
    },

    init : function(){
        cc.log("init barrier");
        this.anchorY = 1.5;
        this.anchorX = 0.5;
        this.pos = [];
        this.pos.push(0);
        this.pos.push(0);
    },

    destroy: function(){
        this.active = false;
        this.visible = false;
    }
});

Barrier.create = function(){
    var barrier = new Barrier();
    gameScreen.board.addChild(barrier, MW.ZORDER.SPIKE);
    MW.CONTAINER.BARRIERS.push(barrier);
    return barrier;
};

Barrier.getOrCreateBarrier = function(){
    var barrier = null;
    for(var i = 0; i < MW.CONTAINER.BARRIERS.length; i++){
        barrier = MW.CONTAINER.BARRIERS[i];
        if(barrier.active == false){
            barrier.active = true;
            barrier.visible = true;
            return barrier;
        }
    }
    barrier = Barrier.create();
    return barrier;
};

Barrier.preset = function(){
    var barrier = null;
    for(var i = 0; i < 5; i++){
        barrier = Barrier.create();
        barrier.visible = false;
        barrier.active = false;
    }
}