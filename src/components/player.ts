import axios from 'axios';
import AppConfig from '../_3dverseEngine/AppConfig.json';
import { _SDK3DVerse } from '../_3dverseEngine/declare';
import { channel } from '../pages/3Dverse';
import pusherChannels from '../constants/pusherChannels';
import Player from '../constants/players';
import { Viewport } from '../_3dverseEngine/declareGlobal';

export var player: Player | undefined | Player[] = undefined;

export function setPlayers(name?: string) {
  channel.get(pusherChannels.PLAYERS).bind('updatePlayers', function (data: Player[]) {
    var playerList: Player[] = data;
    if (name) {
      player = playerList.filter((e) => e.name === name)[0]
    } else {
      player = playerList;
    }
    // console.log("updated Player", player)
  });
}

export function initPlayerAPI(playerName: string, camPos: Array<number> | undefined) {
  if (!camPos) return
  axios.post(`${AppConfig.API.HOST}:${AppConfig.API.PORT}/players/add`, { players: [{ "name": playerName, "position": camPos }] })
    .then((response) => { setPlayers() })
    .catch(err => { });
}

export function updatePlayerApi(playerName: string, position : Array<number>) {
  axios.post(`${AppConfig.API.HOST}:${AppConfig.API.PORT}/players/update`, { players: [{ "name": playerName, "position": position }] })
    .then((response) => { setPlayers() })
    .catch(err => { });
}

export function removePlayerApi(playerName: string) {
  axios.post(`${AppConfig.API.HOST}:${AppConfig.API.PORT}/players/delete`, { players: [{ "name": playerName }] })
    .then((response) => { setPlayers() })
    .catch(err => { });
}