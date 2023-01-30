const controlerApp = {
    name: "Proyect Mario",
    description: "2d scroll lateral game GOTY",
    version: "1.0.0",
    license: undefined,
    author: "Ivan y Juan Antonio",
    ctx: undefined,
    canvasTag: undefined,
    canvasSize: { w: 1600, h: 700 },
    player: undefined,
    platforms: [],
    enemys: [],
    enemyBullets: [],
    coins: [],
    keys: {
        MOVELEFT: "ArrowLeft",
        MOVERIGHT: "ArrowRight",
        JUMP: "Space",
        SHOOT: "KeyA"
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
        this.platforms.forEach(elm => elm.draw())
        this.enemys.forEach(elm => elm.draw())
        this.coins.forEach(elm => elm.draw())
        this.player.draw()
    },
    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    start() {
        this.reset()
        setInterval(() => {
            this.clearAll()
            this.drawAll()
            this.player.move()
        }, 10)
    },

    reset() {
        this.player = new Player(this.ctx, this.canvasSize, this.keys, this.platforms, this.enemys, this.coins)
        this.generatePlatforms()
        this.generateEnemys()
        this.generateCoins()
    },



    generateEnemys() {
        this.enemys.push(
            new Enemy(this.ctx, this.canvasSize, this.platforms, this.player, { x: 1000, y: 550 }),
            new Enemy(this.ctx, this.canvasSize, this.platforms, this.player, { x: 2350, y: 550 }),
            new Enemy(this.ctx, this.canvasSize, this.platforms, this.player, { x: 3000, y: 550 }),
            new Enemy(this.ctx, this.canvasSize, this.platforms, this.player, { x: 3600, y: 550 }),


        )
    },

    generatePlatforms() {
        this.platforms.push(
            new Platforms(this.ctx, this.canvasSize, { x: 0, y: 600 }, { w: 1500, h: 100 }),
            new Platforms(this.ctx, this.canvasSize, { x: 1700, y: 600 }, { w: 1500, h: 100 }),
            new Platforms(this.ctx, this.canvasSize, { x: 1490, y: 350 }, { w: 200, h: 20 }),
            new Platforms(this.ctx, this.canvasSize, { x: 1800, y: 400 }, { w: 200, h: 20 }),
            new Platforms(this.ctx, this.canvasSize, { x: 2100, y: 500 }, { w: 100, h: 20 }),
            new Platforms(this.ctx, this.canvasSize, { x: 2400, y: 500 }, { w: 100, h: 20 }),
            new Platforms(this.ctx, this.canvasSize, { x: 2600, y: 400 }, { w: 200, h: 20 }),
            new Platforms(this.ctx, this.canvasSize, { x: 2900, y: 350 }, { w: 200, h: 20 }),
            new Platforms(this.ctx, this.canvasSize, { x: 3500, y: 600 }, { w: 1400, h: 100 }),
            new Platforms(this.ctx, this.canvasSize, { x: 3800, y: 400 }, { w: 200, h: 500 }),
            new Platforms(this.ctx, this.canvasSize, { x: 4000, y: 500 }, { w: 100, h: 100 }),
            new Platforms(this.ctx, this.canvasSize, { x: 4800, y: 400 }, { w: 100, h: 500 }),
            new Platforms(this.ctx, this.canvasSize, { x: 4700, y: 500 }, { w: 100, h: 100 }),
            new Platforms(this.ctx, this.canvasSize, { x: 4300, y: 100 }, { w: 200, h: 20 }),
            new Platforms(this.ctx, this.canvasSize, { x: 4600, y: 200 }, { w: 200, h: 20 }),
            new Platforms(this.ctx, this.canvasSize, { x: 4900, y: 300 }, { w: 200, h: 20 }),
            new Platforms(this.ctx, this.canvasSize, { x: 5500, y: 600 }, { w: 800, h: 100 }),


        )
    },

    generateCoins() {
        this.coins.push(
            new Coin(this.ctx, this.canvasSize, { x: 700, y: 530 }),
            new Coin(this.ctx, this.canvasSize, { x: 1565, y: 260 }),
            new Coin(this.ctx, this.canvasSize, { x: 5600, y: 530 }),
            new Coin(this.ctx, this.canvasSize, { x: 5700, y: 530 }),
            new Coin(this.ctx, this.canvasSize, { x: 5800, y: 530 }),
            new Coin(this.ctx, this.canvasSize, { x: 5900, y: 530 }),
            new Coin(this.ctx, this.canvasSize, { x: 6000, y: 530 }),
            new Coin(this.ctx, this.canvasSize, { x: 4390, y: 40 }),

        )
    }


}

