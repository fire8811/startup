import React from 'react';
import './leaderboard.css';

export function Leaderboard(){
  const [topScores, setTopScores] = React.useState([]);
  const [allScores, setAllScores] = React.useState([]);
  const [count, updateCount] = React.useState({});
  const [date, updateDate] = React.useState({});

  React.useEffect(()=>{
    fetch('api/scores')
      .then((response) => response.json())

      .then((scoreData) => {
        setTopScores(scoreData.topScores)
        setAllScores(scoreData.allScores)
      });
  }, []);

  console.log(topScores);
  console.log(allScores);

  const rows = [];
  if (topScores.length){
    for(const [i, score] of topScores.entries()) {
      rows.push(
        <tr key={i}>
          <td>{i+1}</td>
          <td>{score.name}</td>
          <td>{score.score}</td>
          <td>{score.time}</td>
          <td>{(count[score.score] - 1) || '--'}</td>
          {/* <td>{date[score.score] || '--'} </td> */}
        </tr>
      );
    }
  } 

  React.useEffect(()=>{ //display how many times a score has been scored and how recent
    if (allScores.length) {
      const scoreCounts = {};
      const scoreDates = {};

      topScores.forEach((topScore) => { //filter through all topScores and then allScores (pretty ineffecient)
        let scoreFrequency = 0;
        let mostRecentDateScored = null

        allScores.forEach(score => {
          if (score.score === topScore.score) scoreFrequency++; //score match, so increase count

          if (!mostRecentDateScored || new Date(score.date) > new Date(mostRecentDateScored)){
            mostRecentDateScored = score.date;
          }
        });
        console.log(`Most recent date: ${mostRecentDateScored}`);
        scoreCounts[topScore.score] = scoreFrequency;
        scoreDates[topScore.score] = mostRecentDateScored || topScore.date;
        
      });
      updateCount(scoreCounts);
      updateDate(scoreDates);
    }
  }, [topScores, allScores]);

    return (
        <main className="container-fluid bg-secondary text-center p-5">  
          <h3> Top Scores </h3>
          <table className="table">
            <thead>
              <tr>
                <th>Place</th>
                <th>Name</th>
                <th>Score</th>
                <th>When</th>
                <th>Ties</th>
                {/* <th>Most Recent</th> */}
              </tr>
            </thead>
            <tbody id='scores'>{rows}</tbody>
          </table>
        </main>
    );
}