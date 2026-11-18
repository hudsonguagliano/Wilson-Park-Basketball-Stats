// =============================================================
//  PLAYER DATA  (this is the only file you need to edit)
// =============================================================
//
//  Real players from the LASportsNet stats page.
//  Teams are blank for now; fill them in when known.
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
  { name: "Hudson Guagliano",   team: "", gp: 6, pts: 151, threes: 16, ftm: 11, fta: 11, reb: 34, stl: 6,  blk: 0 },
  { name: "Bacari Green",       team: "", gp: 8, pts: 151, threes: 32, ftm: 11, fta: 14, reb: 34, stl: 4,  blk: 1 },
  { name: "Simon Uche",         team: "", gp: 6, pts: 103, threes: 7,  ftm: 18, fta: 28, reb: 25, stl: 11, blk: 2 },
  { name: "Elias Etaat",        team: "", gp: 6, pts: 95,  threes: 10, ftm: 11, fta: 17, reb: 41, stl: 3,  blk: 1 },
  { name: "Predrag Stevcic",    team: "", gp: 7, pts: 93,  threes: 5,  ftm: 6,  fta: 14, reb: 51, stl: 3,  blk: 2 },
  { name: "Nathan Dimacali",    team: "", gp: 7, pts: 89,  threes: 17, ftm: 0,  fta: 0,  reb: 30, stl: 7,  blk: 0 },
  { name: "Jalen Panlone",      team: "", gp: 7, pts: 81,  threes: 14, ftm: 5,  fta: 5,  reb: 25, stl: 9,  blk: 2 },
  { name: "Tahj Boyd",          team: "", gp: 6, pts: 81,  threes: 4,  ftm: 13, fta: 17, reb: 24, stl: 5,  blk: 1 },
  { name: "Peter Winningham",   team: "", gp: 4, pts: 76,  threes: 3,  ftm: 19, fta: 22, reb: 21, stl: 5,  blk: 0 },
  { name: "Jeff Hector",        team: "", gp: 7, pts: 72,  threes: 7,  ftm: 2,  fta: 3,  reb: 21, stl: 12, blk: 0 },
  { name: "Ben Sy",             team: "", gp: 7, pts: 72,  threes: 9,  ftm: 5,  fta: 13, reb: 15, stl: 4,  blk: 0 },
  { name: "Tyler Fraser",       team: "", gp: 5, pts: 64,  threes: 8,  ftm: 2,  fta: 4,  reb: 22, stl: 4,  blk: 0 },
  { name: "Connor Gore",        team: "", gp: 7, pts: 60,  threes: 13, ftm: 3,  fta: 6,  reb: 28, stl: 4,  blk: 0 },
  { name: "ALONZO BELT",        team: "", gp: 6, pts: 60,  threes: 5,  ftm: 3,  fta: 9,  reb: 22, stl: 2,  blk: 3 },
  { name: "Dustin Gratto",      team: "", gp: 8, pts: 59,  threes: 5,  ftm: 2,  fta: 4,  reb: 26, stl: 1,  blk: 3 },
  { name: "Maurice Lewis",      team: "", gp: 7, pts: 58,  threes: 1,  ftm: 2,  fta: 4,  reb: 60, stl: 1,  blk: 10 },
  { name: "Jacob Patterson",    team: "", gp: 5, pts: 56,  threes: 3,  ftm: 5,  fta: 8,  reb: 26, stl: 5,  blk: 1 },
  { name: "Gian Magno",         team: "", gp: 6, pts: 55,  threes: 2,  ftm: 11, fta: 15, reb: 19, stl: 2,  blk: 0 },
  { name: "umayr ubaray",       team: "", gp: 7, pts: 52,  threes: 0,  ftm: 5,  fta: 6,  reb: 24, stl: 2,  blk: 0 },
  { name: "Kaya Bilgic",        team: "", gp: 5, pts: 46,  threes: 6,  ftm: 5,  fta: 7,  reb: 14, stl: 0,  blk: 0 },
  { name: "Eric Zhang",         team: "", gp: 7, pts: 43,  threes: 5,  ftm: 1,  fta: 1,  reb: 4,  stl: 6,  blk: 1 },
  { name: "Kevin Petersen",     team: "", gp: 7, pts: 42,  threes: 8,  ftm: 2,  fta: 6,  reb: 18, stl: 4,  blk: 0 },
  { name: "James Anderson",     team: "", gp: 4, pts: 37,  threes: 3,  ftm: 5,  fta: 6,  reb: 10, stl: 3,  blk: 2 },
  { name: "Luis Figueroa",      team: "", gp: 7, pts: 35,  threes: 3,  ftm: 0,  fta: 3,  reb: 21, stl: 2,  blk: 2 },
  { name: "Ryan Cummings",      team: "", gp: 6, pts: 35,  threes: 2,  ftm: 3,  fta: 4,  reb: 16, stl: 5,  blk: 0 },
  { name: "Sonnee Wilson",      team: "", gp: 6, pts: 32,  threes: 10, ftm: 2,  fta: 2,  reb: 15, stl: 0,  blk: 0 },
  { name: "Casey Rihn",         team: "", gp: 5, pts: 30,  threes: 3,  ftm: 2,  fta: 5,  reb: 15, stl: 3,  blk: 2 },
  { name: "Toine Bett",         team: "", gp: 5, pts: 29,  threes: 3,  ftm: 6,  fta: 7,  reb: 38, stl: 4,  blk: 5 },
  { name: "Javier Gonzalez",    team: "", gp: 7, pts: 28,  threes: 5,  ftm: 3,  fta: 3,  reb: 16, stl: 8,  blk: 0 },
  { name: "Zeke Sanchez",       team: "", gp: 5, pts: 20,  threes: 3,  ftm: 3,  fta: 3,  reb: 2,  stl: 0,  blk: 0 },
  { name: "Mike Velcich",       team: "", gp: 3, pts: 16,  threes: 2,  ftm: 2,  fta: 2,  reb: 3,  stl: 0,  blk: 2 },
  { name: "Ethan Wilcox",       team: "", gp: 5, pts: 16,  threes: 0,  ftm: 2,  fta: 6,  reb: 10, stl: 5,  blk: 0 },
  { name: "Andrew Alexander",   team: "", gp: 6, pts: 14,  threes: 0,  ftm: 0,  fta: 0,  reb: 28, stl: 0,  blk: 0 },
  { name: "hephzibah okafor",   team: "", gp: 4, pts: 13,  threes: 3,  ftm: 0,  fta: 0,  reb: 10, stl: 0,  blk: 0 },
  { name: "Hamza Farooq",       team: "", gp: 5, pts: 13,  threes: 1,  ftm: 0,  fta: 2,  reb: 7,  stl: 0,  blk: 0 },
  { name: "Edgar Guzman",       team: "", gp: 6, pts: 12,  threes: 2,  ftm: 0,  fta: 0,  reb: 7,  stl: 2,  blk: 0 },
  { name: "Payton Ahn",         team: "", gp: 6, pts: 12,  threes: 4,  ftm: 0,  fta: 0,  reb: 5,  stl: 0,  blk: 0 },
  { name: "roy liao",           team: "", gp: 4, pts: 12,  threes: 0,  ftm: 0,  fta: 0,  reb: 9,  stl: 0,  blk: 0 },
  { name: "John Lee",           team: "", gp: 6, pts: 11,  threes: 1,  ftm: 0,  fta: 0,  reb: 13, stl: 0,  blk: 0 },
  { name: "Tim Sheynberg",      team: "", gp: 4, pts: 11,  threes: 1,  ftm: 0,  fta: 1,  reb: 28, stl: 5,  blk: 0 },
  { name: "Mark Horeses-Reyes", team: "", gp: 3, pts: 11,  threes: 3,  ftm: 1,  fta: 2,  reb: 10, stl: 2,  blk: 0 },
  { name: "William Blanchard",  team: "", gp: 6, pts: 10,  threes: 2,  ftm: 1,  fta: 1,  reb: 18, stl: 1,  blk: 1 },
  { name: "Rahul Subramaniam",  team: "", gp: 1, pts: 9,   threes: 1,  ftm: 0,  fta: 0,  reb: 3,  stl: 1,  blk: 0 },
  { name: "Henry Wang",         team: "", gp: 2, pts: 8,   threes: 0,  ftm: 0,  fta: 0,  reb: 7,  stl: 0,  blk: 0 },
  { name: "Mikee Ruiz",         team: "", gp: 4, pts: 7,   threes: 1,  ftm: 0,  fta: 2,  reb: 18, stl: 1,  blk: 2 },
  { name: "cesar vasquez",      team: "", gp: 3, pts: 6,   threes: 0,  ftm: 0,  fta: 0,  reb: 5,  stl: 0,  blk: 0 },
  { name: "Jay Ortega",         team: "", gp: 4, pts: 6,   threes: 0,  ftm: 0,  fta: 0,  reb: 10, stl: 1,  blk: 0 },
  { name: "Shant Megerdichian", team: "", gp: 5, pts: 4,   threes: 0,  ftm: 0,  fta: 0,  reb: 12, stl: 6,  blk: 1 },
  { name: "Kameron Bains",      team: "", gp: 3, pts: 4,   threes: 0,  ftm: 0,  fta: 2,  reb: 6,  stl: 0,  blk: 0 },
  { name: "David Covarrubias",  team: "", gp: 5, pts: 3,   threes: 1,  ftm: 0,  fta: 0,  reb: 28, stl: 3,  blk: 1 },
  { name: "Diego Islas",        team: "", gp: 1, pts: 2,   threes: 0,  ftm: 0,  fta: 0,  reb: 0,  stl: 0,  blk: 0 },
  { name: "Grant Tsuji",        team: "", gp: 1, pts: 2,   threes: 0,  ftm: 0,  fta: 0,  reb: 1,  stl: 0,  blk: 0 },
  { name: "Gabino Ramirez",     team: "", gp: 0, pts: 0,   threes: 0,  ftm: 0,  fta: 0,  reb: 0,  stl: 0,  blk: 0 },
  { name: "Joshua Louie",       team: "", gp: 0, pts: 0,   threes: 0,  ftm: 0,  fta: 0,  reb: 0,  stl: 0,  blk: 0 },
  { name: "Marcus Param",       team: "", gp: 1, pts: 0,   threes: 0,  ftm: 0,  fta: 0,  reb: 0,  stl: 0,  blk: 0 },
];
