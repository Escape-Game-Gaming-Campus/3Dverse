import AppConfig from '../_3dverseEngine/AppConfig';
import Object from '../constants/object';
import './inventory.scss';

export class Inventory
{
    size : number;
    array : Object[] = [];
    caseTexture : string;

    constructor(size : number, texture : string) 
    {
        this.size = size;
        this.caseTexture = texture;
    }

    public insert(object : Object)
    {
        if (this.size > this.array.length)
        {
            this.array.push(object);
        } else {
            console.warn(`l'inventaire n'a pas assez d'espace pour stocker un "${object.name}" supplémentaire ${this.array.length}/${this.size}`)
        }
    }

    public insertList(objects : Object[])
    {
        for (let index = 0; index < objects.length; index++) {
            this.insert(objects[index]);
        }
    }

    public delete(object : Object | number, onlyFirst : boolean = true) 
    {
        for (let index = 0; index < this.array.length; index++) {
            if ((object as Object).UUID ? this.array[index].UUID === (object as Object).UUID : this.array[index].UUID === object)
            {
                this.array.splice(index, 1) // number of element wich are delete at index
                if (onlyFirst) return;
            }
        }
    }

    public deleteList(objects : (Object | number)[], onlyFirst : boolean = true) 
    {
        for (let index = 0; index < objects.length; index++) {
            this.delete(objects[index], onlyFirst)
        }
    }

    public display()
    {
        // for (let index = 0; index < this.array.length; index++) {
        //     // <img src={this.caseTexture} alt="Image of case of inventory" />
        // }
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
    const inventory : Inventory = new Inventory(10, `${AppConfig.HOST}:${AppConfig.PORT}/img/case.png`);
    const object : Object = {name : "ampoule", UUID : 0, texture : `${AppConfig.HOST}:${AppConfig.PORT}/img/ampoule.png`};
    const object2 : Object = {name : "ampoule2", UUID : 1, texture : `${AppConfig.HOST}:${AppConfig.PORT}/img/ampoule.png`};
    const object3 : Object = {name : "ampoule3", UUID : 2, texture : `${AppConfig.HOST}:${AppConfig.PORT}/img/ampoule.png`};
    const object4 : Object = {name : "ampoule4", UUID : 3, texture : `${AppConfig.HOST}:${AppConfig.PORT}/img/ampoule.png`};
    const object5 : Object = {name : "gameBible", UUID : 4, texture : `https://static.vecteezy.com/system/resources/previews/009/399/398/original/old-vintage-book-clipart-design-illustration-free-png.png`};

    inventory.insertList([object, object2, object3, object4, object5]);
    inventory.insertList([object, object2, object3, object4, object5]);
    inventory.deleteList([3, 2]);
    inventory.insertList([object, object2, object3, object4, object5]);
    return inventory.display()
}