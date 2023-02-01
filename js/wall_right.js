class WallRight {
    constructor(ctx, canvasSize, { x: wallPosX, y: wallPosY }, { w: wallSizeW, h: wallSizeH }) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.wallRightPos = { x: wallPosX, y: wallPosY }
        this.wallRightSize = { w: wallSizeW, h: wallSizeH }
    }

    draw() {
        this.ctx.fillRect(this.wallRightPos.x, this.wallRightPos.y, this.wallRightSize.w, this.wallRightSize.h)
    }
}