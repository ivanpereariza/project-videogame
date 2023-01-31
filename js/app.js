const controlerApp = {
    name: "Proyect Mario",
    description: "2d scroll lateral game GOTY",
    version: "1.0.0",
    license: undefined,
    author: "Ivan y Juan Antonio",
    ctx: undefined,
    canvasTag: undefined,
    canvasSize: { w: 1500, h: 700 },
    player: undefined,
    boss: undefined,
    background: undefined,
    platforms: [],
    acids: [],
    enemys: [],
    coins: [],
    hearts: [],
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
        this.background.draw()
        this.platforms.forEach(elm => elm.draw())
        this.acids.forEach(elm => elm.draw())
        this.enemys.forEach(elm => elm.draw())
        this.coins.forEach(elm => elm.draw())
        this.hearts.forEach(elm => elm.draw())
        this.player.draw()
        // this.boss.draw()
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
        this.player = new Player(this.ctx, this.canvasSize, this.keys, this.platforms, this.enemys, this.coins, this.hearts, this.acids)
        this.boss = new Boss(this.ctx, this.canvasSize, this.player)
        this.generatePlatforms()
        this.generateEnemys()
        this.generateCoins()
        this.generateHearts()
        this.generateAcids()
        this.background = new Background(this.ctx, this.canvasSize, this.player)
    },



    generateEnemys() {
        this.enemys.push(
            new Enemy(this.ctx, this.canvasSize, this.platforms, this.player, { x: 1000, y: 550 }),
            new Enemy(this.ctx, this.canvasSize, this.platforms, this.player, { x: 2350, y: 550 }),
            new Enemy(this.ctx, this.canvasSize, this.platforms, this.player, { x: 3000, y: 300 }),
            new Enemy(this.ctx, this.canvasSize, this.platforms, this.player, { x: 3600, y: 550 }),
            new Enemy(this.ctx, this.canvasSize, this.platforms, this.player, { x: 4840, y: 350 }),
            new Enemy(this.ctx, this.canvasSize, this.platforms, this.player, { x: 6250, y: 550 }),
            new Enemy(this.ctx, this.canvasSize, this.platforms, this.player, { x: 7550, y: 550 }),
            new Enemy(this.ctx, this.canvasSize, this.platforms, this.player, { x: 9050, y: 550 }),
            new Enemy(this.ctx, this.canvasSize, this.platforms, this.player, { x: 9750, y: 250 }),

        )
    },

    generatePlatforms() {
        this.platforms.push(
            new Platforms(this.ctx, this.canvasSize, { x: 0, y: 600 }, { w: 1500, h: 100 }, 1),
            new Platforms(this.ctx, this.canvasSize, { x: 1700, y: 600 }, { w: 1500, h: 100 }, 1),
            new Platforms(this.ctx, this.canvasSize, { x: 1490, y: 350 }, { w: 200, h: 100 }, 2),
            new Platforms(this.ctx, this.canvasSize, { x: 1800, y: 400 }, { w: 200, h: 100 }, 2),
            new Platforms(this.ctx, this.canvasSize, { x: 2100, y: 500 }, { w: 100, h: 100 }, 2),
            new Platforms(this.ctx, this.canvasSize, { x: 2400, y: 500 }, { w: 100, h: 100 }, 2),
            new Platforms(this.ctx, this.canvasSize, { x: 2600, y: 400 }, { w: 200, h: 100 }, 2),
            new Platforms(this.ctx, this.canvasSize, { x: 2900, y: 350 }, { w: 200, h: 100 }, 2),
            new Platforms(this.ctx, this.canvasSize, { x: 3500, y: 600 }, { w: 1400, h: 100 }, 1),
            new Platforms(this.ctx, this.canvasSize, { x: 3800, y: 400 }, { w: 200, h: 500 }, 1),
            new Platforms(this.ctx, this.canvasSize, { x: 4000, y: 500 }, { w: 100, h: 100 }, 1),
            new Platforms(this.ctx, this.canvasSize, { x: 4800, y: 400 }, { w: 100, h: 500 }, 1),
            new Platforms(this.ctx, this.canvasSize, { x: 4700, y: 500 }, { w: 100, h: 100 }, 1),
            new Platforms(this.ctx, this.canvasSize, { x: 4300, y: 100 }, { w: 200, h: 100 }, 2),
            new Platforms(this.ctx, this.canvasSize, { x: 4600, y: 200 }, { w: 200, h: 100 }, 2),
            new Platforms(this.ctx, this.canvasSize, { x: 4900, y: 300 }, { w: 200, h: 100 }, 2),
            new Platforms(this.ctx, this.canvasSize, { x: 5500, y: 600 }, { w: 800, h: 100 }, 1),
            new Platforms(this.ctx, this.canvasSize, { x: 7000, y: 600 }, { w: 800, h: 100 }, 1),
            new Platforms(this.ctx, this.canvasSize, { x: 6300, y: 500 }, { w: 100, h: 100 }, 2),
            new Platforms(this.ctx, this.canvasSize, { x: 6500, y: 400 }, { w: 100, h: 100 }, 2),
            new Platforms(this.ctx, this.canvasSize, { x: 6700, y: 300 }, { w: 100, h: 100 }, 2),
            new Platforms(this.ctx, this.canvasSize, { x: 6670, y: 600 }, { w: 100, h: 100 }, 2),
            new Platforms(this.ctx, this.canvasSize, { x: 8000, y: 600 }, { w: 100, h: 100 }, 2),
            new Platforms(this.ctx, this.canvasSize, { x: 8300, y: 600 }, { w: 100, h: 100 }, 2),
            new Platforms(this.ctx, this.canvasSize, { x: 9400, y: 500 }, { w: 100, h: 200 }, 1),
            new Platforms(this.ctx, this.canvasSize, { x: 9500, y: 400 }, { w: 100, h: 300 }, 1),
            new Platforms(this.ctx, this.canvasSize, { x: 9600, y: 300 }, { w: 100, h: 400 }, 1),
            new Platforms(this.ctx, this.canvasSize, { x: 9700, y: 300 }, { w: 100, h: 400 }, 1),
            new Platforms(this.ctx, this.canvasSize, { x: 8600, y: 600 }, { w: 1200, h: 100 }, 1),
            new Platforms(this.ctx, this.canvasSize, { x: 9800, y: 300 }, { w: 100, h: 100 }, 1),
            new Platforms(this.ctx, this.canvasSize, { x: 9850, y: 600 }, { w: 50, h: 100 }, 2),
            new Platforms(this.ctx, this.canvasSize, { x: 10050, y: 600 }, { w: 500, h: 100 }, 1),





        )
    },

    generateAcids() {
        this.acids.push(
            new Acid(this.ctx, this.canvasSize, this.player, { x: 1500, y: 600 }, { w: 200, h: 100 }),
            new Acid(this.ctx, this.canvasSize, this.player, { x: 3200, y: 600 }, { w: 150, h: 100 }),
            new Acid(this.ctx, this.canvasSize, this.player, { x: 3350, y: 600 }, { w: 150, h: 100 }),
            new Acid(this.ctx, this.canvasSize, this.player, { x: 4900, y: 600 }, { w: 150, h: 100 }),
            new Acid(this.ctx, this.canvasSize, this.player, { x: 4900, y: 600 }, { w: 200, h: 100 }),
            new Acid(this.ctx, this.canvasSize, this.player, { x: 5100, y: 600 }, { w: 200, h: 100 }),
            new Acid(this.ctx, this.canvasSize, this.player, { x: 5300, y: 600 }, { w: 200, h: 100 }),
            new Acid(this.ctx, this.canvasSize, this.player, { x: 6300, y: 600 }, { w: 150, h: 100 }),
            new Acid(this.ctx, this.canvasSize, this.player, { x: 6450, y: 600 }, { w: 150, h: 100 }),
            new Acid(this.ctx, this.canvasSize, this.player, { x: 6600, y: 600 }, { w: 150, h: 100 }),
            new Acid(this.ctx, this.canvasSize, this.player, { x: 6750, y: 600 }, { w: 150, h: 100 }),
            new Acid(this.ctx, this.canvasSize, this.player, { x: 6900, y: 600 }, { w: 100, h: 100 }),
            new Acid(this.ctx, this.canvasSize, this.player, { x: 7800, y: 600 }, { w: 150, h: 100 }),
            new Acid(this.ctx, this.canvasSize, this.player, { x: 7950, y: 600 }, { w: 150, h: 100 }),
            new Acid(this.ctx, this.canvasSize, this.player, { x: 8100, y: 600 }, { w: 150, h: 100 }),
            new Acid(this.ctx, this.canvasSize, this.player, { x: 8250, y: 600 }, { w: 150, h: 100 }),
            new Acid(this.ctx, this.canvasSize, this.player, { x: 8400, y: 600 }, { w: 150, h: 100 }),
            new Acid(this.ctx, this.canvasSize, this.player, { x: 8550, y: 600 }, { w: 50, h: 100 }),
            new Acid(this.ctx, this.canvasSize, this.player, { x: 9800, y: 600 }, { w: 250, h: 100 }),


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
            new Coin(this.ctx, this.canvasSize, { x: 8035, y: 350 }),
            new Coin(this.ctx, this.canvasSize, { x: 8330, y: 350 }),
            new Coin(this.ctx, this.canvasSize, { x: 9435, y: 425 }),
            new Coin(this.ctx, this.canvasSize, { x: 9860, y: 530 }),



        )
    },

    generateHearts() {
        this.hearts.push(
            new Heart(this.ctx, this.canvasSize, { x: 2280, y: 530 }),
            new Heart(this.ctx, this.canvasSize, { x: 5300, y: 200 }),
            new Heart(this.ctx, this.canvasSize, { x: 6700, y: 525 }),


        )
    }


}

