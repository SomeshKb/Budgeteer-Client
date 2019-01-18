export interface ItemDetails {
    _id: string;
    name: string;
    shortDescription: string;
    longDescription: string;
    city: string;
    address: string;
    date: string;
    interested: Array<string>;
    registered: Array<string>;
    organiserId: string;
    totalSeats: number;
    availableSeats: number;
    type: string;
    cost: number;
    ticket: Array<Ticket>;
    displayImageUrl: string;
    bannerImageUrl: string;
}

export interface ItemBasicDetails {
    _id: string;
    name: string;
    city: string;
    date: string;
    displayImageUrl: string;
}

export interface Ticket {
    name: string;
    eventID: string;
    cost: number;
    totalTicket: number;
    ticketSold: number;
}

export interface ItemType {
    _id: string;
    type: string;
}
