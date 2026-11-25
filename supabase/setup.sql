-- =============================================================
--  Wilson Park Basketball Stats: Supabase setup
-- =============================================================
--  Run this ONCE in Supabase: SQL Editor -> New query -> paste -> Run.
--  It creates the tables, makes them read-only for the website,
--  and loads every stat that was in players.js, alltime.js and index.html.
--
--  It runs as one transaction: if anything fails, nothing is saved.
--  Running it a second time fails safely ("relation already exists")
--  instead of adding duplicate rows.
-- =============================================================

begin;

-- ---------- Tables ----------

-- Season totals for each player (was players.js)
create table season_players (
  id      bigint generated always as identity primary key,
  season  text not null,
  name    text not null,
  team    text,
  gp      int not null default 0,
  pts     int not null default 0,
  threes  int not null default 0,
  ftm     int not null default 0,
  fta     int not null default 0,
  reb     int not null default 0,
  stl     int not null default 0,
  blk     int not null default 0,
  unique (season, name)
);

-- Career totals across every season (was allTimePlayers in alltime.js)
create table career_players (
  id      bigint generated always as identity primary key,
  name    text not null unique,
  gp      int not null default 0,
  pts     int not null default 0,
  threes  int not null default 0,
  ftm     int not null default 0,
  fta     int not null default 0,
  reb     int not null default 0,
  stl     int not null default 0,
  blk     int not null default 0
);

-- League Awards card (was leagueAwards in alltime.js)
create table awards (
  id          bigint generated always as identity primary key,
  name        text not null,
  awards      text[] not null,
  sort_order  int not null
);

-- One row per regular-season week or playoff round (was schedule / playoffs in index.html)
create table game_days (
  id          bigint generated always as identity primary key,
  season      text not null,
  kind        text not null check (kind in ('regular', 'playoff')),
  week        int,     -- regular season only
  round       text,    -- playoffs only, e.g. 'Quarterfinals'
  date        date not null,
  mvp         text,    -- regular season week MVP line
  note        text,    -- e.g. 'First-round byes: ...'
  sort_order  int not null
);

-- One row per game. Scores stay null until the game is played.
create table games (
  id           bigint generated always as identity primary key,
  game_day_id  bigint not null references game_days (id) on delete cascade,
  time         text not null,   -- e.g. '7:00 PM'
  team1        text not null,
  score1       int,
  team2        text not null,
  score2       int,
  result       text,            -- 'forfeit', or null for a normal game
  notes        text[],          -- small notes next to each team's score, or null
  sort_order   int not null
);

-- ---------- Read-only for the website ----------
-- Row Level Security on, one rule that lets anyone read, and no rules for
-- adding, changing or deleting. The write permissions are also taken away
-- outright, so the public key can only ever read.

alter table season_players enable row level security;
create policy "Anyone can read" on season_players for select to anon, authenticated using (true);
revoke insert, update, delete, truncate on season_players from anon, authenticated;
grant select on season_players to anon, authenticated;

alter table career_players enable row level security;
create policy "Anyone can read" on career_players for select to anon, authenticated using (true);
revoke insert, update, delete, truncate on career_players from anon, authenticated;
grant select on career_players to anon, authenticated;

alter table awards enable row level security;
create policy "Anyone can read" on awards for select to anon, authenticated using (true);
revoke insert, update, delete, truncate on awards from anon, authenticated;
grant select on awards to anon, authenticated;

alter table game_days enable row level security;
create policy "Anyone can read" on game_days for select to anon, authenticated using (true);
revoke insert, update, delete, truncate on game_days from anon, authenticated;
grant select on game_days to anon, authenticated;

alter table games enable row level security;
create policy "Anyone can read" on games for select to anon, authenticated using (true);
revoke insert, update, delete, truncate on games from anon, authenticated;
grant select on games to anon, authenticated;

