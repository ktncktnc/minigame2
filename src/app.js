function addAnimation(animation, charName, isIdle){
    var filename = "Frames/" + charName + "/" + charName + "_";
    var statename;
    if(isIdle)
        filename = filename + "Idle_";
    else
        filename = filename + "Walk_";
    for(var i = 1; i < 5; i++){
        statename = filename + i.toString() + ".png";
        animation.addSpriteFrameWithFile(statename);
    }
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}