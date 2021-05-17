export interface Valor {
    _id: string;
    oxygen: number;
    rhythm: number;
    temperature: number;
    fecha: Date;
}

export interface Medition{
    _id?: string;
    valores: Valor[];
    test: number;
    id_user: string;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
}