-- ---------- Data: season players (55) ----------
insert into season_players (season, name, team, gp, pts, threes, ftm, fta, reb, stl, blk) values
  ('Fall 2026', 'Hudson Guagliano', null, 6, 151, 16, 11, 11, 34, 6, 0),
  ('Fall 2026', 'Bacari Green', null, 8, 151, 32, 11, 14, 34, 4, 1),
  ('Fall 2026', 'Simon Uche', null, 6, 103, 7, 18, 28, 25, 11, 2),
  ('Fall 2026', 'Elias Etaat', null, 6, 95, 10, 11, 17, 41, 3, 1),
  ('Fall 2026', 'Predrag Stevcic', null, 7, 93, 5, 6, 14, 51, 3, 2),
  ('Fall 2026', 'Nathan Dimacali', null, 7, 89, 17, 0, 0, 30, 7, 0),
  ('Fall 2026', 'Jalen Panlone', null, 7, 81, 14, 5, 5, 25, 9, 2),
  ('Fall 2026', 'Tahj Boyd', null, 6, 81, 4, 13, 17, 24, 5, 1),
  ('Fall 2026', 'Peter Winningham', null, 4, 76, 3, 19, 22, 21, 5, 0),
  ('Fall 2026', 'Jeff Hector', null, 7, 72, 7, 2, 3, 21, 12, 0),
  ('Fall 2026', 'Ben Sy', null, 7, 72, 9, 5, 13, 15, 4, 0),
  ('Fall 2026', 'Tyler Fraser', null, 5, 64, 8, 2, 4, 22, 4, 0),
  ('Fall 2026', 'Connor Gore', null, 7, 60, 13, 3, 6, 28, 4, 0),
  ('Fall 2026', 'ALONZO BELT', null, 6, 60, 5, 3, 9, 22, 2, 3),
  ('Fall 2026', 'Dustin Gratto', null, 8, 59, 5, 2, 4, 26, 1, 3),
  ('Fall 2026', 'Maurice Lewis', null, 7, 58, 1, 2, 4, 60, 1, 10),
  ('Fall 2026', 'Jacob Patterson', null, 5, 56, 3, 5, 8, 26, 5, 1),
  ('Fall 2026', 'Gian Magno', null, 6, 55, 2, 11, 15, 19, 2, 0),
  ('Fall 2026', 'umayr ubaray', null, 7, 52, 0, 5, 6, 24, 2, 0),
  ('Fall 2026', 'Kaya Bilgic', null, 5, 46, 6, 5, 7, 14, 0, 0),
  ('Fall 2026', 'Eric Zhang', null, 7, 43, 5, 1, 1, 4, 6, 1),
  ('Fall 2026', 'Kevin Petersen', null, 7, 42, 8, 2, 6, 18, 4, 0),
  ('Fall 2026', 'James Anderson', null, 4, 37, 3, 5, 6, 10, 3, 2),
  ('Fall 2026', 'Luis Figueroa', null, 7, 35, 3, 0, 3, 21, 2, 2),
  ('Fall 2026', 'Ryan Cummings', null, 6, 35, 2, 3, 4, 16, 5, 0),
  ('Fall 2026', 'Sonnee Wilson', null, 6, 32, 10, 2, 2, 15, 0, 0),
  ('Fall 2026', 'Casey Rihn', null, 5, 30, 3, 2, 5, 15, 3, 2),
  ('Fall 2026', 'Toine Bett', null, 5, 29, 3, 6, 7, 38, 4, 5),
  ('Fall 2026', 'Javier Gonzalez', null, 7, 28, 5, 3, 3, 16, 8, 0),
  ('Fall 2026', 'Zeke Sanchez', null, 5, 20, 3, 3, 3, 2, 0, 0),
  ('Fall 2026', 'Mike Velcich', null, 3, 16, 2, 2, 2, 3, 0, 2),
  ('Fall 2026', 'Ethan Wilcox', null, 5, 16, 0, 2, 6, 10, 5, 0),
  ('Fall 2026', 'Andrew Alexander', null, 6, 14, 0, 0, 0, 28, 0, 0),
  ('Fall 2026', 'hephzibah okafor', null, 4, 13, 3, 0, 0, 10, 0, 0),
  ('Fall 2026', 'Hamza Farooq', null, 5, 13, 1, 0, 2, 7, 0, 0),
  ('Fall 2026', 'Edgar Guzman', null, 6, 12, 2, 0, 0, 7, 2, 0),
  ('Fall 2026', 'Payton Ahn', null, 6, 12, 4, 0, 0, 5, 0, 0),
  ('Fall 2026', 'roy liao', null, 4, 12, 0, 0, 0, 9, 0, 0),
  ('Fall 2026', 'John Lee', null, 6, 11, 1, 0, 0, 13, 0, 0),
  ('Fall 2026', 'Tim Sheynberg', null, 4, 11, 1, 0, 1, 28, 5, 0),
  ('Fall 2026', 'Mark Horeses-Reyes', null, 3, 11, 3, 1, 2, 10, 2, 0),
  ('Fall 2026', 'William Blanchard', null, 6, 10, 2, 1, 1, 18, 1, 1),
  ('Fall 2026', 'Rahul Subramaniam', null, 1, 9, 1, 0, 0, 3, 1, 0),
  ('Fall 2026', 'Henry Wang', null, 2, 8, 0, 0, 0, 7, 0, 0),
  ('Fall 2026', 'Mikee Ruiz', null, 4, 7, 1, 0, 2, 18, 1, 2),
  ('Fall 2026', 'cesar vasquez', null, 3, 6, 0, 0, 0, 5, 0, 0),
  ('Fall 2026', 'Jay Ortega', null, 4, 6, 0, 0, 0, 10, 1, 0),
  ('Fall 2026', 'Shant Megerdichian', null, 5, 4, 0, 0, 0, 12, 6, 1),
  ('Fall 2026', 'Kameron Bains', null, 3, 4, 0, 0, 2, 6, 0, 0),
  ('Fall 2026', 'David Covarrubias', null, 5, 3, 1, 0, 0, 28, 3, 1),
  ('Fall 2026', 'Diego Islas', null, 1, 2, 0, 0, 0, 0, 0, 0),
  ('Fall 2026', 'Grant Tsuji', null, 1, 2, 0, 0, 0, 1, 0, 0),
  ('Fall 2026', 'Gabino Ramirez', null, 0, 0, 0, 0, 0, 0, 0, 0),
  ('Fall 2026', 'Joshua Louie', null, 0, 0, 0, 0, 0, 0, 0, 0),
  ('Fall 2026', 'Marcus Param', null, 1, 0, 0, 0, 0, 0, 0, 0);

