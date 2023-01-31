class Heart {
    constructor(ctx, canvasSize, { x: heartPosX, y: heartPosY }) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.heartPos = { x: heartPosX, y: heartPosY }
        this.heartSize = { w: 30, h: 50 }

    }

    draw() {
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.heartPos.x, this.heartPos.y, this.heartSize.w, this.heartSize.h)
    }
}