input.onButtonPressed(Button.A, function () {
    Alt += -1
    if (Alt < 0) {
        Alt = 0
    }
    Xwing.set(LedSpriteProperty.Y, Alt)
    Missle.set(LedSpriteProperty.Y, Alt)
})
input.onButtonPressed(Button.AB, function () {
    doMiss()
})
input.onButtonPressed(Button.B, function () {
    Alt += 1
    if (Alt > 4) {
        Alt = 4
    }
    Xwing.set(LedSpriteProperty.Y, Alt)
    Missle.set(LedSpriteProperty.Y, Alt)
})
input.onGesture(Gesture.Shake, function () {
    music.playTone(523, music.beat(BeatFraction.Eighth))
    music.playTone(784, music.beat(BeatFraction.Eighth))
    droid += 1
    if (droid > 1) {
        droid = 0
    }
})
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    sound += 1
    if (sound > 1) {
        basic.showIcon(IconNames.No)
        sound = 0
    } else {
        basic.showIcon(IconNames.EigthNote)
        doTheme()
    }
})
function doTheme () {
    music.playMelody("C G F E D C5 G - ", 107)
}
function doMiss () {
    if (1 == sound) {
        soundExpression.spring.play()
    }
    while (!(4 == Missle.get(LedSpriteProperty.X))) {
        Missle.move(1)
        basic.pause(125)
    }
    Missle.set(LedSpriteProperty.X, Xwing.get(LedSpriteProperty.X))
    Missle.set(LedSpriteProperty.Y, Xwing.get(LedSpriteProperty.Y))
}
let Tie2: game.LedSprite = null
let Tie1: game.LedSprite = null
let droid = 0
let Missle: game.LedSprite = null
let Xwing: game.LedSprite = null
let Alt = 0
let sound = 0
game.setScore(0)
game.setLife(5)
sound = 0
images.createBigImage(`
    . . . . . . . . . .
    . . . # . # # # . .
    . # # . # # . . . .
    . . . . . # # # . .
    . . . . . . . . . .
    `).scrollImage(1, 200)
Alt = 2
Xwing = game.createSprite(0, 2)
Missle = game.createSprite(Xwing.get(LedSpriteProperty.X), Xwing.get(LedSpriteProperty.Y))
droid = 0
basic.forever(function () {
    basic.pause(randint(500, 3000))
    Tie1 = game.createSprite(4, 2)
    Tie1.turn(Direction.Right, 180)
    for (let index2 = 0; index2 <= 4; index2++) {
        Tie1.move(randint(1, 3) / 2)
        if (Tie1.isTouching(Xwing)) {
            game.removeLife(1)
        }
        if (Tie1.get(LedSpriteProperty.Y) < Xwing.get(LedSpriteProperty.Y)) {
            Tie1.change(LedSpriteProperty.Y, 1)
        }
        if (Tie1.get(LedSpriteProperty.Y) > Xwing.get(LedSpriteProperty.Y)) {
            Tie1.change(LedSpriteProperty.Y, -1)
        }
        if (Missle.isTouching(Tie1)) {
            game.addScore(25)
            Tie1.delete()
            index2 = 4
        }
        basic.pause(400)
    }
    if (!(Tie1.isDeleted())) {
        Tie1.delete()
    }
})
basic.forever(function () {
    basic.pause(randint(500, 3000))
    Tie2 = game.createSprite(4, randint(0, 4))
    Tie2.turn(Direction.Right, 180)
    for (let index = 0; index <= 4; index++) {
        Tie2.move(randint(1, 3) / 2)
        if (Tie2.isTouching(Xwing)) {
            game.removeLife(1)
        }
        if (Tie2.get(LedSpriteProperty.Y) < Xwing.get(LedSpriteProperty.Y)) {
            Tie2.change(LedSpriteProperty.Y, 1)
        }
        if (Tie2.get(LedSpriteProperty.Y) > Xwing.get(LedSpriteProperty.Y)) {
            Tie2.change(LedSpriteProperty.Y, -1)
        }
        if (Missle.isTouching(Tie2)) {
            game.addScore(25)
            Tie2.delete()
            index = 4
        }
        basic.pause(400)
    }
    if (!(Tie2.isDeleted())) {
        Tie2.delete()
    }
})
basic.forever(function () {
    if (droid == 1) {
        Xwing.set(LedSpriteProperty.Y, 1)
        Missle.set(LedSpriteProperty.Y, 1)
        basic.pause(100)
        doMiss()
        basic.pause(100)
        Xwing.set(LedSpriteProperty.Y, 3)
        Missle.set(LedSpriteProperty.Y, 3)
        basic.pause(100)
        doMiss()
        basic.pause(100)
    }
})
