// Mock Data
const matches = [
    { id: 'm1', date: '2026-06-11 12:00', team1: 'BRA', team1Flag: '🇧🇷', team2: 'FRA', team2Flag: '🇫🇷' },
    { id: 'm2', date: '2026-06-12 15:00', team1: 'ARG', team1Flag: '🇦🇷', team2: 'ENG', team2Flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { id: 'm3', date: '2026-06-13 18:00', team1: 'ESP', team1Flag: '🇪🇸', team2: 'GER', team2Flag: '🇩🇪' },
];

const leaderboardData = [
    { name: 'ALEX_99', score: 14500 },
    { name: 'CHAMP', score: 12800 },
    { name: 'SOCCER_FAN', score: 9500 },
    { name: 'PLAYER_1', score: 8200 },
    { name: 'GUEST', score: 1500 },
];

// State
let predictions = {};

// DOM Elements
const matchesContainer = document.getElementById('matches-container');
const leaderboardList = document.getElementById('leaderboard-list');

// Initialize
function init() {
    renderMatches();
    renderLeaderboard();
}

// Render functions
function renderMatches() {
    matchesContainer.innerHTML = '';
    
    matches.forEach(match => {
        // Initialize state for this match if it doesn't exist
        if (!predictions[match.id]) {
            predictions[match.id] = { team1: 0, team2: 0 };
        }

        const card = document.createElement('div');
        card.className = 'match-card';
        card.innerHTML = `
            <div class="match-info">
                <span>MATCH ${match.id.substring(1)}</span>
                <span>${match.date}</span>
            </div>
            
            <div class="team-row">
                <div class="team-name">
                    <span class="flag">${match.team1Flag}</span> ${match.team1}
                </div>
                <div class="score-controls">
                    <button class="retro-btn" onclick="updateScore('${match.id}', 'team1', -1)">-</button>
                    <span class="score-display-input" id="score-${match.id}-team1">${predictions[match.id].team1}</span>
                    <button class="retro-btn" onclick="updateScore('${match.id}', 'team1', 1)">+</button>
                </div>
            </div>

            <div class="team-row">
                <div class="team-name">
                    <span class="flag">${match.team2Flag}</span> ${match.team2}
                </div>
                <div class="score-controls">
                    <button class="retro-btn" onclick="updateScore('${match.id}', 'team2', -1)">-</button>
                    <span class="score-display-input" id="score-${match.id}-team2">${predictions[match.id].team2}</span>
                    <button class="retro-btn" onclick="updateScore('${match.id}', 'team2', 1)">+</button>
                </div>
            </div>
            
            <button class="retro-btn submit-btn" onclick="placeBet('${match.id}')">PLACE BET</button>
        `;
        matchesContainer.appendChild(card);
    });
}

function renderLeaderboard() {
    leaderboardList.innerHTML = '';
    leaderboardData.forEach((entry, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${index + 1}. ${entry.name}</span>
            <span>${entry.score.toLocaleString()}</span>
        `;
        leaderboardList.appendChild(li);
    });
}

// Logic
window.updateScore = function(matchId, team, delta) {
    let currentScore = predictions[matchId][team];
    let newScore = currentScore + delta;
    
    // Prevent negative scores
    if (newScore < 0) newScore = 0;
    
    predictions[matchId][team] = newScore;
    
    // Update DOM directly for snappiness
    document.getElementById(`score-${matchId}-${team}`).textContent = newScore;
};

window.placeBet = function(matchId) {
    const p = predictions[matchId];
    const btn = event.target;
    
    // Visual feedback
    btn.textContent = 'BET LOCKED!';
    btn.style.backgroundColor = '#555';
    btn.style.boxShadow = '4px 4px 0px #222';
    btn.disabled = true;
    
    console.log(`Bet placed for ${matchId}: ${matches.find(m=>m.id === matchId).team1} ${p.team1} - ${p.team2} ${matches.find(m=>m.id === matchId).team2}`);
    
    // Reset button after short delay to simulate generic action
    setTimeout(() => {
         btn.textContent = 'PLACE BET';
         btn.style.backgroundColor = 'var(--color-accent)';
         btn.style.boxShadow = '4px 4px 0px #008899';
         btn.disabled = false;
    }, 1500);
}

// Boot
init();