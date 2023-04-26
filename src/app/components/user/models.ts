export interface Meta {
    message: string;
    errorCode: number;
}

export interface GenericResponse {
    meta: Meta;
    data: any;
}

export interface MessData {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    location: string;
    city: string;
}

export interface DishData {
    _id: string;
    dayname: string;
    isLunch: number;
    rate: number;
    description: string;
    qty?: number;
}

export interface MessDetailsResponse {
    meta: Meta;
    data: MessData[];
}

export interface DishDataResponse {
    meta: Meta;
    data: DishData[];
}