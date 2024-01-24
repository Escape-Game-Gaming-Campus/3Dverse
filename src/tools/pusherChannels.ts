import pusherChannels from "../constants/pusherChannels";

class PusherChannels {
    public channels: Map<pusherChannels, any>;
    public awaitChannels: {[key in pusherChannels]: {EventName: string, CallBack: Function}[]};

    constructor() {
        this.channels = new Map();
        var temp: {[key in pusherChannels]?: {EventName: string, CallBack: Function}[]} = {};
        for (var key in pusherChannels) {
            temp[pusherChannels[key as keyof typeof pusherChannels]] = [];
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
        return new Binding(name, this.channels);
    }

    public setAwaitChannel(name: pusherChannels, eventName: string, callback: Function) {
        this.awaitChannels[name].push({EventName: eventName, CallBack: callback});
    }
}

var PChannels = new PusherChannels();
export default PChannels;

class Binding {
    public channel: pusherChannels;
    public channels: Map<pusherChannels, any>;

    constructor(channel: pusherChannels, channels: Map<pusherChannels, any>) {
        this.channel = channel;
        this.channels = channels;
    }

    public bind(eventName: string, callback: Function) {
        if (this.channels.has(this.channel)) {
            this.channels.get(this.channel).bind(eventName, callback);
        } else {
            PChannels.setAwaitChannel(this.channel, eventName, callback);
        }
    }
}