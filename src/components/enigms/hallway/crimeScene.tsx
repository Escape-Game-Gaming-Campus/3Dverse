import React, { useState } from 'react';
import './crimeScene.scss';
import bluringCanvas from '../../../utils/blur';

interface CrimeSceneProps {
  onClose: () => void;
  onPicturePress: (digit: string) => void;
  setCodeCrime: React.Dispatch<React.SetStateAction<string>>;
}

const CrimeScene: React.FC<CrimeSceneProps> = ({ onClose, onPicturePress, setCodeCrime }) => {
  const [picture1, setPicture1] = useState(1);
  const [picture2, setPicture2] = useState(1);
  const [picture3, setPicture3] = useState(1);
  const [picture4, setPicture4] = useState(1);

  const handlePicturePress = (digit: string, setPicture: React.Dispatch<React.SetStateAction<number>>) => {
    setPicture((prevNumber) => (prevNumber % 4) + 1);
    onPicturePress(digit);
  };

  const handleSubmit = () => {
    setCodeCrime(String(picture1)+String(picture2)+String(picture3)+String(picture4));
    onClose();
    bluringCanvas();
  };

  return (
    <div className="crimeScene">
        <button className="" onClick={()=>{onClose();bluringCanvas()}}>X</button>
      <div>
        <img src={`${picture1}.jpg`} alt={`Picture 1`} onClick={() => handlePicturePress('1', setPicture1)} />
        <div>1</div>
      </div>
      <div>
        <img src={`${picture2}.jpg`} alt={`Picture 2`} onClick={() => handlePicturePress('2', setPicture2)} />
        <div>2</div>
      </div>
      <div>
        <img src={`${picture3}.jpg`} alt={`Picture 3`} onClick={() => handlePicturePress('3', setPicture3)} />
        <div>3</div>
      </div>
      <div>
        <img src={`${picture4}.jpg`} alt={`Picture 4`} onClick={() => handlePicturePress('4', setPicture4)} />
        <div>4</div>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CrimeScene;
