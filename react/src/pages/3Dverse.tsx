import { useCallback, useEffect ,useState } from 'react';
import { useScript } from '@uidotdev/usehooks';
import AppConfig from '../_3dverseEngine/AppConfig';
import { Joystick } from 'react-joystick-component'; 
import { _SDK3DVerse } from '../_3dverseEngine/declare';
import {Character} from "../components/character";
import './3Dverse.scss';
import { InventoryReact } from '../components/inventory';

declare const SDK3DVerse : typeof _SDK3DVerse;

export const Canvas3Dverse = () => {

  const status = useScript(
    `https://cdn.3dverse.com/legacy/sdk/latest/SDK3DVerse.js`,
    {
      removeOnUnmount : false,
    }
  );
  const [character1, setCharacter1] = useState<Character | null>(null);
  const [joystickActive, setJoystickActive] = useState(false);
  const [joystickDirection, setjoystickDirection] = useState("None");
  const initApp = useCallback(async () => {
    const character = new Character(SDK3DVerse);
    setCharacter1(character);
    await SDK3DVerse.joinOrStartSession({
      userToken : AppConfig.USER_TOKEN,
      sceneUUID : AppConfig.SCENE_UUID,
      canvas : (document.getElementById('display-canvas') as HTMLElement),
      // viewportProperties : {
      //   defaultControllerType : SDK3DVerse.controller_type.none,
      // },
      createDefaultCamera: false,
      startSimulation: "on-assets-loaded"
    });
    await character.InitFirstPersonController("92f7e23e-a3e3-48b1-a07c-cf5bff258374");
  }, []);
  const handleJoystickStart = () => {
    setJoystickActive(true);
  };

  const handleJoystickStop = () => {
    setJoystickActive(false);
  };
  const handleJoystickMove = (event: any) => {
    if (character1 && joystickDirection != event.direction) {
      console.log(event.direction);
      setjoystickDirection(event.direction);
    }
  };  
  const moveCharacter = () =>{
    //blabla
    console.log("test")
  }
  useEffect(() => {
    if (status === 'ready') {
      initApp();
    }
  }, [status]);

  return (
    <>
      <canvas id='display-canvas' style={{
          width: '1920px',
          height: '1080px'
      }} tabIndex={1}/>
      {/* <div id='UI'> */}
      <div style={{ position: 'absolute', bottom: "48px", left: "48px", zIndex: 999 }}>
        <Joystick size={150} move={handleJoystickMove} start={handleJoystickStart} stop={handleJoystickStop} />
        </div>
        {joystickActive?moveCharacter():<></>}
        {/* <InventoryReact/> */}
      {/* </div> */}
    </>
  );
};