import './App.css';
import React, { useState, useEffect } from 'react';
import Buttons from './Buttons';

function App() {

  const [but, setBut] = useState("")
  const [tog, setTog] = useState(true)

  useEffect(() => {
    const keyDownHandler = event => {
      
      let buttonPressed = Buttons.find(key => key.keyCode === event.code);
      if (buttonPressed){
        playSound(buttonPressed.buttonText, buttonPressed.url);
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);
  
  function playSound(name, url) {
    let sound = new Audio(url)
    sound.play(url)
    setBut(name)
  }

  // Toggler function to turn the drum machine ON or OFF
  function toggle(){
    setTog(!tog)
  }

  return (
    <div className="App">
     <div id="drum-machine">
      <div id="buttons-wrapper"> 
        {Buttons.map((button) => 
          <button 
          id={button.buttonName} 
          className={`btn btn-secondary drum-pad ${tog ? "" : "disabled"}`}
          key={button.id}
          onClick={()=>{playSound(button.buttonText, button.url)}}>
            {button.buttonName}
          </button>
        )}  
      </div>
      <div id="display">
        <button 
        className="btn btn-toggle" 
        onClick={() => toggle()}
        style={{backgroundColor: tog ? 'green' : 'red'}}>
          <b>{ tog ? ("ON") : ("OFF")}</b>
        </button>
        <div id="display-text">
          <h4>{ tog ? (but) : ("")}</h4>
        </div>
      </div>
     </div>
    </div>
  );
}

export default App;