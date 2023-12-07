import {JoystickShape} from "./shape.enum"; 
declare module 'react-joystick-component' {
    import React from 'react';
  
    interface IJoystickProps {
        size?:number;
        stickSize?:number;
        baseColor?:string;
        stickColor?:string;
        disabled?:boolean;
        throttle?:number;
        sticky?:boolean;
        stickImage?:string;
        baseImage?:string;
        followCursor?:boolean;
        move?:(event:IJoystickUpdateEvent) => void;
        stop?:(event:IJoystickUpdateEvent) => void;
        start?:(event:IJoystickUpdateEvent) => void;
        baseShape?:JoystickShape;
        stickShape?:JoystickShape;
        controlPlaneShape?:JoystickShape;
        minDistance?:number;
        pos:{x:number, y:number}
    }
  
    type JoystickDirection = "FORWARD" | "RIGHT" | "LEFT" | "BACKWARD";

    export interface IJoystickUpdateEvent {
        type:"move" | "stop" | "start";
        x:number | null;
        y:number | null;
        direction:JoystickDirection | null;
        distance:number; // Percentile 0-100% of joystick 
    }
    const Joystick:React.FC<IJoystickProps>;
    export default Joystick;
  }