-- ---------- Data: career players (101) ----------
insert into career_players (name, gp, pts, threes, ftm, fta, reb, stl, blk) values
  ('Hudson Guagliano', 36, 875, 82, 62, 83, 194, 24, 2),
  ('Jeff Hector', 32, 439, 54, 23, 45, 192, 83, 19),
  ('Omar Hernandez', 29, 388, 50, 9, 23, 254, 30, 13),
  ('Jalen Panlone', 30, 371, 60, 28, 38, 128, 46, 8),
  ('Sonnee Wilson', 51, 369, 99, 8, 12, 154, 12, 5),
  ('Kevin Petersen', 46, 359, 46, 27, 59, 191, 68, 17),
  ('Edgar Guzman', 35, 317, 47, 15, 22, 99, 28, 2),
  ('Adrian Herrera', 29, 307, 63, 31, 46, 142, 21, 2),
  ('Bacari Green', 15, 304, 70, 24, 30, 83, 11, 1),
  ('Joshua Louie', 27, 276, 33, 33, 63, 158, 43, 7),
  ('Tyler Fraser', 20, 275, 26, 40, 51, 104, 28, 2),
  ('Nathan Dimacali', 23, 306, 43, 14, 19, 103, 24, 1),
  ('Tahj Boyd', 19, 261, 11, 42, 67, 100, 26, 5),
  ('Raul Ortiz', 28, 260, 37, 11, 20, 81, 45, 1),
  ('Predrag Stevcic', 21, 264, 12, 29, 44, 195, 14, 8),
  ('ARTURO FLORES', 33, 251, 69, 15, 21, 121, 33, 2),
  ('Manny Martinez', 36, 248, 55, 3, 5, 130, 13, 7),
  ('Alyze Bennett', 15, 245, 24, 43, 64, 84, 27, 1),
  ('Eric Zhang', 37, 237, 39, 8, 14, 74, 28, 2),
  ('James Stewart', 15, 219, 43, 6, 9, 43, 39, 1),
  ('Jonatan Miranda', 18, 216, 32, 3, 6, 88, 17, 1),
  ('Toine Bett', 36, 226, 33, 23, 43, 283, 39, 23),
  ('Barrett Warden', 27, 213, 6, 7, 35, 171, 16, 8),
  ('Sasoon Abramian', 15, 211, 0, 20, 46, 272, 11, 20),
  ('Alan Gordon', 19, 205, 10, 39, 65, 117, 31, 3),
  ('Seven Mason', 11, 205, 5, 38, 61, 109, 25, 7),
  ('Steven Fausto', 7, 196, 29, 18, 27, 33, 4, 1),
  ('Zach Saavedra', 6, 194, 19, 25, 34, 42, 18, 1),
  ('Morley Covam', 15, 182, 10, 25, 42, 125, 10, 8),
  ('Ozioma Ogele', 30, 171, 7, 22, 64, 139, 24, 6),
  ('Curtis Rodgers', 12, 170, 38, 28, 38, 58, 21, 10),
  ('Andrew Park', 14, 165, 36, 6, 16, 43, 21, 1),
  ('Omar Reese', 8, 159, 13, 28, 42, 38, 11, 1),
  ('Andrew Carter', 7, 157, 21, 15, 23, 42, 4, 0),
  ('Jacob Patterson', 13, 154, 10, 16, 21, 88, 14, 2),
  ('Earnest Pettway', 13, 152, 3, 25, 54, 225, 32, 13),
  ('Dawon Hampton', 13, 147, 9, 12, 18, 55, 17, 3),
  ('Connor Gore', 22, 143, 24, 17, 26, 121, 19, 1),
  ('Jonathan Edmonds', 8, 142, 12, 15, 23, 51, 10, 3),
  ('Brandon Ray', 15, 139, 19, 13, 23, 58, 9, 1),
  ('Brey Archer', 6, 139, 21, 15, 21, 48, 14, 1),
  ('Mark Reyes', 12, 134, 9, 11, 25, 49, 15, 1),
  ('Joshua Bradshaw', 15, 133, 11, 14, 40, 120, 11, 6),
  ('travis williams', 19, 133, 1, 13, 32, 129, 18, 2),
  ('WESLEY HARRIS', 13, 132, 14, 9, 24, 50, 26, 0),
  ('Andre Johnson', 13, 125, 33, 7, 14, 67, 15, 0),
  ('Alec Bailey', 15, 119, 0, 11, 25, 155, 21, 7),
  ('jireh Wright', 5, 117, 12, 9, 20, 39, 1, 2),
  ('Michael Schuchard', 21, 110, 14, 11, 16, 63, 16, 14),
  ('Steven Paulino', 12, 109, 14, 9, 12, 42, 12, 1),
  ('JOE BRADFORD', 14, 105, 0, 11, 21, 81, 11, 4),
  ('Antonio Bentley', 9, 103, 9, 12, 19, 71, 15, 7),
  ('Bryan Ayotte', 9, 100, 7, 16, 29, 78, 5, 3),
  ('Luis Figueroa', 14, 100, 7, 7, 12, 66, 4, 5),
  ('Robert Lee', 32, 100, 20, 3, 8, 56, 11, 5),
  ('Gary Arquines', 12, 97, 5, 31, 45, 63, 19, 4),
  ('Fred Han', 16, 95, 7, 8, 11, 48, 10, 1),
  ('Jomel Camilleri', 10, 93, 8, 10, 15, 52, 13, 0),
  ('Justin Tam', 6, 93, 7, 21, 26, 34, 4, 3),
  ('Simon Uche', 6, 103, 7, 18, 28, 25, 11, 2),
  ('Richard Lyles', 7, 92, 1, 7, 16, 47, 10, 9),
  ('Ace Jordan', 6, 91, 7, 14, 25, 64, 8, 4),
  ('Troy Stewart', 15, 91, 15, 5, 11, 54, 14, 0),
  ('Devonte Carr', 13, 89, 1, 10, 21, 80, 6, 2),
  ('Byron Washington', 13, 88, 6, 13, 19, 52, 11, 0),
  ('Hector Martinez', 7, 88, 28, 0, 0, 37, 14, 0),
  ('Julio Garibay', 23, 87, 1, 0, 0, 64, 12, 1),
  ('Eugene Irvin', 8, 86, 15, 6, 18, 32, 3, 0),
  ('Wesley Duran', 15, 86, 19, 3, 10, 54, 9, 0),
  ('gared almazan', 5, 84, 16, 12, 16, 12, 5, 0),
  ('Koby Baez', 7, 84, 10, 6, 15, 30, 3, 0),
  ('olisa okafor', 4, 83, 9, 4, 7, 34, 11, 2),
  ('Phil Washington', 9, 82, 7, 3, 7, 35, 11, 1),
  ('Alex Kono', 29, 80, 4, 0, 0, 96, 12, 0),
  ('Elias Etaat', 6, 95, 10, 11, 17, 41, 3, 1),
  ('Dino Martinez', 14, 76, 1, 3, 18, 82, 10, 5),
  ('Terrell Hendricks', 8, 76, 10, 12, 20, 66, 12, 7),
  ('Xavier Martinez', 22, 76, 1, 5, 15, 115, 13, 2),
  ('Jay Anderson', 4, 75, 21, 4, 5, 17, 4, 2),
  ('Shane Carney', 6, 75, 13, 8, 18, 16, 12, 0),
  ('Joey Hernandez', 9, 71, 12, 13, 9, 26, 7, 2),
  ('Ricky Milton', 15, 71, 8, 1, 5, 40, 8, 1),
  ('Shant Megerdichian', 43, 73, 9, 3, 6, 104, 35, 4),
  ('Lenroy Butler', 5, 70, 9, 9, 14, 38, 9, 0),
  ('Angel Medrano', 11, 69, 8, 7, 13, 41, 17, 2),
  ('Sean Burdette', 5, 69, 9, 8, 10, 41, 2, 5),
  ('Steven Duran', 14, 69, 12, 4, 4, 57, 7, 2),
  ('Tyler Kimura', 12, 69, 8, 12, 21, 31, 6, 1),
  ('Ben Sy', 7, 72, 9, 5, 13, 15, 4, 0),
  ('Kevin Behan', 6, 68, 3, 4, 15, 33, 9, 0),
  ('Sivad Shaw', 13, 67, 1, 3, 12, 96, 7, 3),
  ('Louis Rodriguez', 5, 66, 10, 5, 12, 26, 5, 1),
  ('Anthony Tipton', 7, 65, 11, 8, 18, 24, 10, 1),
  ('Peter Winningham', 4, 76, 3, 19, 22, 21, 5, 0),
  ('Arthell Bonton', 4, 64, 15, 9, 12, 19, 10, 2),
  ('Daniel Morales', 6, 64, 4, 10, 13, 20, 3, 0),
  ('Eric Mooney', 22, 64, 15, 2, 3, 39, 6, 2),
  ('hector chavez', 3, 64, 13, 1, 2, 8, 14, 0),
  ('Mark Horeses-Reyes', 15, 64, 9, 5, 10, 54, 15, 1),
  ('Ryan Simpson', 8, 64, 6, 17, 29, 28, 4, 1),
  ('Michael Montoya', 9, 63, 3, 8, 15, 77, 12, 9);

