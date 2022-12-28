/* 
-- Tournament Draw Rules: 
- Total 32 Players, 8 Seed Players. Seed players can't play against each other in early rounds.
- Rank 1 and rank 2 players can't play against each other until final round.

- Every seed will recieve their own bracket(array) so they can't play against other seeds early. 
- Rank1 will be placed at bracket(array) 0-3, rank2 at 4-7 or vice-versa.

- Example of how should seeded and unseeded players be placed according to rules above
       SEEDS       REST of players
[[1,2,3,4,5,6,7,8], [...rest]] => this is achived by Tournament.seededUnseededParticipants()
[ [1,32,31,12], [8, 10, 30, 29], [4, 9, 28, 27], [6, 10, 26, 25], [5, 11, 24, 23], [2, 13, 22, 21], [7, 14, 20, 19], [3, 15, 18, 17] ] 
=> this is achieved by Tournament.createBrackets()

- Next step is to create matches based on these brackets.
round1 [ Match(1, 32), Match(31,12), Match(8, 10), Match(30, 29), Match(4, 9), Match(28, 27), Match(6, 10), Match(26, 25),
Match(5, 11), Match(24, 23), Match(2, 13), Match(22, 21), Match(7, 14), Match(20, 19), Match(3, 15), Match(18, 17) ]
=> this is achieved by Tournament.createInitialMatches()
- Next steps keep doing the same thing. Tournament.createNextRoundMatches() is called every time Tournament.simulateRound() is called, until Tournament is over.
round2 [ Match(1, 12), Match(8, 30), Match(4, 28), Match(10, 26), Match(5, 24), Match(2, 21), Match(7, 20), Match(3, 17) ]
quarterFinals [ Match(1, 8), Match(4, 10), Match(5, 2), Match(7, 3) ]
semiFinals [ Match(1, 4), Match(2, 3) ]
finals [ Match(1, 2) ]
*/

import { Player } from "./player";
import { Match } from "./match";

const { players } = Player;

export function Tournament(name, participants, series) {
    this.name = name;
    this.participants = participants;
    this.series = series;
    this.numSeeds = 8;
    this.winner = null;
    this.rounds = ["round1", "round2", "quarterFinals", "semiFinals", "finals"];
    this.currentRound = 0;
    this.roundIsDone = undefined;
    this.matchesLiveUpdates = false;
    this.simulationSpeed = "instant";
    this.matches = {
        round1: [],
        round2: [],
        quarterFinals: [],
        semiFinals: [],
        finals: []
    };
    this.rewardPoints = this.createRewardPoints();
    this.seededUnseededParticipants = this.getSeededUnseededParticipants();
    this.nextRoundMatches = this.createInitialMatches(this.createBrackets(this.seededUnseededParticipants[0].length));
}

Tournament.prototype.getSeededUnseededParticipants = function() {
    // Sort participants by rank
    const sortedParticipants = this.participants.sort((a, b) => {
        if(a.rank < b.rank) {
            return -1;
        } 
        else if(a.rank > b.rank) {
            return 1;
        }
    })

    // First numSeeds of sorted participans will be seeded players, rest will be unseeded
    const seededPlayers = [];
    const unseededPlayers = [];
    for(let i = 0; i < this.numSeeds; i++) {
        seededPlayers.push(sortedParticipants[i]);
    }
    for(let i = seededPlayers.length; i < sortedParticipants.length; i++) {
        unseededPlayers.push(sortedParticipants[i]);
    }

    return [[...seededPlayers], [...unseededPlayers]];
}

