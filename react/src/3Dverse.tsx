import { useCallback, useEffect } from 'react';
import { useScript } from '@uidotdev/usehooks';
import AppConfig from './3dverseEngine/AppConfig';
import { _SDK3DVerse } from './3dverseEngine/declare';

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
    </>
  );
};