-- ---------- Data: league awards (5) ----------
insert into awards (name, awards, sort_order) values
  ('Hudson Guagliano', array['5× League MVP', '4× Champion', '9× Week MVP', 'All-Time Points Leader', 'Points Per Game Leader'], 1),
  ('Sasoon Abramian', array['2× League MVP', '2× Week MVP', 'All-Time Rebounds Per Game Leader'], 2),
  ('Sonnee Wilson', array['All-Time 3-Pointers Leader'], 3),
  ('Jeff Hector', array['4× Champion', '2× League MVP', 'All-Time Steals Leader'], 4),
  ('Toine Bett', array['All-Time Blocks Leader', '1× Champion'], 5);

-- ---------- Data: regular season (8 weeks) ----------
insert into game_days (season, kind, week, date, mvp, sort_order) values ('Fall 2026', 'regular', 1, '2026-09-28', 'Dustin Gratto (MonStars), 20 pts 6 rebs', 1);
insert into games (game_day_id, time, team1, score1, team2, score2, result, notes, sort_order)
select d.id, g.time, g.team1, g.score1, g.team2, g.score2, g.result, g.notes, g.sort_order
from game_days d, (values
  ('7:00 PM', 'MonStars', 64, 'Xiao Long Ballers', 44, null::text, null::text[], 1),
  ('8:00 PM', 'Sniper Elite!', 86, 'K1 MASHERS', 45, null::text, null::text[], 2),
  ('9:00 PM', 'Lago Boys', 73, 'YUNG HOOPAS', 57, null::text, null::text[], 3)
) as g (time, team1, score1, team2, score2, result, notes, sort_order)
where d.season = 'Fall 2026' and d.kind = 'regular' and d.week = 1;

