import { useCallback, useEffect ,useState } from 'react';
import { useScript } from '@uidotdev/usehooks';
import AppConfig from '../_3dverseEngine/AppConfig';
// import { Joystick } from 'react-joystick-component'; 
import { _SDK3DVerse } from '../_3dverseEngine/declare';
import {Character} from "../components/character";
import './3Dverse.scss';
import { InventoryReact } from '../components/inventory';
import Digicode from '../components/digicode';
import { SDK3DVerse_ExtensionInterface } from '../_3dverseEngine/declareGlobal';

declare const SDK3DVerse : typeof _SDK3DVerse;
declare const SDK3DVerse_VirtualJoystick_Ext : SDK3DVerse_ExtensionInterface;

export const Canvas3Dverse = () => {
  const [digicodeOpen, setDigicodeOpen] = useState(false);

  const handleDigicodeClick = () => {
    if(digicodeOpen)
    handleCloseDigicode()
    else
    setDigicodeOpen(true);
  };

  const handleCloseDigicode = () => {
    setDigicodeOpen(false);
  };

  const handleDigitPress = (digit:any) => {
  }
  const [totoroRoom, setTotoroRoom] = useState(false);
  const [code,setCode] = useState("");
  const actualCode = "1234";
  const status = useScript(
    `https://cdn.3dverse.com/legacy/sdk/latest/SDK3DVerse.js`,
    {
      removeOnUnmount : false,
    }
  );
  const initApp = useCallback(async () => {
    const character = new Character(SDK3DVerse);
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
    SDK3DVerse.engineAPI.startSimulation();
    await character.InitFirstPersonController("92f7e23e-a3e3-48b1-a07c-cf5bff258374");
    const joysticksElement = document.getElementById('joysticks') as HTMLElement;
    await SDK3DVerse.installExtension(SDK3DVerse_VirtualJoystick_Ext, joysticksElement);
  }, []);
  useEffect(() => {
    if (status === 'ready') {
      initApp();
    }
  }, [status]);
  useEffect(() => {
    if (actualCode === code) {
      setTotoroRoom(true);
    }
  }, [code, actualCode]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const entities = await SDK3DVerse.engineAPI.findEntitiesByEUID("16a525a0-5892-4065-a11b-a94862c153a6");
        console.log(entities);
        if (totoroRoom && entities.length > 0) {
          const firstEntity = entities[0];
          await firstEntity.setGlobalTransform({ "position": [-80, 10, -20] });
          await firstEntity.setVisibility(false)
          // await SDK3DVerse.engineAPI.deleteEntities(entities);
        }
      } catch (error) {
        console.error("Error fetching entities:", error);
      }
    };

    fetchData();
  }, [totoroRoom]);

  return (
    <>
  <canvas id='display-canvas' style={{
      width: '1920px',
      height: '1080px'
  }} tabIndex={1} />
  {console.log(code)}
  {totoroRoom?console.log("ouvert :D"):console.log("fermé D:")}
  {/* <div style={{ position: 'absolute', bottom: "48px", left: "48px", zIndex: 999 }}>
    <Joystick size={150} move={handleJoystickMove} start={handleJoystickStart} stop={handleJoystickStop} />
  </div> */}
  <div>
<div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 999 }}>
  {totoroRoom?<></>:(<button onClick={handleDigicodeClick}>Open Digicode</button>)}

  {digicodeOpen && (
    <Digicode onClose={handleCloseDigicode} setCode={setCode} onDigitPress={handleDigitPress} />
  )}
</div>
</div>
  <div>
    <InventoryReact />
  </div>
</>
  );
};