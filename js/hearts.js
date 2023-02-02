class Heart {
    constructor(ctx, canvasSize, { x: heartPosX, y: heartPosY }) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.heartPos = { x: heartPosX, y: heartPosY }
        this.heartSize = { w: 40, h: 40 }

        this.imgHeart = new Image()
        this.imgHeart.src = './img/heart.png'
        this.imgHeart.framesIndex = 0
        this.imgHeart.frames = 10
    }

    draw(framesCounter) {
        this.ctx.drawImage(
            this.imgHeart,
            (this.imgHeart.width / this.imgHeart.frames) * this.imgHeart.framesIndex, 0,
            this.imgHeart.width / this.imgHeart.frames, this.imgHeart.height,
            this.heartPos.x, this.heartPos.y, this.heartSize.w, this.heartSize.h)
        this.animateHeart(framesCounter)


    }

    animateHeart(framesCounter) {
        if (framesCounter % 5 === 0) {
            this.imgHeart.framesIndex++
        }
        if (this.imgHeart.framesIndex >= this.imgHeart.frames) {
            this.imgHeart.framesIndex = 0
        }

    }
}