Tournament.prototype.createBrackets = function(numSeeded) {
    const [seeded, unseeded] = this.getSeededUnseededParticipants();
    const brackets = [];
    let rank1;
    let rank2;

    // Seeded players brackets and placements
    for(let i = 0; i < numSeeded; i++) {
        const randomSeededIndex = Math.floor(Math.random() * seeded.length);
        const newBracket = [seeded[randomSeededIndex]];
        // rank1 and rank2 seeds
        if(seeded[randomSeededIndex].rank === 1) {
            rank1 = [seeded[randomSeededIndex]];
        }
        else if(seeded[randomSeededIndex].rank === 2) {
            rank2 = [seeded[randomSeededIndex]];
        } 
        else {
            brackets.push(newBracket);
        }
        // remove seeded player from array
        seeded.splice(randomSeededIndex, 1);
    }

    // Create index for rank1 and rank2 players(need to be on different sides of array => rank1 index between 0-3, rank2 index between 4-7 or vice-versa)
    let rank1Index;
    let rank2Index;
    const rand = Math.random();
    if(rand > 0.5) {
        rank1Index = Math.floor(Math.random() * 4);
        rank2Index = getRandomBetween(4, 9);
    } 
    else {
        rank1Index = getRandomBetween(4, 9);
        rank2Index = Math.floor(Math.random() * 4);
    }

    // Insert rank1 and rank2 players to new positions
    brackets.splice(rank1Index, 0, rank1);
    brackets.splice(rank2Index, 0, rank2);

    // Unseeded players placement
    brackets.forEach(bracket => {
        for(let i = 0; i < 3; i++) {
            const randomUnseededIndex = Math.floor(Math.random() * unseeded.length);
            bracket.push(unseeded[randomUnseededIndex]);
            unseeded.splice(randomUnseededIndex, 1);
        } 
    })

    // Shuffle all individual brackets
    brackets.forEach(bracket => {
        bracket.sort(() => 0.5 - Math.random());
    })

    return brackets;
}

Tournament.prototype.createInitialMatches = function(matchBrackets) {
    // Create match brackets based on player brackets
    matchBrackets.forEach(bracket => {
        bracket.forEach((player, i) => {
            if(i % 2 === 0) {
                bracket.push(new Match(player, bracket[i + 1], { setsWin: 2, gemsWin: 6, tiebreak: null}, this.name, this.rounds[this.currentRound], this.series));
            }
        })
    })
    // Remove players from match brackets
    for(let i = 0; i < matchBrackets.length; i++) {
        matchBrackets[i] = matchBrackets[i].filter(instance => {
            return instance instanceof Match;
        })
    }

    // Create array of all matches
    const matches = [];
    matchBrackets.forEach(bracket => {
        matches.push(...bracket);
    })

    return matches;
}

Tournament.prototype.createNextRoundMatches = function(matches) {
    // Get match winners
    const matchWinners = matches.map(match => {
        return match.winner;
    })
    
    const newMatches = [];
    // Find players based on match winners, create new matches based on founded winners
    matchWinners.forEach((winner, i) => {
        if(i % 2 === 0) {
            const winner1 = winner;
            const winner2 = matchWinners[i + 1];

            const nextRoundPlayer1 = players.find(player => player.name === winner1);
            const nextRoundPlayer2 = players.find(player => player.name === winner2);

            newMatches.push(new Match(nextRoundPlayer1, nextRoundPlayer2, { setsWin: 2, gemsWin: 6, tiebreak: null}, this.name, this.rounds[this.currentRound], this.series));
        }
    })

    return newMatches;
}

