export interface PageParams {
    perPage: number;
    page: number;
}

export interface IQuery {
    filter: any,
    sort?: any,
    page?: PageParams,
    projecttion?: any,
    population?: any
}