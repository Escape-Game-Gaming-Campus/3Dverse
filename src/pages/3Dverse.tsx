import { useCallback, useEffect } from 'react';
import { useScript } from '@uidotdev/usehooks';
import AppConfig from '../_3dverseEngine/AppConfig';
import { Joystick } from 'react-joystick-component';
import { _SDK3DVerse } from '../_3dverseEngine/declare';
import './3Dverse.scss';
import { InventoryReact } from '../components/inventory';

declare const SDK3DVerse: typeof _SDK3DVerse;
declare const Pusher: any;

export const Canvas3Dverse = () => {
  const statusPusher = useScript(
    `https://js.pusher.com/8.2.0/pusher.min.js`,
    {
      removeOnUnmount: false,
    }
  );

  async function pusherInit() {
    Pusher.logToConsole = true;

    var pusher = new Pusher('39f939b9f53716caf5d8', {
      cluster: 'eu'
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data: object) {
      alert(JSON.stringify(data));
    });
  }

  useEffect(() => {
    if (statusPusher === 'ready') {
      pusherInit();
    }
  }, [statusPusher]);

  useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:3001/helloWorld')
          .then(response => response.json())
          .then(data => {
              console.log(data);
              // Faire quelque chose avec les données reçues
          })
          .catch(error => console.error('Error:', error));
        }, 100);
        
  }, []);

  const status3Dverse = useScript(
    `https://cdn.3dverse.com/legacy/sdk/latest/SDK3DVerse.js`,
    {
      removeOnUnmount: false,
    }
  );

  const initApp = useCallback(async () => {
    await SDK3DVerse.joinOrStartSession({
      userToken: AppConfig.USER_TOKEN,
      sceneUUID: AppConfig.SCENE_UUID,
      canvas: (document.getElementById('display-canvas') as HTMLElement),
      viewportProperties: {
        defaultControllerType: SDK3DVerse.controller_type.orbit,
      },
    });
  }, []);

  useEffect(() => {
    if (status3Dverse === 'ready') {
      initApp();
    }
  }, [status3Dverse]);

  return (
    <>
      <canvas id='display-canvas' style={{
        width: '1920px',
        height: '1080px'
      }} />
      <div id='UI'>
        <Joystick size={150} />
        <InventoryReact />
      </div>
    </>
  );
};