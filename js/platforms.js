class Platforms {

    constructor(ctx, canvasSize, { x: platformPosX, y: platformsPosY }, { w: platformsSizeW, h: platformsSizeH }) {

        this.ctx = ctx
        this.canvasSize = canvasSize
        this.platformsPos = { x: platformPosX, y: platformsPosY }
        this.platformsSize = { w: platformsSizeW, h: platformsSizeH }



    }


    draw() {
        this.ctx.fillStyle = 'brown'
        this.ctx.fillRect(this.platformsPos.x, this.platformsPos.y, this.platformsSize.w, this.platformsSize.h)
    }
}
