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

export interface AddressData {
    _id: string;
    name: string;
    mobile: string;
    pincode: string;
    address: string;
    city: string;
}

export interface AddressDataPayload {
    name: string;
    mobile: string;
    pincode: string;
    address: string;
    city: string;
    user: string;
}

export interface AddressResponse {
    meta: Meta;
    data: AddressData[];
}

export interface MessDetailsResponse {
    meta: Meta;
    data: MessData[];
}

export interface DishDataResponse {
    meta: Meta;
    data: DishData[];
}

export interface CreateRPOrderData {
    amount: number;
    amount_due: number;
    amount_paid: number;
    attempts: number;
    created_at: string;
    currency: string;
    entity: string;
    id: string;
    notes: string[];
    offer_id: string;
    receipt: string;
    status: string;
}

export interface CreateRPOrderResponse {
    meta: Meta;
    data: CreateRPOrderData;
}

export interface validatePaymentPayload {
    orderid: string;
    paymentid: string;
    signature: string;
}

export interface PaymentMode {
    label: string;
    key: string;
}

export interface DishQty {
    qty: number;
    dishId: string;
}

export interface CartCheckout {
    userid: string;
    meshid: string;
    totalbill: number;
    dishes: DishQty[];
    status: string;
    payment: string;
    addressid: string;
}