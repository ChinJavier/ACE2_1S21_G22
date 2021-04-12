export interface User {
    username: string;
    password: string;
    name?: string;
    gender?: string;
    age?: number;
    height?: number;
    weight?: number;
    isCoach?: boolean;
    coach?: string;
}