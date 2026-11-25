// =============================================================
//  BACKUP ONLY: the site does NOT load this file.
// =============================================================
//  The regular-season schedule and playoffs as they were before the
//  stats moved to Supabase. The live data is now in Supabase
//  (tables game_days and games). Kept as a backup; delete once the
//  Supabase version is confirmed.
//
//  Format: each game is [time, team 1, score 1, team 2, score 2,
//  result, notes]. Scores are null until the game is played.
// =============================================================

const schedule = [
  { week: 1, date: "9/28/2026", mvp: "Dustin Gratto (MonStars), 20 pts 6 rebs", games: [
    ["7:00 PM", "MonStars", 64, "Xiao Long Ballers", 44],
    ["8:00 PM", "Sniper Elite!", 86, "K1 MASHERS", 45],
    ["9:00 PM", "Lago Boys", 73, "YUNG HOOPAS", 57],
  ]},
  { week: 2, date: "10/5/2026", mvp: "Predrag Stevcic (Lago Boys), 16 pts 6 rebs 1 blk", games: [
    ["7:00 PM", "Lago Boys", 65, "MonStars", 60],
    ["8:00 PM", "Sniper Elite!", 59, "Xiao Long Ballers", 46],
    ["9:00 PM", "YUNG HOOPAS", 64, "K1 MASHERS", 42],
  ]},
  { week: 3, date: "10/12/2026", mvp: "Bacari Green (MonStars), 26 pts 5 rebs", games: [
    ["7:00 PM", "MonStars", 59, "K1 MASHERS", 56],
    ["8:00 PM", "Sniper Elite!", 44, "YUNG HOOPAS", 41],
    ["9:00 PM", "Lago Boys", 55, "Xiao Long Ballers", 49],
  ]},
  { week: 4, date: "10/19/2026", mvp: "Hudson Guagliano (Lago Boys), 30 pts 2 rebs", games: [
    ["7:00 PM", "MonStars", 55, "YUNG HOOPAS", 52],
    ["8:00 PM", "Sniper Elite!", 56, "Lago Boys", 60],
    ["9:00 PM", "K1 MASHERS", 34, "Xiao Long Ballers", 35],
  ]},
  { week: 5, date: "10/26/2026", mvp: "Ben Sy (Sniper Elite!), 28 pts 3 rebs", games: [
    ["7:00 PM", "Lago Boys", 78, "K1 MASHERS", 51],
    ["8:00 PM", "MonStars", 55, "Sniper Elite!", 76],
    ["9:00 PM", "Xiao Long Ballers", 47, "YUNG HOOPAS", 49],
  ]},
  { week: 6, date: "11/2/2026", mvp: "Nathan Dimacali (Lago Boys), 17 pts 17 rebs 2 stls", games: [
    ["7:00 PM", "YUNG HOOPAS", 54, "MonStars", 79],
    ["8:00 PM", "Sniper Elite!", 65, "K1 MASHERS", 45],
    ["9:00 PM", "Xiao Long Ballers", 84, "Lago Boys", 91],
  ]},
  { week: 7, date: "11/9/2026", mvp: "Simon Uche (MonStars), 26 pts 3 rebs 2 stls", games: [
    ["7:00 PM", "K1 MASHERS", 52, "YUNG HOOPAS", 63],
    ["8:00 PM", "Sniper Elite!", 58, "Lago Boys", 49],
    ["9:00 PM", "Xiao Long Ballers", 48, "MonStars", 72],
  ]},
  { week: 8, date: "11/16/2026", mvp: "Nathan Dimacali (Lago Boys), 34 pts 10 3PM 2 rebs 2 stls", games: [
    // Forfeit: Xiao Long Ballers forfeited. The league records it as 2-0, which
    // counts in the standings totals only. It is NOT real points, so leave it
    // out of any averages or player stats.
    ["7:00 PM", "Xiao Long Ballers", 0, "YUNG HOOPAS", 2, "forfeit"],
    ["8:00 PM", "Sniper Elite!", 52, "MonStars", 59],
    ["9:00 PM", "Lago Boys", 76, "K1 MASHERS", 57],
  ]},
];

// Playoffs. Same game format as above; "TBD" until the matchup is set.
const playoffs = [
  { round: "Quarterfinals", date: "11/23/2026",
    note: "First-round byes: #1 Lago Boys, #2 Sniper Elite!", games: [
    // Last item = small notes shown next to each team's score
    ["7:00 PM", "#3 MonStars", 88, "#6 K1 MASHERS", 73, null,
      ["Advanced to semifinals vs #2 Sniper Elite!", "Eliminated"]],
    ["8:00 PM", "#4 YUNG HOOPAS", 59, "#5 Xiao Long Ballers", 54, null,
      ["Advanced to semifinals vs #1 Lago Boys", "Eliminated"]],
  ]},
  { round: "Semifinals", date: "11/30/2026", note: null, games: [
    ["7:00 PM", "#1 Lago Boys", null, "#4 YUNG HOOPAS", null],
    ["8:00 PM", "#2 Sniper Elite!", null, "#3 MonStars", null],
  ]},
  { round: "Championship", date: "11/30/2026",
    note: "Winners of both semifinals", games: [
    ["9:00 PM", "TBD", null, "TBD", null],
  ]},
];
