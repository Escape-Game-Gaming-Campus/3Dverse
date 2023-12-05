import { useCallback, useEffect } from 'react';
import { useScript } from '@uidotdev/usehooks';
import AppConfig from '../_3dverseEngine/AppConfig';
import { Joystick } from 'react-joystick-component'; 
import { _SDK3DVerse } from '../_3dverseEngine/declare';

declare const SDK3DVerse : typeof _SDK3DVerse;

export const Canvas = () => {
  const status = useScript(
    `https : //cdn.3dverse.com/legacy/sdk/latest/SDK3DVerse.js`,
    {
      removeOnUnmount : false,
    }
  );

  const initApp = useCallback(async () => {
    await SDK3DVerse.joinOrStartSession({
      userToken : AppConfig.USER_TOKEN,
      sceneUUID : AppConfig.SCENE_UUID,
      canvas : (document.getElementById('display-canvas') as HTMLElement),
      viewportProperties : {
        defaultControllerType : SDK3DVerse.controller_type.editor,
      },
    });
  }, []);

  useEffect(() => {
    if (status === 'ready') {
      initApp();
    }
  }, [status]);

  return (
    <>
      <canvas
        id='display-canvas'
        style={{
          height : '100vh',
          width : '100vw',
          verticalAlign : 'middle',
        }}
      ></canvas>
      <div style={{ position: 'absolute', bottom: "48px", left: "48px", zIndex: 999 }}>
      <Joystick size={100} />
    </div>
    </>
  );
};