import { useState, useEffect } from 'react';
import './DisplayRank.css';

let ghostTimer = 0;

//displays the live rankings of the ghost and the user
//displays the user's words per minute
function DisplayRank({ currentWord, currentTime, sampleAmount, ghostFinish}) {
  //ghostProgress is ghost completion percentage
  const [ghostProgress, setGhostProgress] = useState(0.0);
  //winner is either -1 (ghost), 0 (no one yet), or 1 (user)
  const [winner, setWinner] = useState(0);

  //starts ghostTimer
  useEffect (() => {
    ghostTimer = performance.now();
  }, []);

  //increments ghostProgress every second
  //has certain checks
    //makes sur ghostProgress isn't over 100%
    //sets winner
  useEffect(()=>{
      if (ghostProgress < 1) {
        let myInterval = setInterval(() => {
              //55 is the Ghost wpm
              //60 is 60 seconds in a minute
              console.log('before' + ghostProgress);
              setGhostProgress(((55/60)/sampleAmount) + ghostProgress); 
              console.log(ghostProgress);
              if (ghostProgress > (1 - ((55/60)/sampleAmount))) {
                setGhostProgress(1);
                let ghostTimerDone = performance.now();
                console.log('DisplayRank ghostTime:  ' + ghostTimerDone - ghostTimer);
                ghostFinish(ghostTimerDone - ghostTimer);
                if (ghostProgress > ((currentWord) / (sampleAmount))) {
                  setWinner(-1);
                }
                else {
                  setWinner(1);
                }
              }
              console.log(ghostProgress);
            }, 1000)
            return ()=> {
                clearInterval(myInterval);
            };
      }
  });

  console.log ('currentWord: ' + currentWord);
  console.log( 'current time: ' + currentTime);
  console.log('outside' + ghostProgress);
  console.log(((currentWord) / (sampleAmount)));
  //has certain checks
    //makes sur ghostProgress isn't over 100%
    //sets winner
    //I dont know why I have to do it again but it just seems to work
  if (ghostProgress > 1) {
    setGhostProgress(1);
    let ghostTimerDone = performance.now();
    console.log('DisplayRank ghostTime:  ' + ghostTimerDone - ghostTimer);
    ghostFinish(ghostTimerDone - ghostTimer);
    if (ghostProgress > ((currentWord) / (sampleAmount))) {
      setWinner(-1);
    }
    else {
      setWinner(1);
    }
    console.log('here');
  }

  //returns the rankings based off whether the ghostProgress or the user progress was further

  return (
    <div className="rankingBox">
      { ((currentWord) / (sampleAmount)) > ghostProgress || winner === 1
        ? 
        <div className="displayRanksBox">
          <div className="playerStatsBoxUser">
            <div className="playerTitle">You</div>
            <div className="playerCompletion">{(Math.floor((currentWord / (sampleAmount)) * 100) > 100)
                 ? 100
                 : Math.floor((currentWord / (sampleAmount)) * 100)
            }%</div>
            <div className="playerWPM">{currentWord === 0
            ? 0
            : Math.floor((currentWord / (currentTime / 1000)) * 60)} WPM</div>
          </div>
          <div className="playerStatsBoxGhost">
            <div className="playerTitle">Ghost</div>
            <div className="playerCompletion">{Math.floor(ghostProgress * 100) > 100
                  ? 100 
                  : Math.floor(ghostProgress * 100)}%</div>
            <div className="playerWPM">35 WPM</div>
          </div>
        </div>
        :
        <div className="displayRanksBox">
          <div className="playerStatsBoxGhost">
            <div className="playerTitle">Ghost</div>
            <div className="playerCompletion">{Math.floor(ghostProgress * 100) > 100
                  ? 100 
                  : Math.floor(ghostProgress * 100)}%</div>
            <div className="playerWPM">35 WPM</div>
          </div>
          <div className="playerStatsBoxUser">
            <div className="playerTitle">You</div>
            <div className="playerCompletion">{(Math.floor((currentWord / (sampleAmount)) * 100) > 100)
                 ? 100
                 : Math.floor((currentWord / (sampleAmount)) * 100)
            }%</div>
            <div className="playerWPM">{currentWord === 0
            ? 0
            : Math.floor((currentWord / (currentTime / 1000)) * 60)} WPM</div>
          </div>
        </div>
      }
      <div className="ranksBox">
        <div className="placement">1</div>
        <div className="placement">2</div>
      </div>
    </div>
  );
}

export default DisplayRank;