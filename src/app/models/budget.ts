export interface BudgetDetails {
    _id: string;
    name: string;
    description: string;
    cost: number;
    createdDate: Date;
    buyer: string;
    contributors: Array<string>;
    hasSettled: boolean;
}

export interface BudgetBasicDetails {
    _id: string;
    name: string;
    city: string;
    date: string;
    displayImageUrl: string;
}
export interface Item {
    name: string;
    cost: number;
}
