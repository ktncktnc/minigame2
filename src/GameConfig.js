var MW = MW || {};
MW.GAME_STATE = {
    HOME:0,
    PLAY:1,
    OVER:2
};
MW.MAXLEVEL = 4;

MW.DELAY_PERUNIT = 1/8;

MW.ZORDER = {
    ENEMY: 300,
    GAMEBOARD: 100,
    SPIKE: 200,
    PLAYER: 400
};

MW.MAPSIZE = [7,7]
MW.SCALE = {
    FLOOR: 3.5,
    PERSON: 2.5,
}

MW.BARRIER_SIZE = [3, 4, 5];
MW.VELOCITY = {
    PLAYER: 0.3,
    ENEMIES: [0.3, 0.3, 0.3],

}
MW.LEVEL_SIZE = {
    LEVEL1: [3, 4],
    LEVEL2: [4, 5],
    LEVEL3: [5, 6],
    LEVEL4: [6, 7]
}

MW.SCORE = 0;

MW.SOUND = true;

MW.CONTAINER = {
    ENEMIES: [],
    BARRIERS: []
}

MW.BUTTON_SIZE = [198, 52];

MW.ENEMY_NAME = ["Demon", "Executioner", "Thief"];