Tournament.prototype.simulateMatches = function(round, simulation) {
    // Check if tournament is finished
    if(!this.winner) {
            const matches = this.nextRoundMatches;
            // Start simulating matches
            if(simulation === "instant") {
                this.matchesLiveUpdates = false;
                this.simulationSpeed = simulation;
                matches.forEach(match => {
                    while(!match.winner) {
                        match.handlePoint();
                    }
                    // Update player stats after match is done
                    match.updatePlayersStats(players);
            })
            // Save finished matches to matches object
            this.matches[round].push(...matches);
            // Prepare next round
            this.currentRound++;
            // If finals didn't play, create matches for next round, else finish tournament
            if(!this.matches.finals.length) { 
                this.nextRoundMatches = this.createNextRoundMatches(matches);
            } 
            else {
                this.winner = this.matches.finals[0].winner;
                this.givePlayerPoints();
                Player.updatePlayerRanks();
                this.updatePlayerStats(players);
            }
            }
            if(simulation === "slow") {
                this.matchesLiveUpdates = true;
                this.simulationSpeed = simulation;
                matches.forEach(match => {
                    match.timer = setInterval(() => {
                        match.handlePoint();
                    }, 200);
            
                if(match.winner) {
                    // Update player stats after match is done
                    match.updatePlayersStats(players);
                }
            })
            // Check if all matches are finished
            const timer = setInterval(() => {
                this.roundIsDone = matches.every(match => match.winner);
                if(this.roundIsDone) {
                    // Save finished matches to matches object
                    this.matches[round].push(...matches);
                    // Prepare next round
                    this.currentRound++;
                    console.log(this.currentRound);
                    // If finals didn't play, create matches for next round, else finish tournament
                    if(!this.matches.finals.length) { 
                        this.nextRoundMatches = this.createNextRoundMatches(matches);
                    } 
                    else {
                        this.winner = this.matches.finals[0].winner;
                        this.givePlayerPoints();
                        Player.updatePlayerRanks();
                        this.updatePlayerStats(players);
                    }
                    this.matchesLiveUpdates = false;
                    clearInterval(timer);
                }
            }, 100)
            } 
    } 
    else {
        return "Tournament is finished.";
    }
}

Tournament.prototype.givePlayerPoints = function() {
    // Find losers of each round and give them points based in which round they finished
    for(let round in this.matches) {
        const currentRound = round;
        const losers = this.matches[round].map(match => match.loser);
        losers.forEach(loserName => {
            const loser = players.find(player => player.name === loserName);
            loser.points += this.rewardPoints[currentRound];
        })
    }
    
    // Find winner of tournament
    const winnerName = this.winner;
    const winner = players.find(player => player.name === winnerName);
    // update winner points
    winner.points += this.rewardPoints.winner;
    // update player tournaments won
    winner.updateTournamentsWon();
}

// Update player statistic after tournament is done
Tournament.prototype.updatePlayerStats = function(players) {
    // update winrate
    players.forEach(player => {
        player.updateWinrate();
        player.updateFilterTournamentsWon();
        player.updateFilterWinrate();
        player.updateOldRankPoints(oldRankPoints => {
            oldRankPoints.rankDiff = oldRankPoints.rank  - player.rank;
            oldRankPoints.pointsDiff = player.points - oldRankPoints.points;

            oldRankPoints.rank = player.rank;
            oldRankPoints.points = player.points;
        })
    });
}

// Reward points for player placements in tournament
Tournament.prototype.createRewardPoints = function() {
    const rewardsPoints = {};
    if(this.series === "250") {
        rewardsPoints["round1"] = 5;
        rewardsPoints["round2"] = 20;
        rewardsPoints["quarterFinals"] = 45;
        rewardsPoints["semiFinals"] = 90;
        rewardsPoints["finals"] = 150;
        rewardsPoints["winner"] = 250;
    }
    if(this.series === "500") {
        rewardsPoints["round1"] = 20;
        rewardsPoints["round2"] = 45;
        rewardsPoints["quarterFinals"] = 90;
        rewardsPoints["semiFinals"] = 180;
        rewardsPoints["finals"] = 300;
        rewardsPoints["winner"] = 500;
    }
    if(this.series === "1000") {
        rewardsPoints["round1"] = 45;
        rewardsPoints["round2"] = 90;
        rewardsPoints["quarterFinals"] = 180;
        rewardsPoints["semiFinals"] = 360;
        rewardsPoints["finals"] = 600;
        rewardsPoints["winner"] = 1000;
    }
    if(this.series === "Super") {
        rewardsPoints["round1"] = 90;
        rewardsPoints["round2"] = 180;
        rewardsPoints["quarterFinals"] = 360;
        rewardsPoints["semiFinals"] = 720;
        rewardsPoints["finals"] = 1200;
        rewardsPoints["winner"] = 2000;
    }

    return rewardsPoints;
}

function getRandomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

const newT = new Tournament("Turnir", players, "500");
console.log(newT);