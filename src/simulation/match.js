/* eslint-disable */
export function Match(p1, p2, rules, tournamentName, round, tournamentSeries, tournamentSurface) {
    this.p1 = { 
        name: p1.name,
        matchHandlerVariables: {
            currentGemPoints: [],
            currentPoints: 0,
            pointsToWinGem: 4,
            currentTiebreakPoints: 0,
            tiebreakPointsToWinGem: 7,
            gemsInCurrentSetWon: 0,
            setsWon: 0
        },
        matchStats: {
            currentPoints: 0,
            currentTiebreakPoints: 0,
            gemsInCurrentSetWon: 0,
            gemsInIndividualSetsWon: [],
            setsWon: 0
        }
    },
    this.p2 = {
        name: p2.name,
        matchHandlerVariables: {
            currentGemPoints: [],
            currentPoints: 0,
            pointsToWinGem: 4,
            currentTiebreakPoints: 0,
            tiebreakPointsToWinGem: 7,
            gemsInCurrentSetWon: 0,
            setsWon: 0
        },
        matchStats: {
            currentPoints: 0,
            currentTiebreakPoints: 0,
            gemsInCurrentSetWon: 0,
            gemsInIndividualSetsWon: [],
            setsWon: 0
        }
    },
    // Object => { setsWin: num, gemsWin: num, tiebreak: null }
    this.rules = rules;
    // String => Any
    this.tournamentName = tournamentName;
    // String => ["round1", "round2", "quarterFinals", "semiFinals", "finals"]
    this.round = round;
    // String => ["250", "500", "1000", "Super"]
    this.tournamentSeries = tournamentSeries;
    // String => ["Hard", "Clay", "Grass"]
    this.tournamentSurface = tournamentSurface;
    this.winner = null;
    this.loser = null;
    this.timer = undefined;
}

Match.prototype.handlePoint = function() {
    const rand = Math.random();
    if(rand > 0.5) {
        this.addPoint(this.p1, this.p2);
    } else {
        this.addPoint(this.p2, this.p1);
    }
}

Match.prototype.addPoint = function(player1, player2) {
    // Player gems and points handler
    if(!this.rules.tiebreak) {
        player1.matchHandlerVariables.currentPoints++;
        if(player1.matchHandlerVariables.currentPoints === 1) {
            player1.matchHandlerVariables.currentGemPoints.push(15);
            // console.log(`${player1.name} won the point! ${player1.name} points: ${player1.points}, ${player2.name} points: ${player2.points}`);
        }
        if(player1.matchHandlerVariables.currentPoints === 2) {
            player1.matchHandlerVariables.currentGemPoints.push(30);
            // console.log(`${player1.name} won the point! ${player1.name} points: ${player1.points}, ${player2.name} points: ${player2.points}`);
        }
        if(player1.matchHandlerVariables.currentPoints === 3 && player2.matchHandlerVariables.currentPoints < 3) {
            player1.matchHandlerVariables.currentGemPoints.push(40);
            // console.log(`${player1.name} won the point! ${player1.name} points: ${player1.points}, ${player2.name} points: ${player2.points}`);
        }
        if(player1.matchHandlerVariables.currentPoints === 3 && player2.matchHandlerVariables.currentPoints === 3) {
            player1.matchHandlerVariables.currentGemPoints.push(40);
            this.setPointsToGem([player1, player2], player1.matchHandlerVariables.currentPoints + 2);
            // console.log(`DEUCE! ${player1.name} won the point! ${player1.name} points: ${player1.points}, ${player2.name} points: ${player2.points}`);
        }
        if(player1.matchHandlerVariables.currentPoints > 3 && player1.matchHandlerVariables.currentPoints - player2.matchHandlerVariables.currentPoints === 0) {
            player1.matchHandlerVariables.currentGemPoints.push(40);
            this.setPointsToGem([player1, player2], player1.matchHandlerVariables.currentPoints + 2);
            // console.log(`DEUCE! ${player1.name} won the point! ${player1.name} points: ${player1.points}, ${player2.name} points: ${player2.points}`);
        }
        if(player1.matchHandlerVariables.currentPoints > 3 && player1.matchHandlerVariables.currentPoints - player2.matchHandlerVariables.currentPoints === 1) {
            player1.matchHandlerVariables.currentGemPoints.push("A");
            // console.log(`ADVANTAGE ${player1.name}! ${player1.name} won the point! ${player1.name} points: ${player1.points}, ${player2.name} points: ${player2.points}`);
        } 
        if(player1.matchHandlerVariables.currentPoints === player1.matchHandlerVariables.pointsToWinGem) {
            player1.matchHandlerVariables.gemsInCurrentSetWon++;
            this.checkSet(player1, player2);
            this.checkGame(player1, player2);
            // console.log(`---${player1.name} won the game! Points: ${player1.points}. ${player2.name} points: ${player2.points} Current set Result: ${player1.name} ${player1.gems} ${player2.name} ${player2.gems}---`);
            this.resetGem([player1, player2]);
        }
    } 
    // Tiebreak points handler
    else {
        player1.matchHandlerVariables.currentTiebreakPoints++;
        if(player1.matchHandlerVariables.currentTiebreakPoints === player1.matchHandlerVariables.tiebreakPointsToWinGem) {
            player1.matchHandlerVariables.gemsInCurrentSetWon++;
            this.checkSet(player1, player2);
            this.checkGame(player1, player2);
            // console.log(`---${player1.name} won the tiebreak! Tiebreak result: ${player1.name} ${player2.name} ${player1.tiebreakPoints} ${player2.tiebreakPoints}---`);
            this.resetTiebreak([player1, player2]);
        }
        if(player1.matchHandlerVariables.currentTiebreakPoints === 6 && player2.matchHandlerVariables.currentTiebreakPoints === 6 || (player1.matchHandlerVariables.tiebreakPointsToWinGem > 7 && player1.matchHandlerVariables.currentTiebreakPoints - player2.matchHandlerVariables.currentTiebreakPoints === 0)) {
            this.setTiebreakPointsToWinGem([player1, player2], player1.matchHandlerVariables.tiebreakPointsToWinGem + 1);
        }
        // console.log(`${player1.name} won the tiebreak point! Current tiebreak result: ${player1.name} ${player2.name} ${player1.tiebreakPoints} ${player2.tiebreakPoints}`);
    }

    // Match stats update on every point
    this.updateMatchStats([player1, player2]);
    // console.log("***************************************************************************************************************************************************************")
    // console.log(`${this.matchStats.overview[0].name}     ---- Points: ${this.matchStats.overview[0].point} Current Set: ${this.matchStats.overview[0].gems} Sets: ${this.matchStats.overview[0].sets} ${this.matchStats.overview[0].setGemsWon ? `Last Sets: ${[...this.matchStats.overview[0].setGemsWon]}` : ""}`);
    // console.log(`${this.matchStats.overview[1].name}     ---- Points: ${this.matchStats.overview[1].point} Current Set: ${this.matchStats.overview[1].gems} Sets: ${this.matchStats.overview[1].sets}  ${this.matchStats.overview[1].setGemsWon ? `Last Sets: ${[...this.matchStats.overview[1].setGemsWon]}` : ""}`);
}

