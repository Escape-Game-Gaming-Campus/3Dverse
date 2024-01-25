import { useCallback, useEffect, useState, useRef } from 'react';
import { useScript } from '@uidotdev/usehooks';
import AppConfig from '../_3dverseEngine/AppConfig.json';
import { _SDK3DVerse } from '../_3dverseEngine/declare';
import './3Dverse.scss';
import { InventoryReact, inventory } from '../components/inventory';
import pusherChannels from '../constants/pusherChannels';
import bluringCanvas from '../utils/blur';
import { Character } from "../components/character";
import Digicode from '../components/enigms/ddust2/digicode';
import CrimeScene from '../components/enigms/hallway/crimeScene';
import { Raycast } from '../components/raycast';
import { SDK3DVerse_ExtensionInterface, SDK_Vec3, Viewport } from '../_3dverseEngine/declareGlobal';
import { BlocNoteReact } from '../components/blocNote';
import axios from 'axios';
import { Totoro } from '../components/enigms/totoro/totoro';
import { LoadingBar } from '../components/loadingBar';
import { initPlayerAPI, player, removePlayerApi, setPlayers, updatePlayerApi } from '../components/player';
import Player from '../constants/players';
import PChannels from '../tools/pusherChannels';
import Pusher from 'pusher-js';
import { pusherInit } from '../components/enigms/pusherInit';


declare const SDK3DVerse: typeof _SDK3DVerse;
export var channel = PChannels;
declare const SDK3DVerse_VirtualJoystick_Ext: SDK3DVerse_ExtensionInterface;
export var character: Character;
var camViewport: Viewport;
var totoroSKey: SDK_Vec3;
var updatePlayer: NodeJS.Timer
var currentPlayerName: string
var list: Function[] = [];

