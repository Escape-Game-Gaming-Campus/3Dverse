import { useCallback, useEffect } from 'react';
import { useScript } from '@uidotdev/usehooks';
import AppConfig from '../_3dverseEngine/AppConfig';
import { _SDK3DVerse } from '../_3dverseEngine/declare';
import './3Dverse.scss';

declare const SDK3DVerse : typeof _SDK3DVerse;

export const Canvas3Dverse = () => {
  const status = useScript(
    `https://cdn.3dverse.com/legacy/sdk/latest/SDK3DVerse.js`,
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
      <canvas id='display-canvas' />
    </>
  );
};