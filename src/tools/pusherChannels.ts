import pusherChannels from "../constants/pusherChannels";

export class PusherChannels {
    public channels: Map<pusherChannels, any>;
    public awaitChannels: {[key in pusherChannels]: {EventName: string, CallBack: Function}[]};

    constructor() {
        this.channels = new Map();
        var temp: {[key in pusherChannels]?: {EventName: string, CallBack: Function}[]} = {};
        for (var key in pusherChannels) {
            temp[key as pusherChannels] = [];
        }
        this.awaitChannels = temp as {[key in pusherChannels]: {EventName: string, CallBack: Function}[]};
    }

    public set(name: pusherChannels, value: any) {
        this.channels.set(name, value);
        if (this.awaitChannels[name] === undefined) return;
        this.awaitChannels[name].forEach((awaitChannel) => {
            this.channels.get(name).bind(awaitChannel.EventName, awaitChannel.CallBack);
        });
        this.awaitChannels[name] = [];
    }

    public get(name: pusherChannels): Binding {
        return new Binding(name, this.channels, this.setAwaitChannel as (name: pusherChannels, eventName: string, callback: Function) => {});
    }

    private setAwaitChannel(name: pusherChannels, eventName: string, callback: Function) {
        this.awaitChannels[name].push({EventName: eventName, CallBack: callback});
    }
}

class Binding {
    public channel: pusherChannels;
    public channels: Map<pusherChannels, any>;
    public setAwaitChannel: (name: pusherChannels, eventName: string, callback: Function) => {};

    constructor(channel: pusherChannels, channels: Map<pusherChannels, any>, setAwaitChannel: (name: pusherChannels, eventName: string, callback: Function) => {}) {
        this.channel = channel;
        this.channels = channels;
        this.setAwaitChannel = setAwaitChannel;
    }

    public bind(eventName: string, callback: Function) {
        if (this.channels.has(this.channel)) {
            this.channels.get(this.channel).bind(eventName, callback);
        } else {
            this.setAwaitChannel(this.channel, eventName, callback);
        }
    }
}