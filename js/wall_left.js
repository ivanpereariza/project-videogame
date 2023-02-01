class WallLeft {
    constructor(ctx, canvasSize, { x: wallPosX, y: wallPosY }, { w: wallSizeW, h: wallSizeH }) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.wallLeftPos = { x: wallPosX, y: wallPosY }
        this.wallLeftSize = { w: wallSizeW, h: wallSizeH }
    }

    draw() {
        this.ctx.fillRect(this.wallLeftPos.x, this.wallLeftPos.y, this.wallLeftSize.w, this.wallLeftSize.h)
    }
}