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
  { name: "Bacari Green",       team: "", gp: 7, pts: 128, threes: 28, ftm: 8,  fta: 11, reb: 33, stl: 4,  blk: 1 },
  { name: "Hudson Guagliano",   team: "", gp: 5, pts: 125, threes: 12, ftm: 9,  fta: 9,  reb: 30, stl: 4,  blk: 0 },
  { name: "Simon Uche",         team: "", gp: 5, pts: 93,  threes: 7,  ftm: 16, fta: 24, reb: 19, stl: 10, blk: 2 },
  { name: "Predrag Stevcic",    team: "", gp: 6, pts: 84,  threes: 5,  ftm: 6,  fta: 14, reb: 42, stl: 3,  blk: 1 },
  { name: "Jalen Panlone",      team: "", gp: 7, pts: 81,  threes: 14, ftm: 5,  fta: 5,  reb: 25, stl: 9,  blk: 2 },
  { name: "Tahj Boyd",          team: "", gp: 6, pts: 81,  threes: 4,  ftm: 13, fta: 17, reb: 24, stl: 5,  blk: 1 },
  { name: "Elias Etaat",        team: "", gp: 5, pts: 79,  threes: 8,  ftm: 9,  fta: 15, reb: 32, stl: 2,  blk: 1 },
  { name: "Ben Sy",             team: "", gp: 6, pts: 68,  threes: 8,  ftm: 4,  fta: 11, reb: 13, stl: 3,  blk: 0 },
  { name: "Peter Winningham",   team: "", gp: 3, pts: 65,  threes: 2,  ftm: 17, fta: 18, reb: 10, stl: 2,  blk: 0 },
  { name: "Tyler Fraser",       team: "", gp: 5, pts: 64,  threes: 8,  ftm: 2,  fta: 4,  reb: 22, stl: 4,  blk: 0 },
  { name: "Connor Gore",        team: "", gp: 7, pts: 60,  threes: 13, ftm: 3,  fta: 6,  reb: 28, stl: 4,  blk: 0 },
  { name: "Jeff Hector",        team: "", gp: 6, pts: 57,  threes: 7,  ftm: 2,  fta: 3,  reb: 18, stl: 9,  blk: 0 },
  { name: "ALONZO BELT",        team: "", gp: 5, pts: 56,  threes: 5,  ftm: 3,  fta: 7,  reb: 18, stl: 2,  blk: 1 },
  { name: "Jacob Patterson",    team: "", gp: 5, pts: 56,  threes: 3,  ftm: 5,  fta: 8,  reb: 26, stl: 5,  blk: 1 },
  { name: "Gian Magno",         team: "", gp: 6, pts: 55,  threes: 2,  ftm: 11, fta: 15, reb: 19, stl: 2,  blk: 0 },
  { name: "Nathan Dimacali",    team: "", gp: 6, pts: 55,  threes: 7,  ftm: 0,  fta: 0,  reb: 28, stl: 5,  blk: 0 },
  { name: "Dustin Gratto",      team: "", gp: 7, pts: 53,  threes: 5,  ftm: 2,  fta: 4,  reb: 16, stl: 0,  blk: 3 },
  { name: "Maurice Lewis",      team: "", gp: 6, pts: 53,  threes: 1,  ftm: 1,  fta: 2,  reb: 50, stl: 1,  blk: 7 },
  { name: "umayr ubaray",       team: "", gp: 7, pts: 52,  threes: 0,  ftm: 5,  fta: 6,  reb: 24, stl: 2,  blk: 0 },
  { name: "Kaya Bilgic",        team: "", gp: 5, pts: 46,  threes: 6,  ftm: 5,  fta: 7,  reb: 14, stl: 0,  blk: 0 },
  { name: "Eric Zhang",         team: "", gp: 7, pts: 43,  threes: 5,  ftm: 1,  fta: 1,  reb: 4,  stl: 6,  blk: 1 },
  { name: "Kevin Petersen",     team: "", gp: 6, pts: 37,  threes: 7,  ftm: 2,  fta: 4,  reb: 15, stl: 4,  blk: 0 },
  { name: "Luis Figueroa",      team: "", gp: 7, pts: 35,  threes: 3,  ftm: 0,  fta: 3,  reb: 21, stl: 2,  blk: 2 },
  { name: "Ryan Cummings",      team: "", gp: 5, pts: 33,  threes: 2,  ftm: 3,  fta: 4,  reb: 14, stl: 5,  blk: 0 },
  { name: "Sonnee Wilson",      team: "", gp: 6, pts: 32,  threes: 10, ftm: 2,  fta: 2,  reb: 15, stl: 0,  blk: 0 },
  { name: "Casey Rihn",         team: "", gp: 4, pts: 30,  threes: 3,  ftm: 2,  fta: 5,  reb: 15, stl: 3,  blk: 2 },
  { name: "Javier Gonzalez",    team: "", gp: 6, pts: 23,  threes: 4,  ftm: 3,  fta: 3,  reb: 15, stl: 7,  blk: 0 },
  { name: "James Anderson",     team: "", gp: 3, pts: 20,  threes: 2,  ftm: 4,  fta: 4,  reb: 3,  stl: 2,  blk: 1 },
  { name: "Zeke Sanchez",       team: "", gp: 5, pts: 20,  threes: 3,  ftm: 3,  fta: 3,  reb: 2,  stl: 0,  blk: 0 },
  { name: "Toine Bett",         team: "", gp: 4, pts: 18,  threes: 1,  ftm: 3,  fta: 4,  reb: 30, stl: 3,  blk: 3 },
  { name: "Ethan Wilcox",       team: "", gp: 5, pts: 16,  threes: 0,  ftm: 2,  fta: 6,  reb: 10, stl: 5,  blk: 0 },
  { name: "Andrew Alexander",   team: "", gp: 6, pts: 14,  threes: 0,  ftm: 0,  fta: 0,  reb: 28, stl: 0,  blk: 0 },
  { name: "Hamza Farooq",       team: "", gp: 5, pts: 13,  threes: 1,  ftm: 0,  fta: 2,  reb: 7,  stl: 0,  blk: 0 },
  { name: "hephzibah okafor",   team: "", gp: 4, pts: 13,  threes: 3,  ftm: 0,  fta: 0,  reb: 10, stl: 0,  blk: 0 },
  { name: "Edgar Guzman",       team: "", gp: 5, pts: 12,  threes: 2,  ftm: 0,  fta: 0,  reb: 6,  stl: 2,  blk: 0 },
  { name: "Payton Ahn",         team: "", gp: 6, pts: 12,  threes: 4,  ftm: 0,  fta: 0,  reb: 5,  stl: 0,  blk: 0 },
  { name: "roy liao",           team: "", gp: 4, pts: 12,  threes: 0,  ftm: 0,  fta: 0,  reb: 9,  stl: 0,  blk: 0 },
  { name: "John Lee",           team: "", gp: 6, pts: 11,  threes: 1,  ftm: 0,  fta: 0,  reb: 13, stl: 0,  blk: 0 },
  { name: "Tim Sheynberg",      team: "", gp: 4, pts: 11,  threes: 1,  ftm: 0,  fta: 1,  reb: 28, stl: 5,  blk: 0 },
  { name: "William Blanchard",  team: "", gp: 6, pts: 10,  threes: 2,  ftm: 1,  fta: 1,  reb: 18, stl: 1,  blk: 1 },
  { name: "Rahul Subramaniam",  team: "", gp: 1, pts: 9,   threes: 1,  ftm: 0,  fta: 0,  reb: 3,  stl: 1,  blk: 0 },
  { name: "Henry Wang",         team: "", gp: 2, pts: 8,   threes: 0,  ftm: 0,  fta: 0,  reb: 7,  stl: 0,  blk: 0 },
  { name: "Mike Velcich",       team: "", gp: 2, pts: 8,   threes: 0,  ftm: 2,  fta: 2,  reb: 0,  stl: 0,  blk: 2 },
  { name: "Mark Horeses-Reyes", team: "", gp: 2, pts: 7,   threes: 0,  ftm: 1,  fta: 2,  reb: 5,  stl: 1,  blk: 0 },
  { name: "Mikee Ruiz",         team: "", gp: 4, pts: 7,   threes: 1,  ftm: 0,  fta: 2,  reb: 18, stl: 1,  blk: 2 },
  { name: "cesar vasquez",      team: "", gp: 3, pts: 6,   threes: 0,  ftm: 0,  fta: 0,  reb: 5,  stl: 0,  blk: 0 },
  { name: "Jay Ortega",         team: "", gp: 4, pts: 6,   threes: 0,  ftm: 0,  fta: 0,  reb: 10, stl: 1,  blk: 0 },
  { name: "Kameron Bains",      team: "", gp: 3, pts: 4,   threes: 0,  ftm: 0,  fta: 2,  reb: 6,  stl: 0,  blk: 0 },
  { name: "David Covarrubias",  team: "", gp: 5, pts: 3,   threes: 1,  ftm: 0,  fta: 0,  reb: 28, stl: 3,  blk: 1 },
  { name: "Diego Islas",        team: "", gp: 1, pts: 2,   threes: 0,  ftm: 0,  fta: 0,  reb: 0,  stl: 0,  blk: 0 },
  { name: "Grant Tsuji",        team: "", gp: 1, pts: 2,   threes: 0,  ftm: 0,  fta: 0,  reb: 1,  stl: 0,  blk: 0 },
  { name: "Shant Megerdichian", team: "", gp: 4, pts: 2,   threes: 0,  ftm: 0,  fta: 0,  reb: 10, stl: 5,  blk: 1 },
  { name: "Gabino Ramirez",     team: "", gp: 0, pts: 0,   threes: 0,  ftm: 0,  fta: 0,  reb: 0,  stl: 0,  blk: 0 },
  { name: "Joshua Louie",       team: "", gp: 0, pts: 0,   threes: 0,  ftm: 0,  fta: 0,  reb: 0,  stl: 0,  blk: 0 },
  { name: "Marcus Param",       team: "", gp: 1, pts: 0,   threes: 0,  ftm: 0,  fta: 0,  reb: 0,  stl: 0,  blk: 0 },
];
