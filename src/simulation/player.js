export function Player(name) {
    this.name = name;
    this.rank = undefined;
    this.matches = [];
    this.points = 0;
    this.wins = 0;
    this.loses = 0;
    this.winrate = 0;
    this.tournamentsWon = 0;
    this.filterTournamentsWon = this.tournamentsWon > 0 ? "More than" : "0";
    this.filterWinrate = this.updateFilterWinrate();
    this.oldRankPoints = {
        rank: undefined,
        points: undefined,
        rankDiff: undefined,
        pointsDiff: undefined
    }
}

// Sort player ranks
Player.updatePlayerRanks = function() {
    // sort players based on points
    Player.players.sort((a, b) => {
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
    Player.players.forEach((player, i) => {
        player.rank = i + 1;
    })
}

// All players
Player.players = [];

// Save match played
Player.prototype.updateMatches = function(match, matchEnd) {
    this.matches.unshift({...match, matchEnd});
}

// Update Wins
Player.prototype.updateWins = function() {
    this.wins++;
}

// Update Loses
Player.prototype.updateLoses = function() {
    this.loses++;
}

// Update winrate
Player.prototype.updateWinrate = function() {
    // round winrate -> Example 55.55, 25.23 etc...
    let winrate = this.wins / this.matches.length * 100;
    winrate = winrate.toString();
    if(winrate.length > 5) {
        winrate = winrate.substring(0, 5);
    }

    winrate = parseFloat(winrate);

    // update winrate
    this.winrate = winrate;
}

// Update tournaments won
Player.prototype.updateTournamentsWon = function() {
    this.tournamentsWon++;
}

// Update filter stat
Player.prototype.updateFilterTournamentsWon = function() {
    this.filterTournamentsWon = this.tournamentsWon > 0 ? "> 0" : "0";
}

Player.prototype.updateFilterWinrate = function() {
    let str = "";
    if(this.winrate < 50) {
        str = "< 50%";
    } 
    if(this.winrate >= 50) {
        str = "> 50%";
    } 

    this.filterWinrate = str;
}

// Update old ranks and points
Player.prototype.updateOldRankPoints = function(fn) {
    fn(this.oldRankPoints);
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

Player.players = [
        playerA, playerB, playerC, playerD, playerE, playerF, playerG, playerH, playerI, playerJ, playerK, playerL, playerM, playerN,
        playerO, playerP, playerQ, playerR, playerS, playerT, playerU, playerV, playerW, playerX, playerY, playerZ, playerAB, playerAC,
        playerAD, playerAE, playerAF, playerAG
    ]

// add starting ranks of 0 to all players 
Player.updatePlayerRanks();

// add starting old ranks and points
Player.players.forEach(player => {
    player.updateOldRankPoints(oldRankPoints => {
        oldRankPoints.rank = player.rank;
        oldRankPoints.points = player.points;
        oldRankPoints.rankDiff = oldRankPoints.rank  - player.rank;
        oldRankPoints.pointsDiff = oldRankPoints.points + player.points;
    })
})