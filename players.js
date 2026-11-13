// =============================================================
//  PLAYER DATA  (this is the only file you need to edit)
// =============================================================
//
//  These are SAMPLE players. Replace them with real numbers
//  from the LASportsNet stats page.
//
//  Enter season TOTALS, exactly as LASportsNet shows them.
//  The page works out the per-game averages and FT% for you.
//
//  What each short name means:
//    name   = player's name (keep the "quotes")
//    team   = team name     (keep the "quotes")
//    gp     = games played
//    pts    = total points
//    threes = total 3-pointers made
//    ftm    = free throws made
//    fta    = free throws attempted
//    reb    = total rebounds
//    stl    = total steals
//    blk    = total blocks
//
//  To ADD a player: copy one whole line { ... }, paste it on a
//  new line, and change the numbers. Every line ends with a comma.
//  To REMOVE a player: delete their whole line.
// =============================================================

const players = [
  { name: "Marcus Lee",     team: "Team A", gp: 7, pts: 112, threes: 14, ftm: 18, fta: 24, reb: 49, stl: 12, blk: 5 },
  { name: "Danny Ortiz",    team: "Team A", gp: 6, pts: 78,  threes: 16, ftm: 10, fta: 12, reb: 21, stl: 9,  blk: 1 },
  { name: "Chris Walker",   team: "Team B", gp: 7, pts: 95,  threes: 3,  ftm: 21, fta: 35, reb: 70, stl: 4,  blk: 14 },
  { name: "Tony Nguyen",    team: "Team B", gp: 4, pts: 72,  threes: 10, ftm: 12, fta: 14, reb: 18, stl: 10, blk: 0 },
  { name: "Jamal Brooks",   team: "Team C", gp: 7, pts: 64,  threes: 2,  ftm: 8,  fta: 16, reb: 58, stl: 6,  blk: 11 },
  { name: "Kevin Park",     team: "Team C", gp: 5, pts: 55,  threes: 12, ftm: 7,  fta: 8,  reb: 15, stl: 13, blk: 2 },
  { name: "Ray Thompson",   team: "Team D", gp: 6, pts: 48,  threes: 4,  ftm: 2,  fta: 2,  reb: 33, stl: 5,  blk: 7 },
  { name: "Luis Hernandez", team: "Team D", gp: 3, pts: 41,  threes: 6,  ftm: 11, fta: 13, reb: 12, stl: 3,  blk: 1 },
];
