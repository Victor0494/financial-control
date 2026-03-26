export interface BillDTO {
    id?: string;
    description: string;
    billValue: number;
    dueDate: string;
    payed: boolean;
}