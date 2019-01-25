import { UserProfile } from './user';
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

export interface ContributionDetails {
    user: UserProfile;
    share: Number;
}
