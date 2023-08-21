export class CreateSheduleMatchDto {

    id?: number;
    date?: Date;
    time?: string;
    matchVenue?: string;
    goalHome?:number;
    isProcessed?: boolean;
    goalAway?:number;
    homeTeamId?:number;
    awayTeamId?:number;
}