insert into game_days (season, kind, week, date, mvp, sort_order) values ('Fall 2026', 'regular', 2, '2026-10-05', 'Predrag Stevcic (Lago Boys), 16 pts 6 rebs 1 blk', 2);
insert into games (game_day_id, time, team1, score1, team2, score2, result, notes, sort_order)
select d.id, g.time, g.team1, g.score1, g.team2, g.score2, g.result, g.notes, g.sort_order
from game_days d, (values
  ('7:00 PM', 'Lago Boys', 65, 'MonStars', 60, null::text, null::text[], 1),
  ('8:00 PM', 'Sniper Elite!', 59, 'Xiao Long Ballers', 46, null::text, null::text[], 2),
  ('9:00 PM', 'YUNG HOOPAS', 64, 'K1 MASHERS', 42, null::text, null::text[], 3)
) as g (time, team1, score1, team2, score2, result, notes, sort_order)
where d.season = 'Fall 2026' and d.kind = 'regular' and d.week = 2;

insert into game_days (season, kind, week, date, mvp, sort_order) values ('Fall 2026', 'regular', 3, '2026-10-12', 'Bacari Green (MonStars), 26 pts 5 rebs', 3);
insert into games (game_day_id, time, team1, score1, team2, score2, result, notes, sort_order)
select d.id, g.time, g.team1, g.score1, g.team2, g.score2, g.result, g.notes, g.sort_order
from game_days d, (values
  ('7:00 PM', 'MonStars', 59, 'K1 MASHERS', 56, null::text, null::text[], 1),
  ('8:00 PM', 'Sniper Elite!', 44, 'YUNG HOOPAS', 41, null::text, null::text[], 2),
  ('9:00 PM', 'Lago Boys', 55, 'Xiao Long Ballers', 49, null::text, null::text[], 3)
) as g (time, team1, score1, team2, score2, result, notes, sort_order)
where d.season = 'Fall 2026' and d.kind = 'regular' and d.week = 3;

