import { useRef } from "react";
import { _SDK3DVerse } from "../../../_3dverseEngine/declare";
import { SDK_Vec3 } from "../../../_3dverseEngine/declareGlobal";
import Player from "../../../constants/players";
import { getInventory } from "../../inventory";
import { player, setPlayers } from "../../player";

export class Totoro {
    public itemUUID: string;
    public item: SDK_Vec3 = [0, 0, 0];
    public itemCatch: boolean;
    public playerNear: { "timer": number, "playerId": number };
    public audioRef = useRef(new Audio("bip.mp3"));

    constructor(itemUUID: string) {
        this.itemUUID = itemUUID;
        // var func = (async () => {
        //     var element = (await _SDK3DVerse.engineAPI.findEntitiesByEUID(`${this.itemUUID}`))[0].getGlobalTransform().position as SDK_Vec3
        //     return element;
        // });
        // func().then((res) => {
        //     this.item = res;
        // });
        this.playerNear = { "timer": 0, "playerId": 0 };
        this.itemCatch = false;
    };

    public hotAndCold(player: Player) {
        const playerPos = { "x": player.position[0], "y": player.position[1], "z": player.position[2] }

        const vector = { "x": playerPos.x - this.item[0], "y": playerPos.y - this.item[1] }
        const distance = Math.sqrt((vector.x * vector.x) + (vector.y * vector.y))
        const gapTimer = 2000 // in ms for 1 meters

        const timer = gapTimer * distance

        return { "timer": timer, "playerId": player.ID }
    }

    public setPlayerNear(players: Player[]) {
        players.forEach((player) => {
            const selectedPlayer = this.hotAndCold(player);
            if (this.playerNear.timer == 0) {
                this.playerNear = selectedPlayer;
            }
            else if (this.playerNear.timer > selectedPlayer.timer) {
                this.playerNear = selectedPlayer;
            }
        })
    }

    public soundNearHotAndCold(players: Player[]) {
        this.setPlayerNear(players);
        setPlayers("Player" + _SDK3DVerse.getClientUUID());
        if (player && this.playerNear.playerId === (player as Player).ID) {
            setInterval(() => { this.audioRef.current.play() }, this.playerNear.timer)
        }
    }

    public setItemCatched() {
        if (getInventory(this.itemUUID) as Object) {
            this.itemCatch = true;
        }
    }

    public enigmHotAndCold(players: Player[]) {
        while (!this.itemCatch) {
            this.setItemCatched();
            this.soundNearHotAndCold(players);
        }
    }
}

