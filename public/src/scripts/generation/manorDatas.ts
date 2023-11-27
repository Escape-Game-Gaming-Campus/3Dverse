import { vect2 } from "../../engine/utils/Types.js";

export type KeyOfObject<T> = keyof T;

export type AllRoomsIds = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type RoomDataType = {
    coordinates: vect2
    id: AllRoomsIds,
    uuid: string,
    data: boolean[][]
};

export type RoomsDataTypes = {
    Corridors: RoomDataType,
    Staircase: RoomDataType,
    Kitchen: RoomDataType,
    ReceptionHall: RoomDataType,
    Bathroom: RoomDataType,
    LivingRoom: RoomDataType,
    GameRoom: RoomDataType,
    Library: RoomDataType,
    MainHall: RoomDataType,
    Hall: RoomDataType,
    Office: RoomDataType
};

export type AllRoomsNames = KeyOfObject<RoomsDataTypes>;

export type AllRooms = AllRoomsIds | AllRoomsNames;

export const rooms: RoomsDataTypes = {
    Corridors: { //* NOTE -Corridors- NOTE *//
        coordinates: {
            x: 0,
            y: 0
        },
        id: 0,
        uuid: "c666a5c2-ef3b-4e0e-a943-f25e16fdd902",
        data: [
            [true, true, true, true, true, true, true, true, true, false, true, true, true, true, false, true, true, true, true, true, true, true, true, true],
            [false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true],
            [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, true, false, true, false, false, false, false, false, false, true, false, true, false, false, false, false, false, false],
        ]
    },
    Staircase: { //* NOTE -Staircase- NOTE *//
        coordinates: {
            x: 10,
            y: 10
        },
        id: -1,
        uuid: "b45917e4-ab6a-4fd6-be57-524feaab8bd9",
        data: [
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
        ]
    },
    Kitchen: { //* NOTE -Kitchen- NOTE *//
        coordinates: {
            x: 0,
            y: 1
        },
        id: 1,
        uuid: "e11c454c-734e-4206-96c4-4e5f5cf3313e",
        data: [
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [false, true, true, true, true, true]
        ]
    },
    ReceptionHall: { //* NOTE -ReceptionHall- NOTE *//
        coordinates: {
            x: 8,
            y: 1
        },
        id: 2,
        uuid: "d7241fd1-95ee-4ed1-910c-5ce293b4a98e",
        data: [
            [false, false, true, true, true, true, false, false],
            [true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true]
        ]
    },
    Bathroom: { //* NOTE -Bathroom- NOTE *//
        coordinates: {
            x: 18,
            y: 1
        },
        id: 3,
        uuid: "",
        data: [
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, false]
        ]
    },
    LivingRoom: { //* NOTE -LivingRoom- NOTE *//
        coordinates: {
            x: 0,
            y: 9
        },
        id: 4,
        uuid: "c45d48e6-cac8-4941-afb1-9f130e59bccf",
        data: [
            [true, true, true, true, true, false, false, false],
            [true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true]
        ]
    },
    GameRoom: { //* NOTE -GameRoom- NOTE *//
        coordinates: {
            x: 18,
            y: 8
        },
        id: 5,
        uuid: "0f2761a3-19dd-4867-998b-b2133e48c420",
        data: [
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
        ]
    },
    Library: { //* NOTE -Library- NOTE *//
        coordinates: {
            x: 17,
            y: 14
        },
        id: 6,
        uuid: "2d051cd0-5786-48b1-9a9e-4d199e74a983",
        data: [
            [false, true, true, true, true, true, false],
            [true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true],
            [false, true, true, true, true, true, false],
        ]
    },
    MainHall: { //* NOTE -MainHall- NOTE *//
        coordinates: {
            x: 0,
            y: 19
        },
        id: 7,
        uuid: "",
        data: [
            [true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true],
            [true, true, true, true, true, true, false]
        ]
    },
    Hall: { //* NOTE -Hall- NOTE *//
        coordinates: {
            x: 9,
            y: 18
        },
        id: 8,
        uuid: "1597a2c6-faff-4aa4-8ba4-0a7a96fa4df8",
        data: [
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
            [true, true, true, true, true, true],
        ]
    },
    Office: { //* NOTE -Office- NOTE *//
        coordinates: {
            x: 17,
            y: 21
        },
        id: 9,
        uuid: "15862104-47ab-4429-8052-1fd50f03fb93",
        data: [
            [true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true],
            [false, true, true, true, true, true, true],
        ]
    }
}
// 24x25