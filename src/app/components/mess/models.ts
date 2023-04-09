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

export interface updateDishPayload {
    dayname: string;
    isLunch: number;
    description: string;
    rate: number;
}

export interface GenericResponse {
    meta: { errorCode: number, message: string },
    data: any
}

export interface OrderData {
    _id: string;
    payment: string;
    totalBill: string;
    status: string;
    date: string;
    time: string;
    settled?: boolean;
    updateStatus?: boolean;
    Address: AddressDataInOrder[];
    dishDetails: DishDataInOrder[];
    userData: UserDataInOrder[];
    dishes: [{ qty: number, dishId: string; }]
}

export interface UserDataInOrder {
    name: string;
    email: string;
    mobile: string;
}

export interface AddressDataInOrder {
    name: string;
    mobile: string;
    pincode: string;
    address: string;
    city: string;
}

export interface DishDataInOrder extends dish {
    dishId: string;
    qty: number;
}

export interface OrderDetailsRes {
    meta: { errorCode: number, message: string };
    data: OrderData[];
}

export interface SubscriptionData {
    _id: string;
    fees: number;
    toDate: Date;
    fromDate: Date;
    paymentId: string;
    createdAt: Date;
    userData: UserDataInOrder[];
    addressData: AddressDataInOrder[];
    dishData: dish[];
}

export interface SubscriptionRes {
    meta: { errorCode: number, message: string };
    data: SubscriptionData[];
}

export interface UserProfile {
    name: string;
    email: string;
    mobile: string;
    location: string;
    city: string;
}