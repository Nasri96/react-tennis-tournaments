/* eslint-disable */
export function Match(p1, p2, rules) {
    this.p1 = { 
        name: p1.name,
        points: [],
        currentPoints: 0,
        pointsToGem: 4,
        tiebreakPoints: 0,
        tiebreakToGem: 7,
        gems: 0,
        sets: 0
    },
    this.p2 = {
        name: p2.name,
        points: [],
        currentPoints: 0,
        pointsToGem: 4,
        tiebreakPoints: 0,
        tiebreakToGem: 7,
        gems: 0,
        sets: 0
    },
    // Object => { setsWin: num, gemsWin: num, tiebreak: null }
    this.rules = rules;
    this.winner = null;
    this.loser = null;
    this.timer = undefined;
    this.matchStats = {
        overview: [
            {
                name: this.p1.name,
                point: 0,
                gems: 0,
                sets: 0,
                setGemsWon: []
            },
            {
                name: this.p2.name,
                point: 0,
                gems: 0,
                sets: 0,
                setGemsWon: []
            }
        ]
    }
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
        player1.currentPoints++;
        if(player1.currentPoints === 1) {
            player1.points.push(15);
            // console.log(`${player1.name} won the point! ${player1.name} points: ${player1.points}, ${player2.name} points: ${player2.points}`);
        }
        if(player1.currentPoints === 2) {
            player1.points.push(30);
            // console.log(`${player1.name} won the point! ${player1.name} points: ${player1.points}, ${player2.name} points: ${player2.points}`);
        }
        if(player1.currentPoints === 3 && player2.currentPoints < 3) {
            player1.points.push(40);
            // console.log(`${player1.name} won the point! ${player1.name} points: ${player1.points}, ${player2.name} points: ${player2.points}`);
        }
        if(player1.currentPoints === 3 && player2.currentPoints === 3) {
            player1.points.push(40);
            this.setPointsToGem([player1, player2], player1.currentPoints + 2);
            // console.log(`DEUCE! ${player1.name} won the point! ${player1.name} points: ${player1.points}, ${player2.name} points: ${player2.points}`);
        }
        if(player1.currentPoints > 3 && player1.currentPoints - player2.currentPoints === 0) {
            player1.points.push(40);
            this.setPointsToGem([player1, player2], player1.currentPoints + 2);
            // console.log(`DEUCE! ${player1.name} won the point! ${player1.name} points: ${player1.points}, ${player2.name} points: ${player2.points}`);
        }
        if(player1.currentPoints > 3 && player1.currentPoints - player2.currentPoints === 1) {
            player1.points.push("A");
            // console.log(`ADVANTAGE ${player1.name}! ${player1.name} won the point! ${player1.name} points: ${player1.points}, ${player2.name} points: ${player2.points}`);
        } 
        if(player1.currentPoints === player1.pointsToGem) {
            player1.gems++;
            this.checkSet(player1, player2);
            this.checkGame(player1, player2);
            // console.log(`---${player1.name} won the game! Points: ${player1.points}. ${player2.name} points: ${player2.points} Current set Result: ${player1.name} ${player1.gems} ${player2.name} ${player2.gems}---`);
            this.resetGem([player1, player2]);
        }
    } 
    // Tiebreak points handler
    else {
        player1.tiebreakPoints++;
        if(player1.tiebreakPoints === player1.tiebreakToGem) {
            player1.gems++;
            this.checkSet(player1, player2);
            this.checkGame(player1, player2);
            // console.log(`---${player1.name} won the tiebreak! Tiebreak result: ${player1.name} ${player2.name} ${player1.tiebreakPoints} ${player2.tiebreakPoints}---`);
            this.resetTiebreak([player1, player2]);
        }
        if(player1.tiebreakPoints === 6 && player2.tiebreakPoints === 6 || (player1.tiebreakToGem > 7 && player1.tiebreakPoints - player2.tiebreakPoints === 0)) {
            this.setTiebreakToGem([player1, player2], player1.tiebreakToGem + 1);
        }
        // console.log(`${player1.name} won the tiebreak point! Current tiebreak result: ${player1.name} ${player2.name} ${player1.tiebreakPoints} ${player2.tiebreakPoints}`);
    }

    // Match stats update on every point
    this.updateOverview([player1, player2]);
    // console.log("***************************************************************************************************************************************************************")
    // console.log(`${this.matchStats.overview[0].name}     ---- Points: ${this.matchStats.overview[0].point} Current Set: ${this.matchStats.overview[0].gems} Sets: ${this.matchStats.overview[0].sets} ${this.matchStats.overview[0].setGemsWon ? `Last Sets: ${[...this.matchStats.overview[0].setGemsWon]}` : ""}`);
    // console.log(`${this.matchStats.overview[1].name}     ---- Points: ${this.matchStats.overview[1].point} Current Set: ${this.matchStats.overview[1].gems} Sets: ${this.matchStats.overview[1].sets}  ${this.matchStats.overview[1].setGemsWon ? `Last Sets: ${[...this.matchStats.overview[1].setGemsWon]}` : ""}`);
}

// Match set handler
Match.prototype.checkSet = function(player1, player2) {
    if(player1.gems === 5 && player2.gems === 5) {
        this.rules.gemsWin = 7;
    }
    if(player1.gems === 6 && player2.gems === 6) {
        this.rules.tiebreak = true;
    }
    if(player1.gems === this.rules.gemsWin) {
        console.log(`------------${player1.name} won the set! Set Result: ${player1.name} ${player1.gems} ${player2.name} ${player2.gems}------------- `);
        this.updateOverview([player1, player2], "UpdateSetGemsWon");
        player1.gems = 0;
        player2.gems = 0;
        player1.sets++;
        this.rules.gemsWin = 6;
    }
}

// Match winner handler
Match.prototype.checkGame = function(player1, player2) {
    if(player1.sets === this.rules.setsWin) {
        this.winner = player1.name;
        this.loser = player2.name;
        console.log(`${player1.name} won the match!`);
        console.log(this);
        clearInterval(this.timer);
    }
}


Match.prototype.setPointsToGem = function(players, newPointsToGem) {
    players.forEach(player => {
        player.pointsToGem = newPointsToGem;
    })
}

Match.prototype.setTiebreakToGem = function(players, newTiebreakToGem) {
    players.forEach(player => {
        player.tiebreakToGem = newTiebreakToGem;
    })
}

Match.prototype.resetGem = function(players) {
    players.forEach(player => {
        player.points = [];
        player.currentPoints = 0;
        player.pointsToGem = 4;
    })
}

Match.prototype.resetTiebreak = function(players) {
    players.forEach(player => {
        player.tiebreakPoints = 0;
        player.tiebreakToGem = 7;
        this.rules.tiebreak = null;
    })
}

Match.prototype.updateOverview = function(players, setGemsWon) {
    const player1 = this.matchStats.overview.find(player => players[0].name === player.name);
    const player2 = this.matchStats.overview.find(player => players[1].name === player.name);

    if(!setGemsWon) {
        player1.point = players[0].points[players[0].currentPoints - 1] || 0;
        player1.gems = players[0].gems;
        player1.sets = players[0].sets;
        player2.point = players[1].points[players[1].currentPoints - 1] || 0;
        player2.gems = players[1].gems;
        player2.sets = players[1].sets;
    }
    else if(setGemsWon === "UpdateSetGemsWon") {
        player1.setGemsWon.push(players[0].gems);
        player2.setGemsWon.push(players[1].gems);
    }
}