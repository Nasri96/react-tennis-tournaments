import { Tournament as TournamentConstructor } from "./tournament";
import { Player } from "./player";
const { players } = Player;

const createRandomTournaments = (numTournaments = 10) => {
    const createdTournaments = [];
    let createdMatches = [];

    const tournamentSeries = [
        "250",
        "500",
        "1000",
        "Super"
    ]

    // Create 10 default random tournaments for app
    for(let i = 0; i < numTournaments; i++) {
        const tournamentName = `Tournament: ${Math.floor(Math.random() * 1000)}`;
        const randomTournamentSeries = tournamentSeries[Math.floor(Math.random() * tournamentSeries.length)];
        const newTournament = new TournamentConstructor(tournamentName, players, randomTournamentSeries);
        newTournament.simulateMatches("round1", "instant");
        newTournament.simulateMatches("round2", "instant");
        newTournament.simulateMatches("quarterFinals", "instant");
        newTournament.simulateMatches("semiFinals", "instant");
        newTournament.simulateMatches("finals", "instant");
        createdTournaments.unshift(newTournament);
    }

    // save latest tournament matches
    for(let i = createdTournaments.length - 1; i >= 0; i--) {
        for(let tournamentRound in createdTournaments[i].matches) {
            for(let j = 0; j < createdTournaments[i].matches[tournamentRound].length; j++) {
                createdMatches.unshift(createdTournaments[i].matches[tournamentRound][j]);
            }
        }
    }

    return {
        createdTournaments,
        createdMatches
    }
}

const seedApp = {
    createRandomTournaments,
}

export default seedApp;