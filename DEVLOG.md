# Dev Log

## Week 2 Write-Up (Nov 19, 2026): Iterate, Break, and Learn to Read Code

### Cursor vs. Claude Code
I gave both tools the same task: add a back button to the Season
Leaders tab. Both did it well. The differences were in the experience:

- **Cursor** ran slowly and used up my free credits in under five
  minutes. The code it wrote was efficient, and with a paid plan it
  might be a strong option, but I couldn't get far with it.
- **Claude Code** was fast and precise and finished quickly without
  hitting any limits.

For now I prefer Claude Code for building features. I still use Cursor
as my code editor for reading and fixing code by hand.

### Hardest bug of the week
I planted a bug on purpose: the word `score2` was misspelled as
`scroe2` in the standings code.

**What broke:** the whole standings table disappeared from the site.

**How I found it:**
1. Opened Chrome's Console (Cmd + Option + J) and found the red error:
   `ReferenceError: scroe2 is not defined`
2. Read the stack trace. It pointed to `computeStandings` at
   `index.html:1002`, called from line 1015.
3. In Cursor, jumped to line 1002 (Ctrl + G), fixed the spelling, and
   saved (Cmd + S).
4. Reloaded Chrome (Cmd + R). The error was gone and the standings
   were back.

**What I learned:** one misspelled word stopped the entire standings
table from loading, because the code that builds the table stops as
soon as it hits an error. The stack trace shows exactly where the
crash happened (the top line) and what led there (the lines below).
Now I know how to go from an error message straight to the line
that's broken.

## Nov 18, 2026: Week 8 and final regular season

**What I shipped**
- Added the Week 8 results for all 6 teams (scores, winners and losers),
  including the YUNG HOOPAS vs. Xiao Long Ballers forfeit.
- Updated the standings to the final regular-season results and added
  the playoff bracket. #1 Lago Boys and #2 Sniper Elite! have byes, and
  the quarterfinals are 11/23.
- Updated player season stats through Week 8. These are final because
  the league doesn't track playoff stats.
- Added a Thanksgiving turkey 🦃 to the home page (comes down after the
  holiday).

**What I learned**
- How to read the code that builds the standings: it sets up a record
  for each team, reads every game on the schedule, counts wins, losses
  and forfeits, sorts teams by record and then point differential, and
  writes the table onto the page. It runs every time the page loads,
  so entering a score updates the standings automatically.
- How to check my data: I compared the site against LASportsNet, and
  used the Week 8 MVP line as a cross-check, which caught a 2-point
  mismatch.
- To get good results from Claude, I have to be specific about what I
  want, where it goes, and how I'll know it worked.
