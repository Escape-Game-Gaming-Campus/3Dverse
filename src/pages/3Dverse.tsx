import { useCallback, useEffect, useState } from 'react';
import { useScript } from '@uidotdev/usehooks';
import AppConfig from '../_3dverseEngine/AppConfig.json';
import { _SDK3DVerse } from '../_3dverseEngine/declare';
import './3Dverse.scss';
import { InventoryReact } from '../components/inventory';
import pusherChannels from '../constants/pusherChannels';
import bluringCanvas from '../utils/blur';
import { Character } from "../components/character";
import Digicode from '../components/enigms/ddust2/digicode';
import { SDK3DVerse_ExtensionInterface } from '../_3dverseEngine/declareGlobal';

declare const SDK3DVerse: typeof _SDK3DVerse;
declare const Pusher: any;
export var channel = new Map<pusherChannels, any>();
declare const SDK3DVerse_VirtualJoystick_Ext: SDK3DVerse_ExtensionInterface;

export const Canvas3Dverse = () => {
  const [digicodeOpen, setDigicodeOpen] = useState(false);
  const [totoroRoom, setTotoroRoom] = useState(false);
  const [code, setCode] = useState("");
  const actualCode = "00000";

  const statusPusher = useScript(
    `https://js.pusher.com/8.2.0/pusher.min.js`,
    {
      removeOnUnmount: false,
    }
  );

  const status3Dverse = useScript(
    `https://cdn.3dverse.com/legacy/sdk/latest/SDK3DVerse.js`,
    {
      removeOnUnmount: false,
    }
  );

  function updateClient() {
    setTimeout(() => {
      fetch(`${AppConfig.API_HOST}:${AppConfig.API_PORT}/update`)
        .then((response) => response.json())
        .then((data) => { })
        .catch(error => console.error('Error:', error));
    }, 100);
  }

  async function pusherInit() {
    Pusher.logToConsole = true;

    var pusher = new Pusher('39f939b9f53716caf5d8', {
      cluster: 'eu'
    });

    channel.set(pusherChannels.DEV, pusher.subscribe(pusherChannels.DEV));
    channel.set(pusherChannels.INVENTORY, pusher.subscribe(pusherChannels.INVENTORY));
    channel.set(pusherChannels.ENIGMS, pusher.subscribe(pusherChannels.ENIGMS));
    channel.get(pusherChannels.DEV).bind('helloWorld', function (data: object) {
      console.log("PUSHER : ", JSON.stringify(data));
    });
  }

  const initApp = useCallback(async () => {
    const character = new Character(SDK3DVerse);
    await SDK3DVerse.joinOrStartSession({
      userToken: AppConfig.USER_TOKEN,
      sceneUUID: AppConfig.SCENE_UUID,
      canvas: (document.getElementById('display-canvas') as HTMLElement),
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
    if (statusPusher === 'ready') {
      pusherInit();
    }
  }, [statusPusher]);

  useEffect(() => {
    if (status3Dverse === 'ready') {
      initApp();
      bluringCanvas();
    }
  }, [status3Dverse]);
  
  const handleDigicodeClick = () => {
    if (digicodeOpen){

      handleCloseDigicode();
      bluringCanvas(0);
    } else {
      setDigicodeOpen(true);
      bluringCanvas(25);
    }
  };

  const handleCloseDigicode = () => {
    setDigicodeOpen(false);
  };

  const handleDigitPress = (digit: any) => {
  }

  useEffect(() => {
    if (status3Dverse === 'ready' && statusPusher === 'ready') {
      updateClient();
    }
  }, [status3Dverse, statusPusher]);

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
    status3Dverse === 'ready' && statusPusher === 'ready' ?
      <>
        <canvas id='display-canvas' style={{
          width: '1920px',
          height: '1080px'
        }} tabIndex={1} />
        {console.log(code)}
        {totoroRoom ? console.log("ouvert :D") : console.log("fermé D:")}
        {/* <div style={{ position: 'absolute', bottom: "48px", left: "48px", zIndex: 999 }}>
    <Joystick size={150} move={handleJoystickMove} start={handleJoystickStart} stop={handleJoystickStop} />
  </div> */}
        <div>
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 999 }}>
            {totoroRoom ? <></> : (<button onClick={handleDigicodeClick}>Open Digicode</button>)}

            {digicodeOpen && (
              <Digicode onClose={handleCloseDigicode} setCode={setCode} onDigitPress={handleDigitPress} />
            )}
          </div>
        </div>
        <div>
          <InventoryReact />
        </div>
      </>
      : <></>
  );
};