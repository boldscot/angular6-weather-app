import { Hour } from './hour';

export class Day {
    dayName: string;
    highTemp: number;
    lowTemp: number;
    iconUrl: string;
    description: string;
    humidity: string;
    hourlyData: Hour[];
}