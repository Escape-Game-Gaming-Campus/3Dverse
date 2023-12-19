import axios from 'axios';
import AppConfig from '../_3dverseEngine/AppConfig.json';
import { _SDK3DVerse } from '../_3dverseEngine/declare';
import { channel } from '../pages/3Dverse';
import pusherChannels from '../constants/pusherChannels';
import Player from '../constants/players';

export var player: Player | undefined | Player[] = undefined;

export function setPlayers(name?: string) {
    channel.get(pusherChannels.PLAYERS).bind('updatePlayers', function (data: Player[]) {
        var playerList: Player[] = data;
        if (name) {
            player = playerList.filter((e) => e.name === name)[0]
        } else {
            player = playerList;
        }
    });
}

export function initPlayerAPI (playerName : string, camPos : Array<number> | undefined )
{
    if (!camPos) return
  axios.post(`${AppConfig.API.HOST}:${AppConfig.API.PORT}/players/add`, { players: [{"name" : playerName, "position" : camPos }] })
    .then((response) => {})
    .catch(err => {});
}

export async function updatePlayerApi (playerName : string)
{
  var camPos = (await _SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()[0]).getTransform().position;

  console.log(camPos)

//   axios.post(`${AppConfig.API.HOST}:${AppConfig.API.PORT}/players/update`, { players: {"name" : playerName, "position" : camPos } })
//   .then((response) => {})
//   .catch(err => {});
}

export function removePlayerApi(playerName : string)
{
  setPlayers(playerName)
  console.log("fpss", player)
  axios.post(`${AppConfig.API.HOST}:${AppConfig.API.PORT}/players/delete`, { players: [player] })
  .then((response) => {})
  .catch(err => {});
}