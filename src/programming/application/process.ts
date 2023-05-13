export class Process{
  Descansa: number = -1;

  private GenerateRoundRobinOdd(numTeams: number): any{

    let n2 = (Number)((numTeams - 1) / 2);
    const results: number[][] = new Array(numTeams);
    for (let i = 0; i < numTeams; i++) {
        results[i] = new Array(numTeams);
    }

    let teams: number[] = [numTeams];
    for (let i = 0; i < numTeams; i++)
    {
        teams[i] = i;
    }

    // Start the rounds.
    for (var round = 0; round < numTeams; round++)
    {
      for (let i = 0; i < n2; i++)
      {
        let team1 = teams[n2 - i];
        let team2 = teams[n2 + i + 1];
        results[team1][round] = team2;
        results[team2][round] = team1;
      }

        // Set the team with the bye.
      results[teams[0]][round] = this.Descansa;

        // Rotate the array.
      teams = this.rotateArray(teams);
    }
    return results;
  }


  private GenerateRoundRobinEven(numTeams: number): any{
    // Generate the result for one fewer teams.
    const results = this.GenerateRoundRobinOdd(numTeams - 1);

    // Copy the results into a bigger array,
    // replacing the byes with the extra team.
    const results2: number[][] = new Array(numTeams);
    for (let i = 0; i < numTeams; i++) 
    {
      results2[i] = new Array(numTeams - 1);
    }

    //int[,] results2 = new int[numTeams, numTeams - 1];
    for (let team = 0; team < numTeams - 1; team++)
    {
        for (let round = 0; round < numTeams - 1; round++)
        {
          if (results[team][round] == this.Descansa){
            // Change the bye to the new team.
            results2[team][round] = numTeams - 1;
            results2[numTeams - 1][round] = team;
          }
          else
          {
            results2[team][round] = results[team][round];
          }
        }
      }

    return results2;
  }

  private rotateArray(teams: number[]): any {
    const tmp: number = teams[teams.length - 1];
    for (let i = teams.length - 1; i > 0; i--) {
      teams[i] = teams[i - 1];
    }
    teams[0] = tmp;
    return teams;
  }


  GenerateRoundRobin(numTeams: number): Promise<any>{
    if (numTeams % 2 == 0)
    {
      return this.GenerateRoundRobinEven(numTeams);
    }
    return this.GenerateRoundRobinOdd(numTeams);
  }
}