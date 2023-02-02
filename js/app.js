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
    interval: undefined,
    gameOverImg: undefined,
    framesCounter: 0,
    platforms: [],
    wallsLeft: [],
    wallsRight: [],
    acids: [],
    enemys: [],
    coins: [],
    hearts: [],
    livesCount: undefined,
    FPS: 60,
    keys: {
        MOVELEFT: "ArrowLeft",
        MOVERIGHT: "ArrowRight",
        JUMP: "Space",
        SHOOT: "KeyA"
    },
    imgCoin: undefined,
    imgHeart: undefined,


    init() {
        this.setContext()
        this.setDimensions()
        this.ambientSound()
        this.createHUD()
        this.drawGameOver()
        this.drawWin()
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

    createHUD() {
        this.imgCoin = new Image()
        this.imgCoin.src = './img/1coin.png'
        this.imgHeart = new Image()
        this.imgHeart.src = './img/1heart.png'
    },

    drawHUD() {
        this.ctx.drawImage(this.imgCoin, 1340, 32, 50, 50)
        this.ctx.drawImage(this.imgHeart, 50, 32, 50, 50)
        this.ctx.font = '60px Sans Serif bold'
        this.ctx.fillStyle = 'black'
        this.ctx.fillText(`${this.player.coinsCount}`, 1405, 80)
        this.ctx.fillText(`${this.player.livesCount}`, 120, 80)
    },

    ambientSound() {
        this.sound = new Audio()
        this.sound.src = './sounds/background_sound.mp3'
        this.sound.volume = 0.15
        document.addEventListener('keydown', () => this.sound.play())
    },

    drawAll() {
        this.background.draw()
        this.platforms.forEach(elm => elm.draw())
        this.acids.forEach(elm => elm.draw())
        this.enemys.forEach(elm => elm.draw(this.framesCounter))
        this.coins.forEach(elm => elm.draw(this.framesCounter))
        this.hearts.forEach(elm => elm.draw(this.framesCounter))
        this.wallsLeft.forEach(elm => elm.draw())
        this.wallsRight.forEach(elm => elm.draw())
        this.player.init(this.framesCounter)
        this.boss.draw(this.framesCounter)
        this.drawHUD()
    },
    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    start() {
        this.reset()

        this.interval = setInterval(() => {
            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++
            this.clearAll()
            this.drawAll()
            this.player.move()
            if (this.player.livesCount === 0) {
                this.sound.pause()
                this.gameOver()
            } else if ((this.player.playerPos.y + this.player.playerSize.h) === this.canvasSize.h) {
                this.sound.pause()
                this.gameOver()
            }
            if (this.boss.bossLives === 0) {
                this.YouWin()
            }
        }, 1000 / this.FPS)
    },

    drawGameOver() {
        this.gameOverImg = new Image()
        this.gameOverImg.src = "./img/gameover.jpg"
    },


    gameOver() {
        this.ctx.drawImage(this.gameOverImg, 0, 0, this.canvasSize.w, this.canvasSize.h)
        clearInterval(this.interval)
        setTimeout(() => {
            location.reload()
        }, 5000)
    },

    drawWin() {
        this.imgYouWIng = new Image()
        this.imgYouWIng.src = './img/win.jpg'
    },

    YouWin() {
        this.ctx.drawImage(this.imgYouWIng, 0, 0, this.canvasSize.w, this.canvasSize.h)
        clearInterval(this.interval)
        setTimeout(() => {
            location.reload()
        }, 5000)
    },


    reset() {
        this.boss = new Boss(this.ctx, this.canvasSize, this.player)
        this.player = new Player(this.ctx, this.canvasSize, this.keys, this.platforms, this.enemys, this.coins, this.hearts, this.acids, this.enemyBullets, this.boss, this.wallsLeft, this.wallsRight)
        this.generatePlatforms()
        this.generateEnemys()
        this.generateCoins()
        this.generateHearts()
        this.generateAcids()
        this.generateWalls()
        this.background = new Background(this.ctx, this.canvasSize, this.player)
    },



    generateEnemys() {
        this.enemys.push(
            new Enemy(this.ctx, this.canvasSize, this.platforms, this.player, { x: 1000, y: 500 }),
            new Enemy(this.ctx, this.canvasSize, this.platforms, this.player, { x: 2350, y: 500 }),
            new Enemy(this.ctx, this.canvasSize, this.platforms, this.player, { x: 3000, y: 250 }),
            new Enemy(this.ctx, this.canvasSize, this.platforms, this.player, { x: 3600, y: 500 }),
            new Enemy(this.ctx, this.canvasSize, this.platforms, this.player, { x: 4750, y: 300 }),
            new Enemy(this.ctx, this.canvasSize, this.platforms, this.player, { x: 6250, y: 500 }),
            new Enemy(this.ctx, this.canvasSize, this.platforms, this.player, { x: 7550, y: 500 }),
            new Enemy(this.ctx, this.canvasSize, this.platforms, this.player, { x: 9050, y: 500 }),
            new Enemy(this.ctx, this.canvasSize, this.platforms, this.player, { x: 9750, y: 200 }),

        )
    },

    generatePlatforms() {
        this.platforms.push(
            new Platforms(this.ctx, this.canvasSize, { x: -500, y: 600 }, { w: 2000, h: 100 }, 1),
            new Platforms(this.ctx, this.canvasSize, { x: 1700, y: 600 }, { w: 1500, h: 100 }, 1),
            new Platforms(this.ctx, this.canvasSize, { x: 1490, y: 350 }, { w: 200, h: 100 }, 2),
            new Platforms(this.ctx, this.canvasSize, { x: 1800, y: 400 }, { w: 200, h: 100 }, 2),
            new Platforms(this.ctx, this.canvasSize, { x: 2100, y: 500 }, { w: 100, h: 100 }, 2),
            new Platforms(this.ctx, this.canvasSize, { x: 2400, y: 500 }, { w: 100, h: 100 }, 2),
            new Platforms(this.ctx, this.canvasSize, { x: 2600, y: 400 }, { w: 200, h: 100 }, 2),
            new Platforms(this.ctx, this.canvasSize, { x: 2900, y: 350 }, { w: 200, h: 100 }, 2),
            new Platforms(this.ctx, this.canvasSize, { x: 3800, y: 400 }, { w: 200, h: 500 }, 1),
            new Platforms(this.ctx, this.canvasSize, { x: 4800, y: 400 }, { w: 100, h: 500 }, 1),
            new Platforms(this.ctx, this.canvasSize, { x: 3500, y: 600 }, { w: 1400, h: 100 }, 1),
            new Platforms(this.ctx, this.canvasSize, { x: 4000, y: 500 }, { w: 100, h: 100 }, 1),
            new Platforms(this.ctx, this.canvasSize, { x: 4700, y: 500 }, { w: 100, h: 100 }, 1),
            new Platforms(this.ctx, this.canvasSize, { x: 4300, y: 100 }, { w: 200, h: 100 }, 2),
            new Platforms(this.ctx, this.canvasSize, { x: 4600, y: 200 }, { w: 200, h: 100 }, 2),
            new Platforms(this.ctx, this.canvasSize, { x: 4900, y: 300 }, { w: 200, h: 100 }, 2),
            new Platforms(this.ctx, this.canvasSize, { x: 5500, y: 600 }, { w: 800, h: 100 }, 1),
            new Platforms(this.ctx, this.canvasSize, { x: 7000, y: 600 }, { w: 800, h: 100 }, 1),
            new Platforms(this.ctx, this.canvasSize, { x: 6300, y: 500 }, { w: 100, h: 100 }, 2),
            new Platforms(this.ctx, this.canvasSize, { x: 6500, y: 400 }, { w: 100, h: 100 }, 2),
            new Platforms(this.ctx, this.canvasSize, { x: 6700, y: 300 }, { w: 100, h: 100 }, 2),
            new Platforms(this.ctx, this.canvasSize, { x: 6670, y: 550 }, { w: 100, h: 100 }, 2),
            new Platforms(this.ctx, this.canvasSize, { x: 8000, y: 550 }, { w: 100, h: 100 }, 2),
            new Platforms(this.ctx, this.canvasSize, { x: 8300, y: 550 }, { w: 100, h: 100 }, 2),
            new Platforms(this.ctx, this.canvasSize, { x: 9400, y: 500 }, { w: 100, h: 200 }, 1),
            new Platforms(this.ctx, this.canvasSize, { x: 9500, y: 400 }, { w: 100, h: 300 }, 1),
            new Platforms(this.ctx, this.canvasSize, { x: 9600, y: 300 }, { w: 100, h: 400 }, 1),
            new Platforms(this.ctx, this.canvasSize, { x: 9700, y: 300 }, { w: 100, h: 400 }, 1),
            new Platforms(this.ctx, this.canvasSize, { x: 8600, y: 600 }, { w: 1200, h: 100 }, 1),
            new Platforms(this.ctx, this.canvasSize, { x: 9800, y: 300 }, { w: 100, h: 100 }, 1),
            new Platforms(this.ctx, this.canvasSize, { x: 9850, y: 550 }, { w: 50, h: 100 }, 2),
            new Platforms(this.ctx, this.canvasSize, { x: 10050, y: 600 }, { w: 500, h: 100 }, 1),
            new Platforms(this.ctx, this.canvasSize, { x: 11550, y: 600 }, { w: 500, h: 100 }, 1),
            new Platforms(this.ctx, this.canvasSize, { x: 10750, y: 550 }, { w: 150, h: 100 }, 2),
            new Platforms(this.ctx, this.canvasSize, { x: 11050, y: 450 }, { w: 150, h: 100 }, 2),
            new Platforms(this.ctx, this.canvasSize, { x: 11250, y: 400 }, { w: 150, h: 100 }, 2),
            new Platforms(this.ctx, this.canvasSize, { x: 11150, y: 550 }, { w: 150, h: 100 }, 2),
            new Platforms(this.ctx, this.canvasSize, { x: 10750, y: 400 }, { w: 150, h: 100 }, 2),

        )
    },

    generateWalls() {
        this.wallsLeft.push(
            // new WallLeft(this.ctx, this.canvasSize, { x: 100, y: 0 }, { w: 100, h: 700 }),
            // new WallLeft(this.ctx, this.canvasSize, { x: 300, y: 500 }, { w: 100, h: 700 }),


        )
        this.wallsRight.push(
            // new WallRight(this.ctx, this.canvasSize, { x: 200, y: 0 }, { w: 100, h: 700 })
        )
    },

    generateAcids() {
        this.acids.push(
            new Acid(this.ctx, this.canvasSize, this.player, { x: -1700, y: 600 }, { w: 200, h: 100 }),
            new Acid(this.ctx, this.canvasSize, this.player, { x: -1500, y: 600 }, { w: 200, h: 100 }),
            new Acid(this.ctx, this.canvasSize, this.player, { x: -1300, y: 600 }, { w: 200, h: 100 }),
            new Acid(this.ctx, this.canvasSize, this.player, { x: -1100, y: 600 }, { w: 200, h: 100 }),
            new Acid(this.ctx, this.canvasSize, this.player, { x: -900, y: 600 }, { w: 200, h: 100 }),
            new Acid(this.ctx, this.canvasSize, this.player, { x: -700, y: 600 }, { w: 200, h: 100 }),
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
            new Acid(this.ctx, this.canvasSize, this.player, { x: 10550, y: 600 }, { w: 200, h: 100 }),
            new Acid(this.ctx, this.canvasSize, this.player, { x: 10750, y: 600 }, { w: 200, h: 100 }),
            new Acid(this.ctx, this.canvasSize, this.player, { x: 10950, y: 600 }, { w: 200, h: 100 }),
            new Acid(this.ctx, this.canvasSize, this.player, { x: 11150, y: 600 }, { w: 200, h: 100 }),
            new Acid(this.ctx, this.canvasSize, this.player, { x: 11350, y: 600 }, { w: 200, h: 100 }),



        )
    },

    generateCoins() {
        this.coins.push(
            new Coin(this.ctx, this.canvasSize, { x: -500, y: 530 }),
            new Coin(this.ctx, this.canvasSize, { x: -400, y: 530 }),
            new Coin(this.ctx, this.canvasSize, { x: -300, y: 530 }),
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
    },

}

