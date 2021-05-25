var GameBoard = cc.TMXTiledMap.extend({
    player: null,
    princess: null,
    path: null,
    deathcount: null,
   ctor :function (){
       this._super(res.TILEMAP);
       this.init();
   },
    init : function(){
        gameScreen.board = this;
        this.size = cc.director.getWinSize();
        this.deathcount = 0;
        gameScreen.addChild(this, 100);
        this.anchorX = 0.5;
        this.anchorY = 0.5;
        this.setPosition(this.size.width/2, this.size.height/2);
        Enemy.preset();
        Barrier.preset();
        this.createBarriers();
        this.initCharacters();
    },

    initCharacters: function(){
        this.player = new Player();
        this.player.retain();
        this.princess = new Princess();
        this.princess.retain();
        this.addChild(this.player, CONFIG.ZORDER.PLAYER);
        this.addChild(this.princess, CONFIG.ZORDER.PLAYER);
        this.player.setPosition(this.getPos(0, 1));
        this.princess.setPosition(this.getPos(0 , 0));
        this.player.pos[0] = 0;
        this.player.pos[1] = 1;

        
        //this.createEnemy();

    },

    startGame: function(){
        gameScreen.state = CONFIG.GAME_STATE.PLAY;
        this.schedule(this.createEnemies, 4, cc.REPEAT_FOREVER, 0);

        this.schedule(this.moveEnemies, 0.5, cc.REPEAT_FOREVER, 0);
        this.path = this.findPath();

    },

    checkHp: function(){
        var enemy = null;
        var sword = null;
        for(var i =0; i < CONFIG.CONTAINER.ENEMIES.length; i++){
            enemy = CONFIG.CONTAINER.ENEMIES[i];
            if(!enemy.active) continue;
            for(var j = 0; j < CONFIG.CONTAINER.SWORDS.length; j++){
                sword = CONFIG.CONTAINER.SWORDS[j];
                if(!sword.active) continue;
                if(this.collide(enemy, sword)){
                    if(enemy.hit()) this.deathcount++;
                    sword.destroy();
                }
            }
        }
    },

    checkDone: function(){
        if(this.deathcount >= 10){
            var enemy;
            for(var i = 0; i < CONFIG.CONTAINER.ENEMIES.length; i++){
                enemy = CONFIG.CONTAINER.ENEMIES[i];
                if(enemy.active) enemy.destroy();
            }
            return 1;
        }
        for(var i = 0; i < CONFIG.CONTAINER.ENEMIES.length; i++){
            enemy = CONFIG.CONTAINER.ENEMIES[i];
            if(this.collide(enemy, this.princess) && enemy.pos[0] == this.princess.pos[0] && enemy.pos[1] == this.princess.pos[1]) return 2;
        }
        for(var i = 0; i < CONFIG.CONTAINER.ENEMIES.length; i++){
            enemy = CONFIG.CONTAINER.ENEMIES[i];
            if(!enemy.active) continue;
            if(enemy.pos[0] == this.player.pos[0] && enemy.pos[1] == this.player.pos[1] && this.collide(enemy, this.player)){
                return 2;
            }
            
        };
        return 0;
    },


    collide: function(a, b){
        var aRect = a.getBoundingBox();
        var bRect = b.getBoundingBox();
        return cc.rectIntersectsRect(aRect, bRect);
    },

    getPos : function(x, y){
        var posX = 0, posY = 0;
        posX = ((x+1)*16 + 8);
        posY = (CONFIG.MAPSIZE[1] - y + 1)*16 + 8;
        return cc.p(posX, posY);
    },

    createEnemies: function(){
        var enemy, barrier;
        enemy = Enemy.getOrCreateEnemy();
        enemy.pos[0] = 6;
        enemy.pos[1] = 6;
        enemy.setPosition(this.getPos(enemy.pos[0], enemy.pos[1]));
            
    },

    createBarriers: function(){
        var barrier;
        var free_pos = [...Array((CONFIG.MAPSIZE[0] - 2)*(CONFIG.MAPSIZE[1] - 2)).keys()];
        for(var i = 0; i < CONFIG.BARRIER_SIZE[0]; i++){
            barrier = Barrier.getOrCreateBarrier();
            var rand = [];
            rand.push(free_pos[getRandomInt(0, free_pos.length)]);

            if((rand[0] % (CONFIG.MAPSIZE[0] - 2)) != 0)
                rand.push(rand[0] - 1);

            if(((rand[0] + 1) % (CONFIG.MAPSIZE[0] - 2)) != 0)
                rand.push(rand[0] + 1);
            
            if(rand[0] > (CONFIG.MAPSIZE[0] - 2))
                rand.push(rand[0] - CONFIG.MAPSIZE[0] + 2);

            if(rand[0] < (CONFIG.MAPSIZE[0] - 2)*(CONFIG.MAPSIZE[1] - 3))
                rand.push(rand[0] + CONFIG.MAPSIZE[0] - 2);

            free_pos = free_pos.filter(function(value, index, arr){ 
                for(var i = 0; i < rand.length; i++)
                    if(value == rand[i]) return false;
                return true;
            });
            
            barrier.pos[0] = rand[0]%(CONFIG.MAPSIZE[0] - 2) + 1;
            barrier.pos[1] = Math.floor(rand[0]/(CONFIG.MAPSIZE[0] - 2)) + 1;
            barrier.setPosition(this.getPos(barrier.pos[0], barrier.pos[1]));

        }
    },

    moveObject: function(object, key, isPlayer){
        if(!object.isWalk) {
            switch (key) {
                case 0:
                    if (this.checkPos(object.pos[0] - 1, object.pos[1], isPlayer)) {
                        object.isWalk = true;
                        if(object.left == false){
                            object.setScaleX(-object.scaleX);
                            object.left = true;
                        }
                        object.walkTo(-16, 0);
                        object.pos[0]--;
                    }
                    break;
                case 1:
                    if (this.checkPos(object.pos[0], object.pos[1] - 1, isPlayer)) {
                        object.isWalk = true;
                        object.walkTo(0, 16);
                        object.pos[1]--;
                    }
                    break;
                case 2:
                    if (this.checkPos(object.pos[0] + 1, object.pos[1], isPlayer)) {
                        object.isWalk = true;
                        object.walkTo(16, 0);
                        object.pos[0]++;
                    }
                    if(object.left == true){
                        object.setScaleX(-object.scaleX);

                        object.left = false;
                    }
                    break;
                case 3:
                    if (this.checkPos(object.pos[0], object.pos[1] + 1, isPlayer)) {
                        object.isWalk = true;
                        object.walkTo(0, -16);
                        object.pos[1]++;
                    }
                    break;
            }
        }
    },

    moveEnemies: function(){
        var enemy;
        for(var i = 0; i < CONFIG.CONTAINER.ENEMIES.length; i++){
            enemy = CONFIG.CONTAINER.ENEMIES[i];
            
            if(enemy.active){
                if(enemy.cur_index >= this.path.length) enemy.destroy();
                var nextX = this.path[enemy.cur_index].y;
                var nextY = this.path[enemy.cur_index].x;
                if(i == 0)cc.log(nextX + " " + nextY + " " + enemy.cur_index);
                var pos;
                if(nextX != enemy.pos[0]) pos = 0;
                if(nextY != enemy.pos[1]) pos = 1;
                this.moveObject(enemy, pos, 0);
                if(enemy.pos == [0, 0]) enemy.destroy();
                enemy.cur_index++;

            }
        }
        
    },

    checkPos: function(x, y, isPlayer){
        if(x < 0 || y < 0 || x > CONFIG.MAPSIZE[0] - 1 || y > CONFIG.MAPSIZE[1] -  1)
            return false;
        var barrier;
        for(var i = 0; i < CONFIG.CONTAINER.BARRIERS.length; i++){
            barrier = CONFIG.CONTAINER.BARRIERS[i];
            if(!barrier.active) continue;
            if(barrier.pos[0] == x && barrier.pos[1] == y)
                return false;
        }
        if(!isPlayer && x >= CONFIG.MAPSIZE[0] - 1 && y >= CONFIG.MAPSIZE[1] - 1)
            return false;

        return true;
    },
    findPath: function(){
        var gr = new Array(CONFIG.MAPSIZE[1]);
        for(var i = 0; i < gr.length; i++){
            gr[i] = [];
            for(var j = 0; j < CONFIG.MAPSIZE[0]; j++){
                gr[i][j] = 1;
                
            }
        }
        var barrier = null;
        for(var i = 0; i < CONFIG.CONTAINER.BARRIERS.length; i++){
            barrier = CONFIG.CONTAINER.BARRIERS[i];
            if(!barrier.active) continue;
            gr[barrier.pos[1]][barrier.pos[0]] = 0;
        }
    
        var graph = new Graph(gr, {diagonal: false});
        var end = graph.grid[0][0];
        var start = graph.grid[CONFIG.MAPSIZE[0] - 1][CONFIG.MAPSIZE[1] - 1];
        var result = astar.search(graph, start, end, { heuristic: astar.heuristics.manhattan });
        return result;
    },
    findShotPos: function(){
        var enemy = null;
        var minX = 0, minY = 0;
        var minDis = 100000.0, dis = 0;
        for(var i = 0; i < CONFIG.CONTAINER.ENEMIES.length; i++){
            enemy = CONFIG.CONTAINER.ENEMIES[i];
            if(!enemy.active) continue;
            dis = Math.sqrt(Math.pow(enemy.pos[0]  -this.player.pos[0], 2) + Math.pow(enemy.pos[1] - this.player.pos[1], 2));
            //cc.log(dis);
            if(dis < minDis){
                minDis = dis;
                minX = enemy.pos[0];
                minY = enemy.pos[1];
            }
        }
        if(minDis == 100000) return this.getPos(CONFIG.MAPSIZE[0]- 1, CONFIG.MAPSIZE[1] - 1);
        cc.log(minX + " " + minY);
        return this.getPos(minX, minY);
    },
    destroy: function(){
        this.stopAllActions();
        for(var i = 0; i < CONFIG.CONTAINER.ENEMIES.length; i++) {
            CONFIG.CONTAINER.ENEMIES[i].destroy();
            CONFIG.CONTAINER.ENEMIES[i].stopAllActions();
        }
        for(var i = 0; i < CONFIG.CONTAINER.BARRIERS.length; i++) {

            CONFIG.CONTAINER.BARRIERS[i].destroy();

        }
        for(var  i = 0; i < CONFIG.CONTAINER.SWORDS.length; i++){
            CONFIG.CONTAINER.SWORDS[i].destroy();
            CONFIG.CONTAINER.SWORDS[i].release();
        }
        CONFIG.CONTAINER.BARRIERS = [];
        CONFIG.CONTAINER.ENEMIES = [];
        CONFIG.CONTAINER.SWORDS = [];
        
    }
});

