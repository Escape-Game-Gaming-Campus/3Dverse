type Object = 
{
    name : string,
    UUID : string,
    texture : string,
}


export class Inventory
{
    size: number;
    array : Object[] = [];
    caseTexture : string;

    constructor(size : number, texture : string) 
    {
        this.size = size;
        this.caseTexture = texture;
    }

    public insert(object : Object)
    {
        this.array.push(object);
    }

    public insertList(objects : Object[])
    {
        for (let index = 0; index < objects.length; index++) {
            this.array.push(objects[index]);
            
        }
    }

    public delete(object : Object) 
    {
        for (let index = 0; index < this.array.length; index++) {
            if (this.array[index] == object)
            {
                this.array.splice(index, 1) // number of element wich are delete at index
            }
        }
    }

    public deleteList(objects : Object[]) 
    {
        for (let index = 0; index < objects.length; index++) {
            for (let index2 = 0; index2 < this.array.length; index2++) {
                if (this.array[index2] == objects[index])
                {
                    this.array.splice(index2, 1) // number of element wich are delete at index
                }
            }
        }
    }

    public display()
    {
        for (let index = 0; index < this.array.length; index++) {
            // add code to display inventory in app
        }
    }
}

export const InventoryReact = () => {
    const inventory : Inventory = new Inventory(10, '');
    const object : Object = {name : "ampoule", UUID : '', texture : ''};
    const object2 : Object = {name : "ampoule2", UUID : '', texture : ''};

    inventory.insertList([object, object2]);

    inventory.deleteList([object, object2]);

    console.log(inventory);

    return <></>
}