insert into game_days (season, kind, week, date, mvp, sort_order) values ('Fall 2026', 'regular', 4, '2026-10-19', 'Hudson Guagliano (Lago Boys), 30 pts 2 rebs', 4);
insert into games (game_day_id, time, team1, score1, team2, score2, result, notes, sort_order)
select d.id, g.time, g.team1, g.score1, g.team2, g.score2, g.result, g.notes, g.sort_order
from game_days d, (values
  ('7:00 PM', 'MonStars', 55, 'YUNG HOOPAS', 52, null::text, null::text[], 1),
  ('8:00 PM', 'Sniper Elite!', 56, 'Lago Boys', 60, null::text, null::text[], 2),
  ('9:00 PM', 'K1 MASHERS', 34, 'Xiao Long Ballers', 35, null::text, null::text[], 3)
) as g (time, team1, score1, team2, score2, result, notes, sort_order)
where d.season = 'Fall 2026' and d.kind = 'regular' and d.week = 4;

insert into game_days (season, kind, week, date, mvp, sort_order) values ('Fall 2026', 'regular', 5, '2026-10-26', 'Ben Sy (Sniper Elite!), 28 pts 3 rebs', 5);
insert into games (game_day_id, time, team1, score1, team2, score2, result, notes, sort_order)
select d.id, g.time, g.team1, g.score1, g.team2, g.score2, g.result, g.notes, g.sort_order
from game_days d, (values
  ('7:00 PM', 'Lago Boys', 78, 'K1 MASHERS', 51, null::text, null::text[], 1),
  ('8:00 PM', 'MonStars', 55, 'Sniper Elite!', 76, null::text, null::text[], 2),
  ('9:00 PM', 'Xiao Long Ballers', 47, 'YUNG HOOPAS', 49, null::text, null::text[], 3)
) as g (time, team1, score1, team2, score2, result, notes, sort_order)
where d.season = 'Fall 2026' and d.kind = 'regular' and d.week = 5;

