var GameBoard = cc.TMXTiledMap.extend({
    player: null,
    princess: null,
   ctor :function (){
       this._super(res.TILEMAP);
       this.init();
   },
    init : function(){
        gameScreen.board = this;
        this.size = cc.director.getWinSize();

        gameScreen.addChild(this, 100);
        this.anchorX = 0.5;
        this.anchorY = 0.5;
        this.setPosition(this.size.width/2, this.size.height/2);
        Enemy.preset();
        Barrier.preset();
        this.initCharacters();
        this.createBarriers();
    },


    initCharacters: function(){
        this.player = new Player();
        this.princess = new Princess();
        this.addChild(this.player, MW.ZORDER.PLAYER);
        this.addChild(this.princess, MW.ZORDER.PLAYER);
        this.player.setPosition(this.getPos(0, 0));
        this.princess.setPosition(this.getPos(6 , 6));

        this.createEnemy();
        //this.createEnemy();
        this.schedule(this.moveEnemies, 0.5, cc.REPEAT_FOREVER, 0);

    },

    getPos : function(x, y){
        var posX = 0, posY = 0;
        posX = ((MW.MAPSIZE[0] - x)*16 + 8);
        posY = (y + 2)*16 + 8;
        return cc.p(posX, posY);
    },

    createEnemy : function(){
        var enemy = Enemy.getOrCreateEnemy();
        var rand = getRandomInt(0, 2);
        if(rand == 0){
            enemy.setPosition(this.getPos(MW.MAPSIZE[0] - 1, 0));
            enemy.pos[0] = MW.MAPSIZE[0] - 1;
            enemy.pos[1] = 0;
        }
        else{
            enemy.setPosition(this.getPos(0, MW.MAPSIZE[1] - 1));
            enemy.pos[0] = 0;
            enemy.pos[1] = MW.MAPSIZE[1] - 1;
        }
    },

    createBarriers: function(){
        var barrier;
        var created = [];
        for(var i = 0; i < MW.BARRIER_SIZE[0]; i++){
            barrier = Barrier.getOrCreateBarrier();
            cc.log(barrier.active);
            var randX, randY;
            do {
                randX = getRandomInt(1, 6);
                randY = getRandomInt(1, 6);
            }
            while([randX, randY] in created);
            barrier.setPosition(this.getPos(randX, randY));
            barrier.pos[0] = randX;
            barrier.pos[1] = randY;
            cc.log(randX + " " + randY);
            created.push([randX, randY]);
        }
    },



    moveObject: function(object, key, isPlayer){
        if(!object.isWalk) {
            switch (key) {
                case 0:
                    if (this.checkPos(object.pos[0] + 1, object.pos[1], isPlayer)) {
                        object.isWalk = true;
                        if(object.left == false){
                            object.scaleX = -1;
                            object.left = true;
                        }
                        object.walkTo(-16, 0);
                        object.pos[0]++;
                    }
                    break;
                case 1:
                    if (this.checkPos(object.pos[0], object.pos[1] + 1, isPlayer)) {
                        object.isWalk = true;
                        object.walkTo(0, 16);
                        object.pos[1]++;
                    }
                    break;
                case 2:
                    if (this.checkPos(object.pos[0] - 1, object.pos[1], isPlayer)) {
                        object.isWalk = true;
                        object.walkTo(16, 0);
                        object.pos[0]--;
                    }
                    if(object.left == true){
                        object.scaleX = -1;
                        object.left = false;
                    }
                    break;
                case 3:
                    if (this.checkPos(object.pos[0], object.pos[1] - 1, isPlayer)) {
                        object.isWalk = true;
                        object.walkTo(0, -16);
                        object.pos[1]--;
                    }
                    break;
            }
        }
    },
    moveEnemies: function(){
        var enemy;
        for(var i = 0; i < MW.CONTAINER.ENEMIES.length; i++){
            enemy = MW.CONTAINER.ENEMIES[i];
            if(enemy.active){
                var prob = Math.random();
                if(prob < 0.5) continue;
                var moverand = getRandomInt(0, 4);
                if(enemy.pos[0])
                this.moveObject(enemy, moverand, 0);
            }
        }
    },
    checkPos: function(x, y, isPlayer){
        if(x < 0 || y < 0 || x > MW.MAPSIZE[0] - 1 || y > MW.MAPSIZE[1] -  1)
            return false;
        var barrier;
        for(var i = 0; i < MW.CONTAINER.BARRIERS.length; i++){
            barrier = MW.CONTAINER.BARRIERS[i];
            if(barrier.active && barrier.pos[0] == x && barrier.pos[1] == y)
                return false;
        }
        if(!isPlayer && x >= MW.MAPSIZE[0] - 1 && y >= MW.MAPSIZE[1] - 1)
            return false;

        return true;
    }
});

