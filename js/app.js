const controlerApp = {
    ctx: undefined,
    canvasTag: undefined,
    canvasSize: { w: 1600, h: 700 },
    player: undefined,
    platforms: [],
    keys: {
        ARROWLEFT: "ArrowLeft",
        ARROWRIGHT: "ArrowRight",
        SPACE: "Space",
        A: "KeyA"
    },
    FPS: 60,


    init() {
        this.setContext()
        this.setDimensions()
        this.start()
    },

    setContext() {
        this.canvasTag = document.querySelector('#game')
        this.ctx = this.canvasTag.getContext('2d')
    },

    setDimensions() {
        this.canvasTag.setAttribute('width', this.canvasSize.w)
        this.canvasTag.setAttribute('height', this.canvasSize.h)
    },

    drawAll() {
        this.player.draw()
        this.platforms.forEach(elm => elm.draw())
    },
    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    start() {
        this.reset()
        setInterval(() => {
            this.clearAll()
            this.drawAll()
            this.colisionPlatform()
            this.player.move()
        }, 10)
    },

    reset() {
        this.player = new Player(this.ctx, this.canvasSize, this.keys)
        this.generatePlatforms()
    },




    colisionPlatform() {
        this.platforms.forEach(elm => {
            if (this.player.playerPos.x < elm.platformsPos.x + elm.platformsSize.w &&
                this.player.playerPos.y < elm.platformsPos.y + elm.platformsSize.h &&
                this.player.playerPos.x + this.player.playerSize.w > elm.platformsPos.x &&
                this.player.playerPos.y + this.player.playerSize.h > elm.platformsPos.y) {
                return console.log('hit')
            }
        })
    },




    generatePlatforms() {
        this.platforms.push(
            new Platforms(this.ctx, this.canvasSize, 1150, 500, 200, 200),
            new Platforms(this.ctx, this.canvasSize, 1000, 600, 100, 100),
            new Platforms(this.ctx, this.canvasSize, 1400, 400, 100, 300),
            new Platforms(this.ctx, this.canvasSize, 700, 500, 100, 20),
        )
    }


}

