import React from 'react';
import './leaderboard.css';

export function Leaderboard(){
  const [topScores, setTopScores] = React.useState([]);
  const [allScores, setAllScores] = React.useState([]);
  const [count, updateCount] = React.useState(0);

  React.useEffect(()=>{
    fetch('api/scores')
      .then((response) => response.json())

      .then((scoreData) => {
        setTopScores(scoreData.topScores)
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
          <td>{count[score.score]}</td>
          <td>--</td>
        </tr>
      );
    }
  } 

  function processScoreCount(givenScore){
    updateCount(0);

    for(const [score] of allScores.entries()){
      if (score === givenScore){
        updateCount(count+1);
      }
    }
  }

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
                <th>Number of Times Scored</th>
                <th>Most Recent</th>
              </tr>
            </thead>
            <tbody id='scores'>{rows}</tbody>
          </table>
        </main>
    );
}