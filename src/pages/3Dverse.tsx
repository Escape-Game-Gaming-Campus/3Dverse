import { useEffect, useState } from 'react';
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
import { BlocNoteReact } from '../components/blocNote';
import axios from 'axios';
import { Totoro } from '../components/enigms/totoro/totoro';
import { LoadingBar } from '../components/loadingBar';

declare const SDK3DVerse: typeof _SDK3DVerse;
declare const Pusher: any;
export var channel = new Map<pusherChannels, any>();
declare const SDK3DVerse_VirtualJoystick_Ext: SDK3DVerse_ExtensionInterface;

export const Canvas3Dverse = () => {
  const [digicodeOpen, setDigicodeOpen] = useState(false);
  const [totoroRoom, setTotoroRoom] = useState(false);
  const [code, setCode] = useState("");  
  const [ready, setReady] = useState(false);
  const [load3Dverse, setLoad3Dverse] = useState(false);
  const totoro = new Totoro(AppConfig._3DVERSE.TOTORO_S_KEY);
  console.debug(totoro.itemUUID);

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
      fetch(`${AppConfig.API.HOST}:${AppConfig.API.PORT}/update`)
        .then((response) => response.json())
        .then((data) => { })
        .catch(err => {});
    }, 1000);
  }

  async function pusherInit() {
    Pusher.logToConsole = false;

    var pusher = new Pusher(AppConfig.PUSHER.KEY, {
      cluster: 'eu'
    });

    for (const value in pusherChannels) {
      channel.set(pusherChannels[value as keyof typeof pusherChannels], pusher.subscribe(pusherChannels[value as keyof typeof pusherChannels]));
    }
    channel.get(pusherChannels.DEV).bind('helloWorld', function (data: object) {
      console.debug(JSON.stringify(data));
    });
    channel.get(pusherChannels.ENIGMS).bind('ddust2TryPsd', function (data: { valid: boolean }) {
      setTotoroRoom(data.valid);
    });
  }

  const initApp = async () => {
    const character = new Character(SDK3DVerse);
    await SDK3DVerse.startSession({ // TODO: mettre en joinOrStart(params) pour la version final
      userToken: AppConfig._3DVERSE.USER_TOKEN,
      sceneUUID: AppConfig._3DVERSE.SCENE_UUID,
      canvas: (document.getElementById('display-canvas') as HTMLElement),
      // viewportProperties : {
      //   defaultControllerType : SDK3DVerse.controller_type.none,
      // },
      createDefaultCamera: false,
      startSimulation: "on-assets-loaded"
    });
    await SDK3DVerse.engineAPI.startSimulation();
    await character.InitFirstPersonController(AppConfig._3DVERSE.CHARACTER);
    const joysticksElement = await document.getElementById('joysticks') as HTMLElement;
    await SDK3DVerse.installExtension(SDK3DVerse_VirtualJoystick_Ext, joysticksElement);
    await document.getElementById("virtual-joystick-move")?.className as string;
    const joyStickLeft: HTMLElement = await document.getElementById("virtual-joystick-move") as HTMLElement;
    joyStickLeft.className = await "bluringOff"
    const joyStickRight: HTMLElement = await document.getElementById("virtual-joystick-orientation") as HTMLElement;
    joyStickRight.className = await "bluringOff"
    setTimeout(() => {
      setLoad3Dverse(true);
    }, 750)
    
    
    // setPlayers()
    // totoro.enigmHotAndCold(player as Player[])
  };

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
    if (digicodeOpen) {

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
      setReady(true);
    }
  }, [status3Dverse, statusPusher]);

  useEffect(() => {
    if (code.length !== 4) return;
    axios.post(`${AppConfig.API.HOST}:${AppConfig.API.PORT}/ddust2/tryPsd`, { psd: code })
      .then((response) => { })
      .catch(err => {});
  }, [code]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const entities = await SDK3DVerse.engineAPI.findEntitiesByEUID(AppConfig._3DVERSE.DDUST2_DOOR);
        if (totoroRoom && entities.length > 0) {
          const firstEntity = entities[0];
          await firstEntity.setGlobalTransform({ "position": [-80, 10, -20] });
          await firstEntity.setVisibility(false)
          // await SDK3DVerse.engineAPI.deleteEntities(entities);
        } else if (!totoroRoom && entities.length > 0) {
          const firstEntity = entities[0];
          await firstEntity.setGlobalTransform({ "position": [-7.309777, -0.600371, -0.220404] });
          await firstEntity.setVisibility(true)
        }
      } catch (err) {}
    };

    fetchData();
  }, [totoroRoom, load3Dverse]);

  return (
    <><LoadingBar ready={ready} loadPage={load3Dverse} />
      {status3Dverse === 'ready' && statusPusher === 'ready' ?
        <>
          <canvas id='display-canvas' tabIndex={1} />

          <div className='BlocNoteReact'>
            <BlocNoteReact />
          </div>

          {totoroRoom ? <></> : (<i className='bluringOff digiCodeButton fa-regular fa-file-code' onClick={handleDigicodeClick} />)}

          {digicodeOpen && (
            <div className='digicodeP'>
              <i className="fa-solid fa-x" onClick={handleDigicodeClick} />
              <Digicode onClose={handleCloseDigicode} setCode={setCode} onDigitPress={handleDigitPress} />
            </div>
          )}
          <div className='bluringOff'>
            <InventoryReact />
          </div>
        </>
        : <></>}</>
  );
};