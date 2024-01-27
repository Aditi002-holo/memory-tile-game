import * as readlineSync from 'readline-sync'

type Tile = {
    emoji: string,
    state: string,
    index: number
}

class Game {
    readonly tiles: Tile[] = []

    constructor(emojis: string[]) {
        this.tiles = this.createTiles(emojis)
    }

    // Method - createTiles
    createTiles(emojis: string[]): Tile[] {
        const duplicatedEmojis = [...emojis, ...emojis]
        const shuffledEmojis = duplicatedEmojis

        // generate random position & shuffle the emojis
        for(let i = 0; i < shuffledEmojis.length; i++) {
            const randomPos = Math.floor(Math.random() * (i+1))
            // Shuffle
            const currentEmoji = shuffledEmojis[i]
            shuffledEmojis[i] = shuffledEmojis[randomPos]
            shuffledEmojis[randomPos] = currentEmoji
        }
         return shuffledEmojis.map((emoji, index) => {
            return {
                emoji,
                state: 'up',
                index
            }
        })
    }

    //  Print the tiles
    printTiles(): void {
        console.clear()
        const gridSize = 4

        for(let i = 0; i < this.tiles.length; i = i+gridSize) {
            const row = this.tiles.slice(i,i+gridSize).map(eachTile => {
                if(eachTile.state == 'down')
                    return eachTile.index.toString().padStart(2, ' ')
                else
                    return eachTile.emoji
            }).join(' | ')

            console.log(row)
        }
    }

    run(): void {
        this.printTiles()
        readlineSync.question('Try to memorize the Grid and Press Enter to Start the Game.')

        this.tiles.forEach(tile => tile.state == 'down')
        this.printTiles()

        while(this.tiles.findIndex(t => t.state == 'down') > -1) {
            let inputNumber = readlineSync.questionInt('Enter a tile number: ')
            if(inputNumber >= 0 && inputNumber < 16) {
                this.flip(inputNumber)
                this.printTiles()
            } else {
                console.log('Invalid Input')
            }
        }

        console.log('Game completed. Congratulations!')

    }

    flip(tileIndex: number): void {
        if(this.tiles.find(ft => ft.index == tileIndex && ft.state != 'down'))
            return

        const flippedTiles = this.tiles.filter(t => t.state == 'up')
        const selectedTile = this.tiles[tileIndex]
        selectedTile.state = 'up'

        if(flippedTiles.length == 2) {
            flippedTiles[0].state = 'down'
            flippedTiles[1].state = 'down'
        } else if(flippedTiles.length == 1 && flippedTiles[0].emoji == selectedTile.emoji) {
            flippedTiles[0].state = 'cleared'
            selectedTile.state = 'cleared'
        }
    }
}

const inputTiles = ['🐱', '🐶', '🐹', '🐰', '🦊', '🐼', '🐣', '🦕']
const game = new Game(inputTiles)
game.run()