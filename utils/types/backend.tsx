export interface IPagination {
    take: number;
    skip: number;
    count?: number;
    data?: any[];
}