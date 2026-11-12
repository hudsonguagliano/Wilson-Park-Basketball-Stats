# Wilson-Park-Basketball-Stats
This is an app for Wilson Park Mens basketball league on Monday stats. 
Spec:
Wilson Park Stats
A phone-friendly stats app for the Wilson Park adult rec basketball league.
Who it's for
Players in the league (6 teams, 55 players), who want to check their numbers and how they stack up, usually from their phone right after a game.
The league organizer, who could share one clean link with everyone.
The problem
The league (Torrance Basketball, Monday, Fall 2026 Open Division) already posts stats on LASportsNet: 6 teams and 55 players. But the stats page is a generic template the company uses for every sport, and it's a poor fit for basketball on a phone:
Totals only. It shows season totals (GP, points, 3s, FTM, FTA, rebounds, blocks, steals). No per-game averages, so a player with 7 games and one with 4 can't be compared fairly.
No free throw percentage. It lists FTM and FTA, but you have to do the math yourself.
Hard to use on a phone. On a phone screen only about 4 columns fit; you have to swipe sideways to see the rest, and the 55 players are split across 3 pages.
What version 1 does
Phone-first stat table. Every player's per-game averages (points, rebounds, steals, blocks, 3s) and free throw percentage, readable on a phone without sideways scrolling.
Player cards. Tap a player to see their season on one screen: totals, averages, and FT%.
League leaders. Top players in each category, ranked by per-game average.
Team filter. Show only one team's players.
Data for version 1 is copied in from the LASportsNet stats page. TODO: ask the league if the app can pull stats from their site automatically.
Next features (after version 1 is live)
Monday Night History tab. The league keeps career stats for every player who has ever played Monday nights (326 players across 14 pages, totals only). The app would show all-time leaders by category, career per-game averages (with a minimum-games rule so a 1-game player can't top the list), and each player's career card.
MVP and awards leaders. TODO: look at the league's MVP page and decide what to show.
What version 1 does NOT do
No entering stats. The league keeps recording stats the way it does now.
No logins or accounts. Anyone with the link can view.
No live scoring during games. Stats are entered after the game.
No schedules, standings, or playoff brackets.
No phone app. It's a website that works on a phone browser.
These can come in later versions once real users ask for them.
How we'll know it's working
At least 5 players in the league use it to look up their stats.
A player can find their own averages and FT% on a phone in under 10 seconds.
Every number matches the LASportsNet stats page.
People
Builder: Hudson
League contact: TODO (who runs the league or records stats?)
