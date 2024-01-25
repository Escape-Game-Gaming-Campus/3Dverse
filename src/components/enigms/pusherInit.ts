import { Entities, SDK_Vec3 } from '../../_3dverseEngine/declareGlobal';
import pusherChannels from '../../constants/pusherChannels';
import { SDK3DVerse, channel } from '../../pages/3Dverse';
import AppConfig from '../../_3dverseEngine/AppConfig.json';
import { _SDK3DVerse } from '../../_3dverseEngine/declare';
import Pusher from 'pusher-js';

export var pusher: Pusher;

export async function pusherInit() : Promise<boolean[]>{
    var setTotoroRoom: boolean = false;
    var setLightBulbs: boolean = false;
    Pusher.logToConsole = false;

    pusher = new Pusher(AppConfig.PUSHER.KEY, {
        cluster: 'eu'
    });

    for (const value in pusherChannels) {
        channel.set(pusherChannels[value as keyof typeof pusherChannels], pusher.subscribe(pusherChannels[value as keyof typeof pusherChannels]));
    }
    channel.get(pusherChannels.DEV).bind('helloWorld', function (data: object) {
        console.debug(JSON.stringify(data));
    });
    channel.get(pusherChannels.ENIGMS).bind('ddust2TryPsd', function (data: { valid: boolean }) {
        setTotoroRoom = data.valid;
    });
    channel.get(pusherChannels.LIGHTBULBS).bind('lightsPowerOn', function (data: { status: string }) {
        setLightBulbs = true;
    });
    channel.get(pusherChannels.LIGHTBULBS).bind('updateLightbulbs', async function (data: [{ place: boolean, lightColor: SDK_Vec3, valid: boolean }, { place: boolean, lightColor: SDK_Vec3, valid: boolean }, { place: boolean, lightColor: SDK_Vec3, valid: boolean }, { place: boolean, lightColor: SDK_Vec3, valid: boolean }]) {
      const lightbulbs: Entities[] = [
        await SDK3DVerse.engineAPI.findEntitiesByEUID(AppConfig._3DVERSE.BULB_ENIGM.LIGHTS_BULBS.RED.BULB),
        await SDK3DVerse.engineAPI.findEntitiesByEUID(AppConfig._3DVERSE.BULB_ENIGM.LIGHTS_BULBS.BLUE.BULB),
        await SDK3DVerse.engineAPI.findEntitiesByEUID(AppConfig._3DVERSE.BULB_ENIGM.LIGHTS_BULBS.GREEN.BULB),
        await SDK3DVerse.engineAPI.findEntitiesByEUID(AppConfig._3DVERSE.BULB_ENIGM.LIGHTS_BULBS.YELLOW.BULB)
      ];
      const lightbulbsLight: Entities[] = [
        await SDK3DVerse.engineAPI.findEntitiesByEUID(AppConfig._3DVERSE.BULB_ENIGM.LIGHTS_BULBS.RED.LIGHT),
        await SDK3DVerse.engineAPI.findEntitiesByEUID(AppConfig._3DVERSE.BULB_ENIGM.LIGHTS_BULBS.BLUE.LIGHT),
        await SDK3DVerse.engineAPI.findEntitiesByEUID(AppConfig._3DVERSE.BULB_ENIGM.LIGHTS_BULBS.GREEN.LIGHT),
        await SDK3DVerse.engineAPI.findEntitiesByEUID(AppConfig._3DVERSE.BULB_ENIGM.LIGHTS_BULBS.YELLOW.LIGHT)
      ];
      var LightConfig: { color: SDK_Vec3, intensity: number, range: number } = { color: [0, 0, 0], intensity: 0.1, range: 0.4 };
      data.forEach((lightbulbData, i) => {
        if (lightbulbData.lightColor) {
          LightConfig.color = lightbulbData.lightColor;
          lightbulbsLight[i][0].setComponent("point_light", LightConfig);
        }
        if (lightbulbData.valid) {
          lightbulbsLight[i][0].setVisibility(true);
        } else {
          lightbulbsLight[i][0].setVisibility(false);
        }
        if (lightbulbData.place) {
          lightbulbs[i][0].setVisibility(true);
        } else {
          lightbulbs[i][0].setVisibility(false);
        }
      });
    });

    return [setTotoroRoom, setLightBulbs]
}