export const Canvas3Dverse = () => {
  const audioRef = useRef(new Audio('Boo_house.mp3'));
  const interactableObjects = AppConfig._3DVERSE.INTERACTIBLE_OBJECTS; //pin code / crime Scene / drawer / handle / lightbulb Totoro/ red base/blue base/green base
  const [pusherReady, setPusherReady] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [countdown1, setCountdown1] = useState(10);
  const [secondalarm, setsecondAlarm] = useState(false);
  const [startHAD, setStartHAD] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(-1);
  const [digicodeOpen, setDigicodeOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [crimeSceneOpen, setCrimeSceneOpen] = useState(false);
  const [totoroRoom, setTotoroRoom] = useState(false);
  const [lightbulbs, setLightbulbs] = useState(false);
  const [raycastGlobal, setRaycastGlobal] = useState<Raycast>();
  const [code, setCode] = useState("");
  const [codeCrime, setCodeCrime] = useState("");
  const [itemSelected, setItemSelected] = useState(-1);
  const [ready, setReady] = useState(false);
  const [load3Dverse, setLoad3Dverse] = useState(false);
  const [currentPlayerNameState, setCurrentPlayerNameState] = useState("")
  const [totoro] = useState<Totoro>(new Totoro(AppConfig._3DVERSE.TOTORO_S_KEY));

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
        .catch(err => { });
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
    channel.get(pusherChannels.LIGHTBULBS).bind('lightsPowerOn', function (data: { status: string }) {
      setLightbulbs(true);
    });
    channel.get(pusherChannels.LIGHTBULBS).bind('updateLightbulbs', async function (data: [{ place: boolean, lightColor: SDK_Vec3, valid: boolean }, { place: boolean, lightColor: SDK_Vec3, valid: boolean }, { place: boolean, lightColor: SDK_Vec3, valid: boolean }, { place: boolean, lightColor: SDK_Vec3, valid: boolean }]) {
      const redLightbulb = await SDK3DVerse.engineAPI.findEntitiesByEUID(AppConfig._3DVERSE.BULB_ENIGM.LIGHTS_BULBS.RED.BULB);
      const redLightbulbLight = await SDK3DVerse.engineAPI.findEntitiesByEUID(AppConfig._3DVERSE.BULB_ENIGM.LIGHTS_BULBS.RED.LIGHT);
      const blueLightbulb = await SDK3DVerse.engineAPI.findEntitiesByEUID(AppConfig._3DVERSE.BULB_ENIGM.LIGHTS_BULBS.BLUE.BULB);
      const blueLightbulbLight = await SDK3DVerse.engineAPI.findEntitiesByEUID(AppConfig._3DVERSE.BULB_ENIGM.LIGHTS_BULBS.BLUE.LIGHT);
      const greenLightbulb = await SDK3DVerse.engineAPI.findEntitiesByEUID(AppConfig._3DVERSE.BULB_ENIGM.LIGHTS_BULBS.GREEN.BULB);
      const greenLightbulbLight = await SDK3DVerse.engineAPI.findEntitiesByEUID(AppConfig._3DVERSE.BULB_ENIGM.LIGHTS_BULBS.GREEN.LIGHT);
      const yellowLightbulb = await SDK3DVerse.engineAPI.findEntitiesByEUID(AppConfig._3DVERSE.BULB_ENIGM.LIGHTS_BULBS.YELLOW.BULB);
      const yellowLightbulbLight = await SDK3DVerse.engineAPI.findEntitiesByEUID(AppConfig._3DVERSE.BULB_ENIGM.LIGHTS_BULBS.YELLOW.LIGHT);
      var LightConfig: { color: SDK_Vec3, intensity: number, range: number } = { color: [0, 0, 0], intensity: 0.1, range: 0.4 };
      //   if (data[0].lightColor) {
      //     LightConfig.color = data[0].lightColor;
      //     await redLightbulbLight[0].setComponent("point_light", LightConfig);
      //   }
      //   if (data[1].lightColor) {
      //     LightConfig.color = data[1].lightColor;
      //     await blueLightbulbLight[0].setComponent("point_light", LightConfig);
      //   }
      //   if (data[2].lightColor) {
      //     LightConfig.color = data[2].lightColor;
      //     await greenLightbulbLight[0].setComponent("point_light", LightConfig);
      //   }
      //   if (data[3].lightColor) {
      //     LightConfig.color = data[3].lightColor;
      //     await yellowLightbulbLight[0].setComponent("point_light", LightConfig);
      //   }

      //   if (data[0].valid) {
      //     await redLightbulbLight[0].setVisibility(true);
      //   } else {
      //     await redLightbulbLight[0].setVisibility(false);
      //   }
      //   if (data[1].valid) {
      //     await blueLightbulbLight[0].setVisibility(true);
      //   } else {
      //     await blueLightbulbLight[0].setVisibility(false);
      //   }
      //   if (data[2].valid) {
      //     await greenLightbulbLight[0].setVisibility(true);
      //   } else {
      //     await greenLightbulbLight[0].setVisibility(false);
      //   }
      //   if (data[3].valid) {
      //     await yellowLightbulbLight[0].setVisibility(true);
      //   } else {
      //     await yellowLightbulbLight[0].setVisibility(false);
      //   }

      //   if (data[0].place) {
      //     await redLightbulb[0].setVisibility(true);
      //   } else {
      //     await redLightbulb[0].setVisibility(false);
      //   }
      //   if (data[1].place) {
      //     await blueLightbulb[0].setVisibility(true);
      //   } else {
      //     await blueLightbulb[0].setVisibility(false);
      //   }
      //   if (data[2].place) {
      //     await greenLightbulb[0].setVisibility(true);
      //   } else {
      //     await greenLightbulb[0].setVisibility(false);
      //   }
      //   if (data[3].place) {
      //     await yellowLightbulb[0].setVisibility(true);
      //   } else {
      //     await yellowLightbulb[0].setVisibility(false);
      //   }
      // });

      const lightBulbsLight = [redLightbulbLight, blueLightbulbLight, greenLightbulbLight, yellowLightbulbLight];
      const lightBulbs = [redLightbulb, blueLightbulb, greenLightbulb, yellowLightbulb];


      /* Init light bulbs light */
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < lightBulbsLight.length; j++) {
          if (data[i].lightColor) {
            LightConfig.color = data[i].lightColor;
            await (lightBulbsLight[j])[0].setComponent("point_light", LightConfig);
          }
          if (data[j].valid) {
            await (lightBulbsLight[j])[0].setVisibility(true);
          } else {
            await (lightBulbsLight[j])[0].setVisibility(false);
          }
        }
      }
      /* Init light bulbs */
      for (let i = 0; i < lightBulbs.length; i++) {
        for (let j = 0; j < data.length; j++) {
          if (data[0].place) {
            await (lightBulbs[i])[0].setVisibility(true);
          } else {
            await (lightBulbs[i])[0].setVisibility(false);
          }
        }
      }
    });

    setPusherReady(true);
    setPlayers();
  }

  const initApp = useCallback(async () => {
    character = new Character(SDK3DVerse);
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
    await SDK3DVerse.engineAPI.startSimulation();

    // Init character
    currentPlayerName = "Player_" + SDK3DVerse.getClientUUID()
    await character.InitFirstPersonController(AppConfig._3DVERSE.CHARACTER, currentPlayerName);
    initPlayerAPI(currentPlayerName, character.camPos);
    setCurrentPlayerNameState(currentPlayerName)

    const joysticksElement = await document.getElementById('joysticks') as HTMLElement;
    await SDK3DVerse.installExtension(SDK3DVerse_VirtualJoystick_Ext, joysticksElement);
    const raycast = new Raycast(SDK3DVerse, interactableObjects, setSelectedEntity);
    setRaycastGlobal(raycast);
    await document.getElementById("virtual-joystick-move")?.className as string;
    const joyStickLeft: HTMLElement = await document.getElementById("virtual-joystick-move") as HTMLElement;
    joyStickLeft.className = await "bluringOff"
    const joyStickRight: HTMLElement = await document.getElementById("virtual-joystick-orientation") as HTMLElement;
    joyStickRight.className = await "bluringOff"

    totoro.SDK3dverse = SDK3DVerse;
    totoroSKey = (await SDK3DVerse.engineAPI.findEntitiesByEUID(AppConfig._3DVERSE.TOTORO_S_KEY))[0].getGlobalTransform().position as SDK_Vec3
    camViewport = SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()[0];
    updateClient();
    setTimeout(() => {
      setLoad3Dverse(true);
    }, 750)
  }, [interactableObjects, totoro]);

  //delete player
  window.addEventListener('beforeunload', () => {
    // a modifier car trop d'appels à l'api
    removePlayerApi(currentPlayerName);
  });

  useEffect(() => {
    // update player
    if (currentPlayerName && ready && !updatePlayer) {
      updatePlayer = setInterval(() => {
        updatePlayerApi(currentPlayerName, camViewport.getTransform().position)
        setCurrentPlayerNameState(currentPlayerName)
      }, 750)
    }
  }, [ready, currentPlayerNameState])

  useEffect(() => {
    if (status3Dverse === 'ready') {
      initApp();
      bluringCanvas();
    }
  }, [status3Dverse, initApp]);

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
    const drawer = await SDK3DVerse.engineAPI.findEntitiesByEUID(AppConfig._3DVERSE.BULB_ENIGM.DRAWER);
    const handle = await SDK3DVerse.engineAPI.findEntitiesByEUID(AppConfig._3DVERSE.BULB_ENIGM.HANDLE);
    const lightbulb = await SDK3DVerse.engineAPI.findEntitiesByEUID(AppConfig._3DVERSE.BULB_ENIGM.DRAWER_BULB);
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

  const handleKeyClick = async () => {
    const key = await SDK3DVerse.engineAPI.findEntitiesByEUID(AppConfig._3DVERSE.TOTORO_S_KEY);
    const door = await SDK3DVerse.engineAPI.findEntitiesByEUID(AppConfig._3DVERSE.TOTORO_DOOR);
    await door[0].setGlobalTransform({ "position": [-80, 10, -20] });
    await door[0].setVisibility(false);
    await key[0].setVisibility(false);
    totoro.keyPickedUp = true;
  };

  const handleLightbulbClick = async () => {
    const lightbulb = await SDK3DVerse.engineAPI.findEntitiesByEUID(AppConfig._3DVERSE.BULB_ENIGM.DRAWER_BULB);
    axios.post(`${AppConfig.API.HOST}:${AppConfig.API.PORT}/inv/add`, {
      "objs": [
        { "uuid": 3 }
      ]
    })
    await lightbulb[0].setVisibility(false);
  };

  const handleBaseClick = async (baseId: 5 | 6 | 7 | 8) => {
    var lightbulb = await SDK3DVerse.engineAPI.findEntitiesByEUID(AppConfig._3DVERSE.BULB_ENIGM.LIGHTS_BULBS.RED.BULB);
    var lightbulbLight = await SDK3DVerse.engineAPI.findEntitiesByEUID(AppConfig._3DVERSE.BULB_ENIGM.LIGHTS_BULBS.RED.LIGHT);
    if (baseId === 6) {
      lightbulb = await SDK3DVerse.engineAPI.findEntitiesByEUID(AppConfig._3DVERSE.BULB_ENIGM.LIGHTS_BULBS.BLUE.BULB);
      lightbulbLight = await SDK3DVerse.engineAPI.findEntitiesByEUID(AppConfig._3DVERSE.BULB_ENIGM.LIGHTS_BULBS.BLUE.LIGHT);
    } else if (baseId === 7) {
      lightbulb = await SDK3DVerse.engineAPI.findEntitiesByEUID(AppConfig._3DVERSE.BULB_ENIGM.LIGHTS_BULBS.GREEN.BULB);
      lightbulbLight = await SDK3DVerse.engineAPI.findEntitiesByEUID(AppConfig._3DVERSE.BULB_ENIGM.LIGHTS_BULBS.GREEN.LIGHT);
    } else if (baseId === 8) {
      lightbulb = await SDK3DVerse.engineAPI.findEntitiesByEUID(AppConfig._3DVERSE.BULB_ENIGM.LIGHTS_BULBS.YELLOW.BULB);
      lightbulbLight = await SDK3DVerse.engineAPI.findEntitiesByEUID(AppConfig._3DVERSE.BULB_ENIGM.LIGHTS_BULBS.YELLOW.LIGHT);
    }
    if (inventory.hasItem(itemSelected) && (itemSelected === 0 || itemSelected === 1 || itemSelected === 2 || itemSelected === 3)) {
      axios.post(`${AppConfig.API.HOST}:${AppConfig.API.PORT}/lightbulbs/add`, {
        "objs": [
          { "uuid": itemSelected, base: baseId - 5 }
        ]
      })
      await lightbulb[0].setVisibility(true);
    } else {
      await lightbulb[0].setVisibility(false);
      await lightbulbLight[0].setVisibility(false);
      axios.delete(`${AppConfig.API.HOST}:${AppConfig.API.PORT}/lightbulbs/remove`, {
        data: {
          "bases": [baseId - 5]
        }
      })
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
    if (status3Dverse === 'ready' && pusherReady) {
      updateClient();
      setReady(true);
    }
  }, [status3Dverse, pusherReady]);

  useEffect(() => {
    axios.post(`${AppConfig.API.HOST}:${AppConfig.API.PORT}/ddust2/tryPsd`, { psd: code })
      .then((response) => { })
      .catch(err => { });
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
        const entities = await SDK3DVerse.engineAPI.findEntitiesByEUID(AppConfig._3DVERSE.DDUST2_DOOR);
        if (totoroRoom && entities.length > 0) {
          const firstDoor = entities[0];
          await firstDoor.setGlobalTransform({ "position": [-80, 10, -20] });
          await firstDoor.setVisibility(false)
          // await SDK3DVerse.engineAPI.deleteEntities(entities);
        }
        // else if (!totoroRoom && entities.length > 0) {
        //   const firstDoor = entities[0];
        //   await firstDoor.setGlobalTransform({ "position": [-7.309777, -0.600371, -0.220404] });
        //   await firstDoor.setVisibility(true)
        // }
      } catch (err) { }
    };

    fetchData();
  }, [totoroRoom, load3Dverse]);
  list = [handleDigicodeClick, handleCrimeSceneClick, handleDrawerClick, handleDrawerClick, handleLightbulbClick, handleBaseClick, handleBaseClick, handleBaseClick, handleBaseClick, handleKeyClick];

  useEffect(() => {
    if (ready && load3Dverse) {
      if (startHAD) {
        const intervalId = setInterval(() => {
          if (totoro.timerEnd) {
            totoro.enigmHotAndCold(player as Player[], totoroSKey, currentPlayerName);
          }
          if (totoro.keyPickedUp) { clearInterval(intervalId); }
        }, 50);
      }
    }

  }, [ready, load3Dverse, totoro, startHAD]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const entities = await SDK3DVerse.engineAPI.findEntitiesByEUID(AppConfig._3DVERSE.CORVO_DOOR);
        if (lightbulbs && entities.length > 0) {
          const firstDoor = entities[0];
          await firstDoor.setGlobalTransform({ "position": [-80, 10, -20] });
          await firstDoor.setVisibility(false)
          // await SDK3DVerse.engineAPI.deleteEntities(entities);
        }
        // else if (!lightbulbs && entities.length > 0) {
        //   const firstDoor = entities[0];
        //   await firstDoor.setGlobalTransform({ "position": [-7.309777, -0.600371, -0.220404] });
        //   await firstDoor.setVisibility(true)
        // }
      } catch (err) { }
    };

    fetchData();
  }, [lightbulbs, load3Dverse]);


  useEffect(() => {
    if (countdown > 0 && totoroRoom) {
      const intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else if (countdown === 0 && totoroRoom) {
      playAlarm();
      setsecondAlarm(true);
    }
  }, [countdown, totoroRoom]);

  useEffect(() => {
    if (countdown1 > 0 && secondalarm) {
      const intervalId = setInterval(() => {
        setCountdown1((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else if (countdown1 === 0 && secondalarm) {
      stopAlarm();
      setStartHAD(true);
    }
  }, [countdown1, secondalarm]);

  const playAlarm = () => {
    audioRef.current.loop = true;
    audioRef.current.play().then(() => { }).catch(() => { });
  };

  const stopAlarm = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }

  useEffect(() => {
    if (!load3Dverse) return;
    if (selectedEntity !== -1) list[selectedEntity](selectedEntity as any);
    setSelectedEntity(-1);
  }, [selectedEntity, load3Dverse]);

  useEffect(() => {
    pusherInit();
  });

  return (
    <><LoadingBar ready={ready} loadPage={load3Dverse} />
      {status3Dverse === 'ready' && pusherReady ?
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
          <div className='bluringOff'>
            <InventoryReact setItemSelected={setItemSelected} itemSelected={itemSelected} />
          </div>
        </>
        : <></>}</>
  );
};