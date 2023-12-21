import AppConfig from '../_3dverseEngine/AppConfig.json';
import Object from '../constants/object';
import './inventory.scss';
import pusherChannels from '../constants/pusherChannels';
import { channel } from '../pages/3Dverse';
import { useEffect, useState } from 'react';
interface InventoryProps {
    itemSelected: number;
    setItemSelected: React.Dispatch<React.SetStateAction<number>>;
  }

export class Inventory 
{
    public array : Object[] = [];
    private caseTexture : string;
    private selectedCaseTexture : string;
    private setItemSelected ?: React.Dispatch<React.SetStateAction<number>>;
    private itemSelected : number = -1;

    constructor(texture : string, selectedTexture: string) 
    {
        this.caseTexture = texture;
        this.selectedCaseTexture = selectedTexture;
    }

    public setItemSelectedProps(setItemSelected : React.Dispatch<React.SetStateAction<number>>, itemSelected : number) {
        this.setItemSelected = setItemSelected;
        this.itemSelected = itemSelected;
    }
    
    public setInv(array : Object[], setComponent: React.Dispatch<React.SetStateAction<JSX.Element>>)
    {
        this.array = array;
        setComponent(this.display());
    }

    public display(itemSelected: number = this.itemSelected)
    {
        console.log("array: ", this.array)
        return <>
            <div className='inv'>
                {
                    this.array.map((e, i) => {
                        return <img key={`item_${i}`} className='inventory item' src={e.texture} alt={`Item ${e.name} (uuid: ${e.UUID})`} />
                    })
                }
            </div>
            <div className='inv'>
                {
                    this.array.map((e, i) => {
                        return <img key={`case_${i}`} className='inventory case' src={itemSelected === e.UUID ? this.selectedCaseTexture : this.caseTexture} alt="Case of inventory" onClick={()=>{if (this.setItemSelected) this.setItemSelected(e.UUID)}} />
                    })
                }
            </div>
        </>
    }

    public hasItem(uuid : number) : boolean {
        return this.array.filter(e => e.UUID === uuid).length > 0;
    }
}

export const inventory : Inventory = new Inventory(`${AppConfig.FRONT.HOST}:${AppConfig.FRONT.PORT}/img/case.png`, `${AppConfig.FRONT.HOST}:${AppConfig.FRONT.PORT}/img/selectedCase.png`);

export const InventoryReact: React.FC<InventoryProps> = ({itemSelected, setItemSelected}) =>{
    const [invComponent, setInvComponent] = useState(<></>);

    inventory.setItemSelectedProps(setItemSelected, itemSelected);

    channel.get(pusherChannels.INVENTORY).bind('updateInventory', function (data: Object[]) {
        inventory.setInv(data, setInvComponent);
    });

    useEffect(() => {
        inventory.setInv([], setInvComponent);
    }, []);

    useEffect(() => {
        setInvComponent(inventory.display(itemSelected));
        console.log("itemSelected : ", invComponent)
    }, [itemSelected]);

    return invComponent
}

export function getInventory(name : string)
{
    return inventory.array.filter((e) => e.name === name)[0]
}