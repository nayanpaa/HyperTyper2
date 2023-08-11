import { useState, useEffect } from 'react';
import './TypeWord.css';

//Start Time
let t0 = 0;

function TypeWord({onComplete, currentWord, textForDisplay, finished}) {
  const [word, setWord] = useState('');
  //-1 wrong, 0 blank, 1 correct
  const [correct, setCorrect] = useState(0);
  //the current state of the word that the person is typing

  //start timer (t0)
  useEffect(() => {
    t0 = performance.now();
  }, []);

  //checks whether current word is right or not
  const checkWord = (mostUpdated) => {
    for (let i = 0; i < mostUpdated.length; ++i) {
      if (textForDisplay.textSample[currentWord][i] !== mostUpdated[i]) {
        setCorrect(-1);
        console.log('false');
        return false;
      }
      setCorrect(0);
    }

    //FOR DEV
    console.log(mostUpdated.length);
    console.log(textForDisplay.textSample[currentWord].length);
    
    //when the word is complete the input moves on to the next word
    if (mostUpdated.length === textForDisplay.textSample[currentWord].length) {
      console.log('true');
      const forward = true;

      //time from the beginning till the end of the completed word
      const tAfterWord = performance.now() - t0 ;

      //increments word count
      onComplete(forward, tAfterWord);

      //ends timer once the user completes the last word  
      if (currentWord === textForDisplay.numWords - 1) {
        const t1 = performance.now();
        console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
        //finished, sends end time to App
        finished(t1 - t0);
      }
      //empties input after the word is complete
      //when this is empty is when someone can go backwards
      setWord('');
      //if (currentWord === textForDisplay.numWords)
    }
  };//CHECKWORD

  //whenever the user backspace and the input is empty, the word count decrements to the previous word
  const handleKeyDown = event => {
    if (event.key === 'Backspace' && word.length === 0 && currentWord > 0) {  
      const forward2 = false;
      onComplete(forward2);

      //FOR DEV
      console.log("handleKey Word: " + currentWord);

      const backWord = textForDisplay.textSample[currentWord - 1]; // -1 is very sussy
      const numLetters = backWord.length;
      backWord.substring(0,numLetters - 1);
      setWord(backWord);

      //FOR DEV
      console.log('backy!');
    }
  }

  //handles any change in the input state
  const handleChange = (event) => {
    setWord(event.target.value);
    checkWord(event.target.value);
    
    //FOR DEV
    console.log("-" + event.target.value + "-");
    console.log("Which Word: " + currentWord);
    
  };//HANDLECHANGE

  return (
    <div>
      <div className="helpText">Type Here:</div>
      {
        correct === -1
        ? <input 
        className="wrong"
        type="text" 
        value={word} 
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoFocus
       />
       : <input 
       className="blank"
       type="text" 
       value={word} 
       onChange={handleChange}
       onKeyDown={handleKeyDown}
       autoFocus
      />
      }
      
    </div>
  );
}

export default TypeWord;