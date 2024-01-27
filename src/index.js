"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const readlineSync = __importStar(require("readline-sync"));
let tiles = [];
function createTiles(emojis) {
    const duplicatedEmojis = [...emojis, ...emojis];
    const shuffledEmojis = duplicatedEmojis;
    for (let i = 0; i < shuffledEmojis.length; i++) {
        const randomPos = Math.floor(Math.random() * (i + 1));
        const currentEmoji = shuffledEmojis[i];
        shuffledEmojis[i] = shuffledEmojis[randomPos];
        shuffledEmojis[randomPos] = currentEmoji;
    }
    return shuffledEmojis.map((e, index) => {
        return {
            emoji: e,
            state: 'up',
            index
        };
    });
}
function printTiles() {
    console.clear();
    const gridSize = 4;
    for (let i = 0; i < tiles.length; i = i + gridSize) {
        const row = tiles.slice(i, i + gridSize).map(tile => {
            if (tile.state === 'down')
                return tile.index.toString().padStart(2, ' ');
            else
                return tile.emoji;
        }).join(' | ');
        console.log(row);
    }
}
function runGame() {
    printTiles();
    readlineSync.question('Press Enter to Start');
    tiles.forEach(t => t.state = 'down');
    printTiles();
    while (tiles.findIndex(t => t.state == 'down') > -1) {
        let inputNumber = readlineSync.questionInt('Enter a tile number: ');
        if (inputNumber >= 0 && inputNumber < 16) {
            flip(inputNumber);
            printTiles();
        }
        else {
            console.log('Invalid Input');
        }
    }
    console.log('Game completed. Congratulations!');
}
function flip(tileIndex) {
    if (tiles.find(ft => ft.index == tileIndex && ft.state != 'down'))
        return;
    const flippedTiles = tiles.filter(t => t.state == 'up');
    const selectedTile = tiles[tileIndex];
    selectedTile.state = 'up';
    if (flippedTiles.length === 2) {
        flippedTiles[0].state = 'down';
        flippedTiles[1].state = 'down';
    }
    else if (flippedTiles.length == 1 && flippedTiles[0].emoji == selectedTile.emoji) {
        flippedTiles[0].state = 'cleared';
        selectedTile.state = 'cleared';
    }
}
tiles = createTiles(['🐱', '🐶', '🐹', '🐰', '🦊', '🐼', '🐣', '🦕']);
runGame();
