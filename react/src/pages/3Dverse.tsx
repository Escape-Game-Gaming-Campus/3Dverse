import { useCallback, useEffect ,useState } from 'react';
import { useScript } from '@uidotdev/usehooks';
import AppConfig from '../_3dverseEngine/AppConfig';
import { Joystick } from 'react-joystick-component'; 
import { _SDK3DVerse } from '../_3dverseEngine/declare';
import {Character} from "../components/character";
import './3Dverse.scss';
import { InventoryReact } from '../components/inventory';
import { SDK3DVerse_ExtensionInterface } from '../_3dverseEngine/declareGlobal';

declare const SDK3DVerse : typeof _SDK3DVerse;
declare const SDK3DVerse_VirtualJoystick_Ext : SDK3DVerse_ExtensionInterface;

export const Canvas3Dverse = () => {

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
    await character.InitFirstPersonController("92f7e23e-a3e3-48b1-a07c-cf5bff258374");
    const joysticksElement = document.getElementById('joysticks') as HTMLElement;
    await SDK3DVerse.installExtension(SDK3DVerse_VirtualJoystick_Ext, joysticksElement);
  }, []);
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
      <div id='UI'>
      {/* <div style={{ position: 'absolute', bottom: "48px", left: "48px", zIndex: 999 }}>
        <Joystick size={150} move={handleJoystickMove} start={handleJoystickStart} stop={handleJoystickStop} />
        </div> */}
        <div>

        </div>
        <InventoryReact/>
      </div> 
    </>
  );
};