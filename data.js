// =============================================================
//  STATS FROM SUPABASE
// =============================================================
//  Loads every stat from the Supabase database (read-only) and turns
//  the rows into the same lists the page has always used.
//  To change stats, edit them in Supabase's Table Editor.
//  The project URL and public key are in config.js.
// =============================================================

const SEASON = "Fall 2026";

let players = [];        // this season's totals for each player
let allTimePlayers = []; // career totals across every season
let leagueAwards = [];   // the League Awards card
let schedule = [];       // regular-season weeks: { week, date, mvp, games }
let playoffs = [];       // playoff rounds: { round, date, note, games }

// Read rows from one table through Supabase's REST API
async function readTable(query) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${query}`, {
    headers: { apikey: SUPABASE_PUBLISHABLE_KEY },
  });
  if (!response.ok) throw new Error(`Supabase answered ${response.status} for ${query}`);
  return response.json();
}

// "2026-09-28" -> "9/28/2026"
function shortDate(isoDate) {
  const [year, month, day] = isoDate.split("-");
  return `${Number(month)}/${Number(day)}/${year}`;
}

// A games row -> [time, team 1, score 1, team 2, score 2, result, notes]
// (scores are null until the game is played)
function gameRow(g) {
  return [g.time, g.team1, g.score1, g.team2, g.score2, g.result, g.notes];
}

// Load everything at once and fill in the lists above
async function loadStats() {
  const season = `season=eq.${encodeURIComponent(SEASON)}`;
  const statColumns = "name,gp,pts,threes,ftm,fta,reb,stl,blk";
  const [seasonRows, careerRows, awardRows, dayRows] = await Promise.all([
    // order=id keeps the original order, so ties rank the same as before
    readTable(`season_players?select=team,${statColumns}&${season}&order=id`),
    readTable(`career_players?select=${statColumns}&order=id`),
    readTable(`awards?select=name,awards&order=sort_order`),
    readTable(`game_days?select=kind,week,round,date,mvp,note,` +
      `games(time,team1,score1,team2,score2,result,notes,sort_order)` +
      `&${season}&order=sort_order&games.order=sort_order`),
  ]);

  players = seasonRows;
  allTimePlayers = careerRows;
  leagueAwards = awardRows;
  schedule = dayRows.filter(d => d.kind === "regular").map(d => ({
    week: d.week, date: shortDate(d.date), mvp: d.mvp, games: d.games.map(gameRow),
  }));
  playoffs = dayRows.filter(d => d.kind === "playoff").map(d => ({
    round: d.round, date: shortDate(d.date), note: d.note, games: d.games.map(gameRow),
  }));
}
