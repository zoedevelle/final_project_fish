namespace SpriteKind {
    export const fishingNet = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile6`, function (sprite, location) {
    game.over(true)
})
function level1 () {
    game.splash("Underwater Runway", "Don't die by avoiding deadly objects!")
    game.splash("Level 1")
    tiles.setTilemap(tilemap`level1`)
    tiles.placeOnRandomTile(fish, assets.tile`myTile5`)
    for (let index = 0; index < 3; index++) {
        shark = sprites.create(img`
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ......8888888888...............8
            ....888888888888888...........88
            ..888888888888888888..........88
            .88888888888888888888........888
            8888888888888888888888......8888
            88888888888888888888888...888888
            .8888888888888888888888888888888
            ..888888888888888888888888888888
            ...88888888888888888888888888888
            8888888888888888888888.....88888
            8888888888888888888..........888
            .88888888888888888...........888
            ...8888888888888..............88
            .........88888................88
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            `, SpriteKind.Enemy)
        tiles.placeOnRandomTile(shark, assets.tile`myTile`)
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile9`, function (sprite, location) {
    game.splash("Level 3")
    level3 = true
    changeLevel = true
    tiles.placeOnRandomTile(fish, assets.tile`myTile5`)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile3`, function (sprite, location) {
    game.splash("Level 2")
    level2 = true
    changeLevel = true
    tiles.placeOnRandomTile(sprite, assets.tile`myTile5`)
    tiles.destroySpritesOfKind(SpriteKind.Enemy)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.fishingNet, function (sprite, otherSprite) {
    game.over(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    game.over(false)
})
let fishingNet: Sprite = null
let shark: Sprite = null
let changeLevel = false
let level3 = false
let level2 = false
let fish: Sprite = null
fish = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . c c c c . . . . . . . . 
    . . . c d d d d c c . . . . . . 
    . . . c d c c c c c c . . . . . 
    . . . c c d 4 4 4 4 c c . . . . 
    c c . c 1 4 4 4 4 4 d 4 c . . . 
    c 4 c 1 d 4 4 4 4 1 4 4 4 c . . 
    c 4 c 1 4 4 4 4 4 1 4 4 4 4 c . 
    f 4 4 1 4 4 4 4 4 1 4 4 4 4 4 f 
    f 4 f 1 4 4 4 c c 1 4 f 4 4 4 f 
    f 4 f d 4 4 f 4 4 1 4 4 4 4 4 f 
    f f f f d 4 f 4 c 1 4 4 4 4 f . 
    . . c f c 4 f f 4 4 d 4 f f . . 
    . . c b d c 4 4 4 4 f f . . . . 
    . . c d d d f f f f . . . . . . 
    . . . c c c . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(fish, 130, 130)
scene.cameraFollowSprite(fish)
level1()
level2 = false
level3 = false
changeLevel = false
game.onUpdate(function () {
    if (changeLevel == true) {
        if (level2 == true) {
            tiles.setTilemap(tilemap`level4`)
            changeLevel = false
        }
        if (level3 == true) {
            tiles.setTilemap(tilemap`level8`)
            changeLevel = false
        }
    }
})
game.onUpdateInterval(500, function () {
    if (level2 || level3) {
        shark = sprites.create(img`
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ......8888888888...............8
            ....888888888888888...........88
            ..888888888888888888..........88
            .88888888888888888888........888
            8888888888888888888888......8888
            88888888888888888888888...888888
            .8888888888888888888888888888888
            ..888888888888888888888888888888
            ...88888888888888888888888888888
            8888888888888888888888.....88888
            8888888888888888888..........888
            .88888888888888888...........888
            ...8888888888888..............88
            .........88888................88
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            `, SpriteKind.Enemy)
        tiles.placeOnRandomTile(shark, assets.tile`myTile1`)
        shark.setVelocity(-70, 0)
        shark.setFlag(SpriteFlag.DestroyOnWall, true)
    }
})
game.onUpdateInterval(200, function () {
    if (level3) {
        fishingNet = sprites.createProjectileFromSide(img`
            ..........ff....
            .........ffff...
            ........fffff...
            .....fff.ffff...
            ....ff..fff.ff..
            ...ff..ffff.ff..
            ...f...f.f.fff..
            ...f..f..f.f.f..
            ...f.ff.ff.f.f..
            ..ff.f..f.ff.f..
            ..f.ff.ff.f..f..
            ..f.f..f..f..f..
            ..fff.ff.f..ff..
            ...f..f.ff..f...
            ...ffff.f.ff....
            ......ffff......
            ................
            ................
            ................
            ................
            `, 0, 50)
        fishingNet.setKind(SpriteKind.fishingNet)
        fishingNet.setPosition(randint(40, 800), 0)
    }
})
