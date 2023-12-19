import AppConfig from '../_3dverseEngine/AppConfig.json';
import Object from '../constants/object';
import './inventory.scss';
import pusherChannels from '../constants/pusherChannels';
import { channel } from '../pages/3Dverse';
import { useEffect, useState } from 'react';

export class Inventory
{
    array : Object[] = [];
    caseTexture : string;

    constructor(texture : string) 
    {
        this.caseTexture = texture;
    }
    
    public setInv(array : Object[], setComponent: React.Dispatch<React.SetStateAction<JSX.Element>>)
    {
        this.array = array;
        setComponent(this.display());
    }

    private display()
    {
        return <>
            <div className='inv'>
                {
                    this.array.map((e, i) => {
                        return <img key={`item_${i}`} className='inventory item' src={e.texture} alt={`Image of the item ${e.name} (uuid: ${e.UUID})`} />
                    })
                }
            </div>
            <div className='inv'>
                {
                    this.array.map((e, i) => {
                        return <img key={`case_${i}`} className='inventory case' src={this.caseTexture} alt="Image of case of inventory" />
                    })
                }
            </div>
        </>
    }
}

export const InventoryReact = () => {
    const [invComponent, setInvComponent] = useState(<></>);

    const inventory : Inventory = new Inventory(`${AppConfig.FRONT.HOST}:${AppConfig.FRONT.PORT}/img/case.png`);

    channel.get(pusherChannels.INVENTORY).bind('updateInventory', function (data: Object[]) {
        console.log("PUSHER : ", JSON.stringify(data));
        inventory.setInv(data, setInvComponent);
    });

    useEffect(() => {
        inventory.setInv([], setInvComponent);
    }, []);

    return invComponent
}

export async function getInventory(name : string)
{
    var inventory : Object | undefined;
    await channel.get(pusherChannels.INVENTORY).bind('updateInventory', function (data: Object[]) {
        console.log("PUSHER : ", JSON.stringify(data));
        const inventories : Object[] = data
        inventory = inventories.filter((e) => e.name === name)[0]
    });
    return inventory
}