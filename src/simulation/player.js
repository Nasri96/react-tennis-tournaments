export function Player(name) {
    this.name = name;
    this.rank = undefined;
    this.matches = [];
    this.points = 0;
    this.wins = 0;
    this.loses = 0;
}

Player.updatePlayerRanks = function() {
    // sort players based on points
    players.sort((a, b) => {
        if(a.points > b.points) {
            return -1;
        }
        if(a.points < b.points) {
            return 1;
        } 
        else {
            return 0;
        }
    })
    // update ranks based on points
    players.forEach((player, i) => {
        player.rank = i + 1;
    })
}

// Save match played
Player.prototype.updateMatches = function(match) {
    this.matches.push(match);
}

// Update Wins
Player.prototype.updateWins = function() {
    this.wins++;
}

// Update Loses
Player.prototype.updateLoses = function() {
    this.loses++;
}

const playerA = new Player("Novak Djokovic");
const playerB = new Player("Rafael Nadal");
const playerC = new Player("Player C");
const playerD = new Player("Player D");
const playerE = new Player("Player E");
const playerF = new Player("Player F");
const playerG = new Player("Player G");
const playerH = new Player("Player H");
const playerI = new Player("Player I");
const playerJ = new Player("Player J");
const playerK = new Player("Player K");
const playerL = new Player("Player L");
const playerM = new Player("Player M");
const playerN = new Player("Player N");
const playerO = new Player("Player O");
const playerP = new Player("Player P");
const playerQ = new Player("Player Q");
const playerR = new Player("Player R");
const playerS = new Player("Player S");
const playerT = new Player("Player T");
const playerU = new Player("Player U");
const playerV = new Player("Player V");
const playerW = new Player("Player W");
const playerX = new Player("Player X");
const playerY = new Player("Player Y");
const playerZ = new Player("Player Z");
const playerAB = new Player("PlayerAB");
const playerAC = new Player("Player AC");
const playerAD = new Player("PlayerAD");
const playerAE = new Player("Player AE");
const playerAF = new Player("PlayerAF");
const playerAG = new Player("Player AG");

export const players = [
        playerA, playerB, playerC, playerD, playerE, playerF, playerG, playerH, playerI, playerJ, playerK, playerL, playerM, playerN,
        playerO, playerP, playerQ, playerR, playerS, playerT, playerU, playerV, playerW, playerX, playerY, playerZ, playerAB, playerAC,
        playerAD, playerAE, playerAF, playerAG
    ]

// add starting ranks of 0 to all players 
Player.updatePlayerRanks();