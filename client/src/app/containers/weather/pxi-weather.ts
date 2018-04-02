export class PxiWeather {
    public time: string;
    public temperature: string;

    public constructor(obj?: PxiWeather) {
        if (obj && obj !== null) {
            this.time = obj.time;
            this.temperature = obj.temperature;
        }
    }
}
