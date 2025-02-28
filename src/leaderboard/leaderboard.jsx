import React from 'react';
import './leaderboard.css';

export function Leaderboard(){
  const [scores, setScores] = React.useState([]);

  React.useEffect(()=>{
    const scoresObj = localStorage.getItem('scores');
    if (scoresObj){
      setScores(JSON.parse(scoresObj));
    }
  }, []);

  const rows = [];
  if (scores.length){
    for(const [i, score] of scores.entries()) {
      rows.push(
        <tr key={i}>
          <td>{i+1}</td>
          <td>{score.name}</td>
          <td>{score.score}</td>
          <td>{score.time}</td>
        </tr>
      );
    }
  } else {
    <tr key='1'>
      <td colSpan='4'>Get First Place For Free</td>
    </tr>
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
                <th>How Late</th>
              </tr>
            </thead>
            <tbody id='scores'>{rows}</tbody>
          </table>
        </main>
    );
}