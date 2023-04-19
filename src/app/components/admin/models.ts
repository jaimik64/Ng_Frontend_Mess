export interface MetaInfo {
    errorCode: number;
    message: string;
}

export interface GenericResponse {
    meta: MetaInfo;
    data: any;
}

export interface userRoleDropDown {
    key: number;
    label: string;
}

export interface UserData {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    role: number;
    createdAt: string;
    updateRole?: boolean;
}

export interface UserdataResponse {
    meta: MetaInfo;
    data: UserData[];
}

export interface MessUserData {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    location: string;
    city: string;
    overAllFeedback: number;
    delivery?: boolean;
    createdAt?: string;
}

export interface DishData {
    _id: string;
    dayname: string;
    description: string;
    rate: number;
    meshuser: string;
    meshUser?: MessUserData[];
}

export interface DishDataResponse {
    meta: MetaInfo;
    data: DishData[];
}

export interface Dishes {
    qty: number;
    dishId: string;
}

export interface AddressData {
    _id: string;
    name: string;
    mobile: string;
    pincode: number;
    address: string;
    city: string;
    createdAt: string;
    userDetail?: UserData[];
}


export interface OrderData {
    _id: string;
    payment: string;
    totalbill: number;
    dishes: Dishes[];
    status: string;
    UserData: UserData[];
    MeshData: MessUserData[];
    Address: AddressData[];
    DishDetails: DishData[];
}

export interface OrderDataResponse {
    meta: MetaInfo;
    data: OrderData[];
}

export interface SubscriptionData {
    _id: string;
    fees: number;
    toDate: string;
    fromDate: string;
    createdByWhom: string;
    paymentId: string;
    createdAt: string;
    userData: UserData[];
    meshData: MessUserData[];
    addressData: AddressData[];
    dishData: DishData[];
}

export interface SubscriptionDataResponse {
    meta: MetaInfo;
    data: SubscriptionData[];
}

export interface AddressDataResponse {
    meta: MetaInfo;
    data: AddressData[];
}

export interface MessDataResponse {
    meta: MetaInfo;
    data: { meshes: MessUserData[]; }
}