insert into game_days (season, kind, week, date, mvp, sort_order) values ('Fall 2026', 'regular', 6, '2026-11-02', 'Nathan Dimacali (Lago Boys), 17 pts 17 rebs 2 stls', 6);
insert into games (game_day_id, time, team1, score1, team2, score2, result, notes, sort_order)
select d.id, g.time, g.team1, g.score1, g.team2, g.score2, g.result, g.notes, g.sort_order
from game_days d, (values
  ('7:00 PM', 'YUNG HOOPAS', 54, 'MonStars', 79, null::text, null::text[], 1),
  ('8:00 PM', 'Sniper Elite!', 65, 'K1 MASHERS', 45, null::text, null::text[], 2),
  ('9:00 PM', 'Xiao Long Ballers', 84, 'Lago Boys', 91, null::text, null::text[], 3)
) as g (time, team1, score1, team2, score2, result, notes, sort_order)
where d.season = 'Fall 2026' and d.kind = 'regular' and d.week = 6;

insert into game_days (season, kind, week, date, mvp, sort_order) values ('Fall 2026', 'regular', 7, '2026-11-09', 'Simon Uche (MonStars), 26 pts 3 rebs 2 stls', 7);
insert into games (game_day_id, time, team1, score1, team2, score2, result, notes, sort_order)
select d.id, g.time, g.team1, g.score1, g.team2, g.score2, g.result, g.notes, g.sort_order
from game_days d, (values
  ('7:00 PM', 'K1 MASHERS', 52, 'YUNG HOOPAS', 63, null::text, null::text[], 1),
  ('8:00 PM', 'Sniper Elite!', 58, 'Lago Boys', 49, null::text, null::text[], 2),
  ('9:00 PM', 'Xiao Long Ballers', 48, 'MonStars', 72, null::text, null::text[], 3)
) as g (time, team1, score1, team2, score2, result, notes, sort_order)
where d.season = 'Fall 2026' and d.kind = 'regular' and d.week = 7;

