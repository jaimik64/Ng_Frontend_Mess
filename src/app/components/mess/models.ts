export interface dish {
    _id: string;
    dayname: string;
    isLunch: number;
    description: string;
    rate: number;
}

export interface dishType {
    label: string;
    value: number;
}

export interface addDishPayload {
    dayname: string;
    isLunch: number;
    description: string;
    rate: number;
    meshuser: string;
}