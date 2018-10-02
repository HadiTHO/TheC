export interface EventDetail {
    $key?: string,
    eventName: string;
    eventDesc: string;
    address: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    image?: string;
    noV?: number;
    join: number;
    userID?: string;

}