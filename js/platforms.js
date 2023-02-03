class Platforms {

    constructor(ctx, canvasSize, { x: platformsPosX, y: platformsPosY }, { w: platformsSizeW, h: platformsSizeH }, platformType) {

        this.ctx = ctx
        this.canvasSize = canvasSize
        this.platformsPos = { x: platformsPosX, y: platformsPosY }
        this.platformsSize = { w: platformsSizeW, h: platformsSizeH }
        this.platformType = platformType
        this.platform = undefined

        this.init()

    }

    init() {
        if (this.platformType === 1) {
            this.platform = new Image()
            this.platform.src = "./img/Suelo.png"


        } else if (this.platformType === 2) {
            this.platform = new Image()
            this.platform.src = "./img/Plataforma.png"
        }

    }

    draw() {
        this.ctx.drawImage(this.platform, this.platformsPos.x, this.platformsPos.y, this.platformsSize.w, this.platformsSize.h)
    }
}
