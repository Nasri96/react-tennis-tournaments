import { useState } from "react";

const TournamentList = () => {
    const [tournaments, setTournaments] = useState([]);

    return (
        <div>
            {tournaments.length === 0 &&
                <p>Looks like you didn't create any tournament yet. Go to Create New Tournament tab and start creating tournaments.</p>
            }
        </div>
    );
}

export default TournamentList;