class Coin {
    constructor(ctx, canvasSize, { x: coinPosX, y: coinPosY }) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.coinPos = { x: coinPosX, y: coinPosY }
        this.coinSize = { w: 30, h: 50 }

    }

    draw() {
        this.ctx.fillStyle = 'yellow'
        this.ctx.fillRect(this.coinPos.x, this.coinPos.y, this.coinSize.w, this.coinSize.h)
    }

}