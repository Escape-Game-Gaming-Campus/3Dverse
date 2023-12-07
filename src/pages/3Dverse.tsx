import { useCallback, useEffect } from 'react';
import { useScript } from '@uidotdev/usehooks';
import AppConfig from '../_3dverseEngine/AppConfig';
import { Joystick } from 'react-joystick-component';
import { _SDK3DVerse } from '../_3dverseEngine/declare';
import './3Dverse.scss';
import { InventoryReact } from '../components/inventory';
import { Pusher, PusherMember, PusherChannel, PusherEvent } from '@pusher/pusher-websocket-react-native';

declare const SDK3DVerse: typeof _SDK3DVerse;

export const Canvas3Dverse = () => {
  async function pusherInit() {
    const pusher = Pusher.getInstance();

    await pusher.init({
      apiKey: "39f939b9f53716caf5d8",
      cluster: "eu"
    });

    await pusher.connect();
    await pusher.subscribe({
      channelName: "my-channel",
      onEvent: (event: PusherEvent) => {
        console.log(`Event received: ${event}`);
      }
    });
  }

  useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:3001/sendMessage')
          .then(response => response.json())
          .then(data => {
              console.log(data);
              // Faire quelque chose avec les données reçues
          })
          .catch(error => console.error('Error:', error));
        }, 10000);
        pusherInit();
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