insert into game_days (season, kind, week, date, mvp, sort_order) values ('Fall 2026', 'regular', 8, '2026-11-16', 'Nathan Dimacali (Lago Boys), 34 pts 10 3PM 2 rebs 2 stls', 8);
insert into games (game_day_id, time, team1, score1, team2, score2, result, notes, sort_order)
select d.id, g.time, g.team1, g.score1, g.team2, g.score2, g.result, g.notes, g.sort_order
from game_days d, (values
  ('7:00 PM', 'Xiao Long Ballers', 0, 'YUNG HOOPAS', 2, 'forfeit', null::text[], 1),
  ('8:00 PM', 'Sniper Elite!', 52, 'MonStars', 59, null::text, null::text[], 2),
  ('9:00 PM', 'Lago Boys', 76, 'K1 MASHERS', 57, null::text, null::text[], 3)
) as g (time, team1, score1, team2, score2, result, notes, sort_order)
where d.season = 'Fall 2026' and d.kind = 'regular' and d.week = 8;

-- ---------- Data: playoffs (3 rounds) ----------
insert into game_days (season, kind, round, date, note, sort_order) values ('Fall 2026', 'playoff', 'Quarterfinals', '2026-11-23', 'First-round byes: #1 Lago Boys, #2 Sniper Elite!', 9);
insert into games (game_day_id, time, team1, score1, team2, score2, result, notes, sort_order)
select d.id, g.time, g.team1, g.score1, g.team2, g.score2, g.result, g.notes, g.sort_order
from game_days d, (values
  ('7:00 PM', '#3 MonStars', 88, '#6 K1 MASHERS', 73, null::text, array['Advanced to semifinals vs #2 Sniper Elite!', 'Eliminated'], 1),
  ('8:00 PM', '#4 YUNG HOOPAS', 59, '#5 Xiao Long Ballers', 54, null::text, array['Advanced to semifinals vs #1 Lago Boys', 'Eliminated'], 2)
) as g (time, team1, score1, team2, score2, result, notes, sort_order)
where d.season = 'Fall 2026' and d.kind = 'playoff' and d.round = 'Quarterfinals';

insert into game_days (season, kind, round, date, note, sort_order) values ('Fall 2026', 'playoff', 'Semifinals', '2026-11-30', null, 10);
insert into games (game_day_id, time, team1, score1, team2, score2, result, notes, sort_order)
select d.id, g.time, g.team1, g.score1, g.team2, g.score2, g.result, g.notes, g.sort_order
from game_days d, (values
  ('7:00 PM', '#1 Lago Boys', null::int, '#4 YUNG HOOPAS', null::int, null::text, null::text[], 1),
  ('8:00 PM', '#2 Sniper Elite!', null::int, '#3 MonStars', null::int, null::text, null::text[], 2)
) as g (time, team1, score1, team2, score2, result, notes, sort_order)
where d.season = 'Fall 2026' and d.kind = 'playoff' and d.round = 'Semifinals';

insert into game_days (season, kind, round, date, note, sort_order) values ('Fall 2026', 'playoff', 'Championship', '2026-11-30', 'Winners of both semifinals', 11);
insert into games (game_day_id, time, team1, score1, team2, score2, result, notes, sort_order)
select d.id, g.time, g.team1, g.score1, g.team2, g.score2, g.result, g.notes, g.sort_order
from game_days d, (values
  ('9:00 PM', 'TBD', null::int, 'TBD', null::int, null::text, null::text[], 1)
) as g (time, team1, score1, team2, score2, result, notes, sort_order)
where d.season = 'Fall 2026' and d.kind = 'playoff' and d.round = 'Championship';

commit;

-- ---------- Check ----------
-- After running, these counts should be:
--   season_players 55, career_players 101, awards 5, game_days 11, games 29
select
  (select count(*) from season_players) as season_players,
  (select count(*) from career_players) as career_players,
  (select count(*) from awards)         as awards,
  (select count(*) from game_days)      as game_days,
  (select count(*) from games)          as games;
