export type vect2 = {x : number, y : number};
export type vect3 = {x : number, y : number, z : number};
export type quaternion = {x : number, y : number, z : number, w : number};
export class SDK3DVerse_Entity {
    constructor(){};
    public getGlobalTransform(stopAtParent: SDK3DVerse_Entity | null){};
    public getName(defaultName?: any) : string {return""};
    public getComponent(componentName?: any ) : {elements: any} {return {elements: ""}};
    public getComponentList() : string[] {return []};
    public getComponents() : Map<string, Object> {return new Map<string, Object>};
    public setComponent(componentName : string, value : Object){};
    public setGlobalTransform(globalTransform : Object){};
    public isAttached(componentName : string ){};
}
export class connectionInfo {
    public sessionCreated: boolean = true;
    constructor(){};
}