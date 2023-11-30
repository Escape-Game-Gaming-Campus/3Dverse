import { useCallback, useEffect } from 'react';
import { useScript } from '@uidotdev/usehooks';

let SDK3DVerse: any;

export const Canvas = () => {
  const status = useScript(
    `https://cdn.3dverse.com/legacy/sdk/latest/SDK3DVerse.js`,
    {
      removeOnUnmount: false,
    }
  );

  const initApp = useCallback(async () => {
    await SDK3DVerse.joinOrStartSession({
      userToken: 'public_OuSCpRzSniXot1_4',
      sceneUUID: '1b89b1af-d098-4223-bd61-2b55b708b4b4',
      canvas: document.getElementById('display-canvas'),
      viewportProperties: {
        defaultControllerType: SDK3DVerse.controller_type.orbit,
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
          height: '100vh',
          width: '100vw',
          verticalAlign: 'middle',
        }}
      ></canvas>
    </>
  );
};