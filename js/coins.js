class Coin {
    constructor(ctx, canvasSize, { x: coinPosX, y: coinPosY }) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.coinPos = { x: coinPosX, y: coinPosY }
        this.coinSize = { w: 40, h: 40 }

        this.imgCoins = new Image()
        this.imgCoins.src = './img/coin.png'
        this.imgCoins.framesIndex = 0
        this.imgCoins.frames = 10

    }

    draw(framesCounter) {
        this.ctx.drawImage(
            this.imgCoins,
            (this.imgCoins.width / this.imgCoins.frames) * this.imgCoins.framesIndex, 0,
            this.imgCoins.width / this.imgCoins.frames, this.imgCoins.height,
            this.coinPos.x, this.coinPos.y, this.coinSize.w, this.coinSize.h)
        this.animateCoins(framesCounter)


    }

    animateCoins(framesCounter) {
        if (framesCounter % 5 === 0) {
            this.imgCoins.framesIndex++
        }
        if (this.imgCoins.framesIndex >= this.imgCoins.frames) {
            this.imgCoins.framesIndex = 0
        }

    }

}