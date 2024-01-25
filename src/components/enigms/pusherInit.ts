import { SDK_Vec3 } from '../../_3dverseEngine/declareGlobal';
import pusherChannels from '../../constants/pusherChannels';
import { SDK3DVerse, channel } from '../../pages/3Dverse';
import AppConfig from '../../_3dverseEngine/AppConfig.json';
import { _SDK3DVerse } from '../../_3dverseEngine/declare';
import Pusher from 'pusher-js';

export async function pusherInit() : Promise<boolean[]>{
    var setTotoroRoom: boolean = false;
    var setLightBulbs: boolean = false;
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
        setTotoroRoom = data.valid;
    });
    channel.get(pusherChannels.LIGHTBULBS).bind('lightsPowerOn', function (data: { status: string }) {
        setLightBulbs = true;
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

        const lightBulbsLight = [redLightbulbLight, blueLightbulbLight, greenLightbulbLight, yellowLightbulbLight];
        const lightBulbs = [redLightbulb, blueLightbulb, greenLightbulb, yellowLightbulb];


        /* Init light bulbs light */
        for (let i = 0; i < lightBulbsLight.length; i++) {
            for (let j = 0; j < data.length; j++) {
                if (data[j].lightColor) {
                    LightConfig.color = data[j].lightColor;
                    await (lightBulbsLight[i])[0].setComponent("point_light", LightConfig);
                }
                if (data[j].valid) {
                    await (lightBulbsLight[i])[0].setVisibility(true);
                } else {
                    await (lightBulbsLight[i])[0].setVisibility(false);
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

    return [setTotoroRoom, setLightBulbs]
}