import { useCallback, useEffect, useState, useRef } from 'react';
import { useScript } from '@uidotdev/usehooks';
import AppConfig from '../_3dverseEngine/AppConfig.json';
import { _SDK3DVerse } from '../_3dverseEngine/declare';
import './3Dverse.scss';
import { InventoryReact } from '../components/inventory';
import pusherChannels from '../constants/pusherChannels';
import bluringCanvas from '../utils/blur';
import { Character } from "../components/character";
import Digicode from '../components/enigms/ddust2/digicode';
import CrimeScene from '../components/enigms/hallway/crimeScene';
import { Raycast } from '../components/raycast';
import { Entity, SDK3DVerse_ExtensionInterface } from '../_3dverseEngine/declareGlobal';
import { BlocNoteReact } from '../components/blocNote';
import axios from 'axios';
import { count } from 'console';


declare const SDK3DVerse: typeof _SDK3DVerse;
declare const Pusher: any;
export var channel = new Map<pusherChannels, any>();
declare const SDK3DVerse_VirtualJoystick_Ext: SDK3DVerse_ExtensionInterface;
export const Canvas3Dverse = () => {
  const audioRef = useRef(new Audio('Boo_house.mp3'));
  const interactableObjects = ["ee4d6092-4dca-4ace-a55c-3c3d4a468e84", "d62610ef-5aa4-473c-b540-3a623e9590b9", "a46593ad-794c-4cb1-b0f3-728ec6803859", "7b79a430-8aea-4f6a-8c1c-1eb05fe41089", "c930d200-ae0a-4467-b106-663ca3dfe0cf", "3900effd-c890-4066-a3ca-64119ebe650e", "e8d9cf51-4ff3-4cbc-ab05-38ff66aedf03", "963be081-3931-486c-b8fc-da896ce49340"];//pin code / crime Scene / drawer / handle / lightbulb Totoro/ red base/blue base/green base
  const [countdown, setCountdown] = useState(120);
  const [eventTriggered, setEventTriggered] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(-1);
  const [digicodeOpen, setDigicodeOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [crimeSceneOpen, setCrimeSceneOpen] = useState(false);
  const [totoroRoom, setTotoroRoom] = useState(false);
  const [raycastGlobal, setRaycastGlobal] = useState<Raycast>();
  const [code, setCode] = useState("");
  const [codeCrime, setCodeCrime] = useState("");
  const [redLight, setRedLight] = useState(false);
  const [blueLight, setBlueLight] = useState(false);
  const [greenLight, setGreenLight] = useState(false);
  const [redBase, setRedBase] = useState(-1);
  const [blueBase, setBlueBase] = useState(-1);
  const [greenBase, setGreenBase] = useState(-1);
  const [itemSelected, setItemSelected] = useState(-1);
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
    channel.get(pusherChannels.ENIGMS).bind('ddust2TryPsd', function (data: { valid: boolean }) {
      console.log("PUSHER : ", JSON.stringify(data));
      setTotoroRoom(data.valid);
    });
  }
  const setLightsOff = async () => {
    const redLightbulb = await SDK3DVerse.engineAPI.findEntitiesByEUID("c8e714d5-bbca-4f8a-b3cd-129ade233c8a");
    const redLightbulbLight = await SDK3DVerse.engineAPI.findEntitiesByEUID("d8a9d815-9682-42cf-b205-f8cc69a6c5d6");
    const blueLightbulb = await SDK3DVerse.engineAPI.findEntitiesByEUID("43bb9e8d-2672-4a0a-aa0d-5f3c214ea624");
    const blueLightbulbLight = await SDK3DVerse.engineAPI.findEntitiesByEUID("89ec5c77-4806-4e1d-9ebc-454a85d538d5");
    const greenLightbulb = await SDK3DVerse.engineAPI.findEntitiesByEUID("cd8a4b3e-de57-41ba-9151-95e6a016f226");
    const greenLightbulbLight = await SDK3DVerse.engineAPI.findEntitiesByEUID("54145b1f-2b48-4a47-8aa5-68f8e1b37c12");
    await redLightbulb[0].setVisibility(false);
    await redLightbulbLight[0].setVisibility(false);
    await blueLightbulb[0].setVisibility(false);
    await blueLightbulbLight[0].setVisibility(false);
    await greenLightbulb[0].setVisibility(false);
    await greenLightbulbLight[0].setVisibility(false);
  }

  const initApp = useCallback(async () => {
    const character = new Character(SDK3DVerse);
    await SDK3DVerse.joinOrStartSession({
      userToken: AppConfig._3DVERSE.USER_TOKEN,
      sceneUUID: AppConfig._3DVERSE.SCENE_UUID,
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
    const raycast = new Raycast(SDK3DVerse, interactableObjects, setSelectedEntity);
    setRaycastGlobal(raycast);
    setLightsOff();
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

  useEffect(() => {
    console.log(itemSelected);
  }, [itemSelected]);

  const handleDigicodeClick = () => {
    if (!totoroRoom) {
      if (digicodeOpen) {
      } else {
        setDigicodeOpen(true);
        bluringCanvas(25);
      }
    }
  };

  const handleCrimeSceneClick = () => {
    if (crimeSceneOpen) {
    } else {
      setCrimeSceneOpen(true);
      bluringCanvas(25);
    }
  };

  const handleDrawerClick = async () => {
    const drawer = await SDK3DVerse.engineAPI.findEntitiesByEUID("162ca7cb-089b-4a0a-8114-ce7dec2fb977");
    const handle = await SDK3DVerse.engineAPI.findEntitiesByEUID("7b79a430-8aea-4f6a-8c1c-1eb05fe41089");
    const lightbulb = await SDK3DVerse.engineAPI.findEntitiesByEUID("ba406661-7b0e-4436-b059-ecfa590bbb00");
    const drawerTransform = await drawer[0].getGlobalTransform();
    const handleTransform = await handle[0].getGlobalTransform();
    const lightbulbTransform = await lightbulb[0].getGlobalTransform();
    if (drawerTransform.position && handleTransform.position && lightbulbTransform.position) {
      if (drawerOpen) {
        await drawer[0].setGlobalTransform({ "position": [drawerTransform.position[0] + 0.2, drawerTransform.position[1], drawerTransform.position[2]] })
        await handle[0].setGlobalTransform({ "position": [handleTransform.position[0] + 0.2, handleTransform.position[1], handleTransform.position[2]] })
        await lightbulb[0].setGlobalTransform({ "position": [lightbulbTransform.position[0] + 0.2, lightbulbTransform.position[1], lightbulbTransform.position[2]] })
        setDrawerOpen(false);
      } else {
        await drawer[0].setGlobalTransform({ "position": [drawerTransform.position[0] - 0.2, drawerTransform.position[1], drawerTransform.position[2]] })
        await handle[0].setGlobalTransform({ "position": [handleTransform.position[0] - 0.2, handleTransform.position[1], handleTransform.position[2]] })
        await lightbulb[0].setGlobalTransform({ "position": [lightbulbTransform.position[0] - 0.2, lightbulbTransform.position[1], lightbulbTransform.position[2]] })
        setDrawerOpen(true);
      }
    }
  };

  const handleLightbulbClick = async () => {
    const lightbulb = await SDK3DVerse.engineAPI.findEntitiesByEUID("ba406661-7b0e-4436-b059-ecfa590bbb00");
    axios.post(`${AppConfig.API.HOST}:${AppConfig.API.PORT}/inv/add`, {
      "objs": [
        { "uuid": 3 }
      ]
    })
    await lightbulb[0].setVisibility(false);
  };

  const handleLightbulbFlash = async () => { // à appeler quand le capteur du casier sera activé
    axios.post(`${AppConfig.API.HOST}:${AppConfig.API.PORT}/inv/add`, {
      "objs": [
        { "uuid": 2 }
      ]
    })
  };


  const handleRedBaseClick = async () => {
    //utiliser l'ampoule selec depuis l'inventaire si aucune selec ne rien faire
    const redLightbulb = await SDK3DVerse.engineAPI.findEntitiesByEUID("c8e714d5-bbca-4f8a-b3cd-129ade233c8a");
    const redLightbulbLight = await SDK3DVerse.engineAPI.findEntitiesByEUID("d8a9d815-9682-42cf-b205-f8cc69a6c5d6");
    if (!redLight) {
      if (itemSelected == 1 || itemSelected == 2 || itemSelected == 3) {
        await redLightbulb[0].setVisibility(true);
        setRedBase(itemSelected);
        axios.post(`${AppConfig.API.HOST}:${AppConfig.API.PORT}/inv/remove`, {
          "objs": [
            { "uuid": itemSelected }
          ]
        })
        if (itemSelected == 2) {
          await redLightbulbLight[0].setVisibility(true);
        }
        setRedLight(true);
      }
    } else {
      await redLightbulb[0].setVisibility(false);
      await redLightbulbLight[0].setVisibility(false);
      axios.post(`${AppConfig.API.HOST}:${AppConfig.API.PORT}/inv/add`, {
        "objs": [
          { "uuid": redBase }
        ]
      })
      setRedLight(true);
    }
  }

  const handleBlueBaseClick = async () => {
    //utiliser l'ampoule selec depuis l'inventaire si aucune selec ne rien faire
    const blueLightbulb = await SDK3DVerse.engineAPI.findEntitiesByEUID("43bb9e8d-2672-4a0a-aa0d-5f3c214ea624");
    const blueLightbulbLight = await SDK3DVerse.engineAPI.findEntitiesByEUID("89ec5c77-4806-4e1d-9ebc-454a85d538d5");
    if (!blueLight) {
      if (itemSelected == 1 ||itemSelected == 2 ||itemSelected == 3) {
        await blueLightbulb[0].setVisibility(true);
        setBlueBase(itemSelected);
        axios.post(`${AppConfig.API.HOST}:${AppConfig.API.PORT}/inv/remove`, {
          "objs": [
            { "uuid": itemSelected }
          ]
        })
        if (itemSelected == 2) {
          await blueLightbulbLight[0].setVisibility(true);
        }
        setBlueLight(true);
      }
    } else {
      await blueLightbulb[0].setVisibility(false);
      await blueLightbulbLight[0].setVisibility(false);
      axios.post(`${AppConfig.API.HOST}:${AppConfig.API.PORT}/inv/add`, {
        "objs": [
          { "uuid": blueBase }
        ]
      })
      setBlueLight(true);
    }
  }
  const handleGreenBaseClick = async () => {
    const greenLightbulb = await SDK3DVerse.engineAPI.findEntitiesByEUID("cd8a4b3e-de57-41ba-9151-95e6a016f226");
    const greenLightbulbLight = await SDK3DVerse.engineAPI.findEntitiesByEUID("54145b1f-2b48-4a47-8aa5-68f8e1b37c12");
    if (!greenLight) {
      if (itemSelected == 1 || itemSelected == 2 || itemSelected == 3) {
        await greenLightbulb[0].setVisibility(true);
        setGreenBase(itemSelected);
        axios.post(`${AppConfig.API.HOST}:${AppConfig.API.PORT}/inv/remove`, {
          "objs": [
            { "uuid": itemSelected }
          ]
        })
        if (itemSelected == 2) {
          await greenLightbulbLight[0].setVisibility(true);
        }
        setGreenLight(true);
      }
    } else {
      await greenLightbulb[0].setVisibility(false);
      await greenLightbulbLight[0].setVisibility(false);
      axios.post(`${AppConfig.API.HOST}:${AppConfig.API.PORT}/inv/add`, {
        "objs": [
          { "uuid": greenBase }
        ]
      })
      setGreenLight(true);
    }
  }

  const handleCloseDigicode = () => {
    setDigicodeOpen(false);
  };
  const handleCloseCrimeScene = () => {
    setCrimeSceneOpen(false);
  };

  const handleDigitPress = (digit: any) => {
  }
  const handlePicturePress = (digit: any) => {
  }
  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const x = event.clientX;
    const y = event.clientY;
    raycastGlobal?.fireRay(x, y);
  };
  useEffect(() => {
    if (status3Dverse === 'ready' && statusPusher === 'ready') {
      updateClient();
    }
  }, [status3Dverse, statusPusher]);

  useEffect(() => {
    axios.post(`${AppConfig.API.HOST}:${AppConfig.API.PORT}/ddust2/tryPsd`, { psd: code })
      .then((response) => { })
      .catch(error => console.error('Error:', error));
  }, [code]);


  useEffect(() => {
    axios.post(`${AppConfig.API.HOST}:${AppConfig.API.PORT}/hallway2/tryPsd`, { psd: codeCrime })
      .then((response) => { })
      .catch(error => console.error('Error:', error));
  }, [codeCrime]);
  //à rajouter dans l'API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const entities = await SDK3DVerse.engineAPI.findEntitiesByEUID("16a525a0-5892-4065-a11b-a94862c153a6");
        console.log(entities);
        if (totoroRoom && entities.length > 0) {
          const firstEntity = entities[0];
          await firstEntity.setGlobalTransform({ "position": [-80, 10, -20] });
          await firstEntity.setVisibility(false);
          setEventTriggered(true);
        }
      } catch (error) {
        console.error("Error fetching entities:", error);
      }
    };

    fetchData();
  }, [totoroRoom]);
  const list = [handleDigicodeClick, handleCrimeSceneClick, handleDrawerClick, handleDrawerClick, handleLightbulbClick, handleRedBaseClick, handleBlueBaseClick, handleGreenBaseClick];

  useEffect(() => {
    if (eventTriggered && countdown > 0) {
      const intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      console.log(countdown);
      return () => clearInterval(intervalId);
    } else if (eventTriggered && countdown == 0) {
      playAlarm();
    }
  }, [eventTriggered, countdown]);

  const playAlarm = () => {
    audioRef.current.loop = true;
    audioRef.current.play();
  };

  const stopAlarm = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }

  useEffect(() => {
    if (selectedEntity != -1) { list[selectedEntity](); }
    setSelectedEntity(-1);
  }, [selectedEntity]);
  return (
    status3Dverse === 'ready' && statusPusher === 'ready' ?
      <>
        <canvas id='display-canvas' tabIndex={1} onClick={handleClick} />
        <div className='BlocNoteReact'>
          <BlocNoteReact />
        </div>
        <div>
          <div style={{ position: "absolute", top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            {/* {totoroRoom ? <></> : (<button onClick={handleDigicodeClick}>Open Digicode</button>)} */}
            {digicodeOpen && (
              <Digicode onClose={handleCloseDigicode} setCode={setCode} onDigitPress={handleDigitPress} />
            )}
            {crimeSceneOpen && (
              <CrimeScene onClose={handleCloseCrimeScene} setCodeCrime={setCodeCrime} onPicturePress={handlePicturePress} />
            )}
          </div>
        </div>
        <div>
          <InventoryReact setItemSelected={setItemSelected} />
        </div>

      </>
      : <></>
  );
};