// Match set handler
Match.prototype.checkSet = function(player1, player2) {
    if(player1.matchHandlerVariables.gemsInCurrentSetWon === 5 && player2.matchHandlerVariables.gemsInCurrentSetWon === 5) {
        this.rules.gemsWin = 7;
    }
    if(player1.matchHandlerVariables.gemsInCurrentSetWon === 6 && player2.matchHandlerVariables.gemsInCurrentSetWon === 6) {
        this.rules.tiebreak = true;
    }
    if(player1.matchHandlerVariables.gemsInCurrentSetWon === this.rules.gemsWin) {
        // console.log(`------------${player1.name} won the set! Set Result: ${player1.name} ${player1.gems} ${player2.name} ${player2.gems}------------- `);
        this.updateMatchStats([player1, player2], true);
        player1.matchHandlerVariables.gemsInCurrentSetWon = 0;
        player2.matchHandlerVariables.gemsInCurrentSetWon = 0;
        player1.matchHandlerVariables.setsWon++;
        this.rules.gemsWin = 6;
    }
}

// Match winner handler
Match.prototype.checkGame = function(player1, player2) {
    if(player1.matchHandlerVariables.setsWon === this.rules.setsWin) {
        this.winner = player1.name;
        this.loser = player2.name;
        // console.log(`${player1.name} won the match!`);
        // console.log(this);
        clearInterval(this.timer);
    }
}

Match.prototype.setPointsToGem = function(players, newPointsToWinGem) {
    players.forEach(player => {
        player.matchHandlerVariables.pointsToWinGem = newPointsToWinGem;
    })
}

Match.prototype.setTiebreakPointsToWinGem = function(players, newTiebreakPointsToWinGem) {
    players.forEach(player => {
        player.matchHandlerVariables.tiebreakPointsToWinGem = newTiebreakPointsToWinGem;
    })
}

Match.prototype.resetGem = function(players) {
    players.forEach(player => {
        player.matchHandlerVariables.currentGemPoints = [];
        player.matchHandlerVariables.currentPoints = 0;
        player.matchHandlerVariables.pointsToWinGem = 4;
    })
}

Match.prototype.resetTiebreak = function(players) {
    players.forEach(player => {
        player.matchHandlerVariables.currentTiebreakPoints = 0;
        player.matchHandlerVariables.tiebreakPointsToWinGem = 7;
        this.rules.tiebreak = null;
    })
}

// Update match stats for both players
Match.prototype.updateMatchStats = function(players, updateGemsInIndividualSetsWon) {
        players.forEach(player => {
            player.matchStats.currentPoints = player.matchHandlerVariables.currentGemPoints[players[0].matchHandlerVariables.currentPoints - 1] || 0;
            player.matchStats.currentTiebreakPoints = player.matchHandlerVariables.currentTiebreakPoints;
            player.matchStats.gemsInCurrentSetWon = player.matchHandlerVariables.gemsInCurrentSetWon;
            player.matchStats.setsWon = player.matchHandlerVariables.setsWon;
            if(updateGemsInIndividualSetsWon) {
                player.matchStats.gemsInIndividualSetsWon.push(player.matchHandlerVariables.gemsInCurrentSetWon);
            }
        })
}

// Update player statistic after match is done
Match.prototype.updatePlayersStats = function(players) {
    const playerWinner = players.find(player => player.name === this.winner);
    const playerLoser = players.find(player => player.name === this.loser);

    // Update winner
    playerWinner.updateMatches(this, "Win");
    playerWinner.updateWins();

    // Update loser
    playerLoser.updateMatches(this, "Lost");
    playerLoser.updateLoses();
}