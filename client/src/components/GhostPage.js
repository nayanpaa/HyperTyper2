import { useState } from 'react';
import TypeWord from './TypeWord';
import DisplayRank from './DisplayRank';
import Timer from './Timer';
import './GhostPage.css';

function GhostPage() {
  //make CurrentWord a piece of state
  //Current word is 0 indexed
  //the word that the user is on
  const [currentWord, setCurrentWord] = useState(0);
  //current time
  const [currentTime, setCurrentTime] = useState(0);
  //show input box
  const [showInput, setShowInput] = useState(false);
  //some weird logic I have to show stats and input
  const [balance, setBalance] = useState(true);
  //bool for when ghost ends
  const [ghostEnd, setGhostEnd] = useState(false);
  //time for when ghost ends
  const [ghostTime, setGhostTime] = useState(0);
  //time for when user ends
  const [userTime, setUserTime] = useState(0);
  
  document.body.style = 'background-color: rgb(47, 47, 47);';

  //text sample
  const textForDisplay = {
    numWords: 30,
    textSample: [
      "Four ", "score ", "and ", "seven ", "years ", "ago ", "our ", 
      "fathers ", "brought ", "forth ", "on " , "this ", "continent, ", 
      "a ", "new ", "nation, ", "conceived ", "in ", "Liberty, ", "and ", 
      "dedicated ", "to ", "the ", "proposition ", "that ", "all ", "men ", 
      "are ", "created ", "equal."
    ]
  };

  //increments or decrements the word count based on the direction
  const nextWord = (direction, time) => {
    if (direction) {
      console.log('nextWord time: ' + time);
      setCurrentWord(currentWord + 1);
      setCurrentTime(time);
      console.log('nextWord' + currentWord);
      //currentword time
      console.log('nextWord time ' + currentTime);
    } else if (currentWord > 0) {
      setCurrentWord(currentWord - 1);
    }//UNLESS CURRWORD IS 0
    
    console.log("nextWord currWord:" + currentWord);
  };

  //when the user finishes
  const handleEnd = () => {
    console.log('time ended');
    setShowInput(true);
  };

  //shows the text sample, each completed word is green
  const renderedText = textForDisplay.textSample.map((word, i) => {
   // return <div className="text">{word}</div>;
    if (i < currentWord) {
      return <pre className="completedText" key={i}>{word}</pre>;
    } else {
      return <pre className="text" key={i}>{word}</pre>;
    }
  });

  //when the user finished
  const handleFinish = (time) => {
    setUserTime(time);
    setBalance(false);
    console.log('user time: ' + userTime);
  };

  //when the ghost finished
  const handleGhostFinish = (time1) => {
    //setBalance(false);
    setGhostTime(time1);
    setGhostEnd(true);
    console.log('ghost time: ' + ghostTime);
  };

  return (
    <div>
      <div className="timerBox">
        <Timer initialMinute={0} initialSeconds={15} onEnd={handleEnd}/>
      </div>
      <div className="bigBoy">
        <div className="leftBox">
          <div className="textBox">{renderedText}</div>
          <div className="inputBox">
            { showInput && balance
              ? <TypeWord onComplete={nextWord} currentWord={currentWord} textForDisplay={textForDisplay} finished={handleFinish}/>
              : null 
            }
            {
              !balance && ghostEnd
              ? 
              <div className="finishStats"> 
                  <div className="finishName">Finished!</div>
                  <div className="finishTime">Ghost finished in: {Math.floor(ghostTime / 1000)} seconds</div>
                  <div className="finishTime">You finished in: {Math.floor(userTime / 1000)} seconds</div>
              </div>
              :null
            }
          </div>
        </div>
        <div className="podiumBox">
          { showInput
            ? <DisplayRank currentWord={currentWord} currentTime={currentTime} sampleAmount={textForDisplay.numWords} ghostFinish={handleGhostFinish}/>
            : 
            <div className="ranksBox">
              <div className="placement">1</div>
              <div className="placement">2</div>
          </div>
          }
        </div>
      </div>

    </div>
  );
}

export default GhostPage;