import React, { useState } from 'react';
import './digicode.scss';
import bluringCanvas from '../../../utils/blur';
interface DigicodeProps {
  onClose: () => void;
  onDigitPress: (digit: string) => void;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}

const Digicode: React.FC<DigicodeProps> = ({ onClose, onDigitPress, setCode }) => {
  const [enteredCode, setEnteredCode] = useState('CODE');

  const handleDigitPress = (digit: string) => {
    if (enteredCode === 'CODE') {
        setEnteredCode(digit);
        onDigitPress(digit);
    }
    else if (enteredCode.length < 4) {
      setEnteredCode(enteredCode + digit);
      onDigitPress(digit);
    }
  };

  const handleClear = () => {
    setEnteredCode('CODE');
  };

  const handleSubmit = () => {
    setCode(enteredCode);
    onClose();
    bluringCanvas();
  };

  return (
    <div className="digicode">
      <div className="code-display">{enteredCode}</div>
      <div className="button-container">
        <div className="row">
          <button className="digicode-button" onClick={() => handleDigitPress('1')}>1</button>
          <button className="digicode-button" onClick={() => handleDigitPress('2')}>2</button>
          <button className="digicode-button" onClick={() => handleDigitPress('3')}>3</button>
        </div>
        <div className="row">
          <button className="digicode-button" onClick={() => handleDigitPress('4')}>4</button>
          <button className="digicode-button" onClick={() => handleDigitPress('5')}>5</button>
          <button className="digicode-button" onClick={() => handleDigitPress('6')}>6</button>
        </div>
        <div className="row">
          <button className="digicode-button" onClick={() => handleDigitPress('7')}>7</button>
          <button className="digicode-button" onClick={() => handleDigitPress('8')}>8</button>
          <button className="digicode-button" onClick={() => handleDigitPress('9')}>9</button>
        </div>
        <div className="row">
          <button className="digicode-button" onClick={() => handleDigitPress('0')}>0</button>
        </div>
        <div className="row">
          <button className="digicode-button" onClick={handleClear}>Clear</button>
          <button className="digicode-button" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Digicode;