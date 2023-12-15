import { _SDK3DVerse } from "../../../_3dverseEngine/declare";
import { SDK_Vec3 } from "../../../_3dverseEngine/declareGlobal";
import Player from "../../../constants/players";
import pusherChannels from "../../../constants/pusherChannels";
import { channel } from "../../../pages/3Dverse";


function getPlayers()
{
    let datas : Player[] = [];

    channel.get(pusherChannels.DEV).bind('updatePlayers', function (data: { players: Player }) {
        console.log("PUSHER : ", JSON.stringify(data));
        datas.push(data.players);
    });
    return datas
}


export default class Totoro {
    players: Player[];
    item: SDK_Vec3 | undefined;
    
    constructor(itemPos : SDK_Vec3 | undefined) {
        this.item = itemPos
        this.players = getPlayers();
    };

    public hotAndCold(itemPosition?: SDK_Vec3, player?: Player) {
        console.log({"players" : this.players, "item" : this.item});

        // const itemPos = { "x": itemPosition[0], "y": itemPosition[1], "z": itemPosition[2] }
        // const playerPos = { "x": player.position[0], "y": player.position[1], "z": player.position[2] }

        // const vector = { "x": playerPos.x - itemPos.x, "y": playerPos.y - itemPos.y }
        // const distance = Math.sqrt((vector.x * vector.x) + (vector.y * vector.y))
        // const gapTimer = 2000 // in ms for 1 meters

        // const timer = gapTimer * distance

        // return { "timer": timer, "playerId": player.ID }
    }
}

