export type problem = {
    number: number;
    url: string;
    title: string;
    description: string;
    id: number;
    solution: string;
    runtime?: number; // milliseconds
    memory?: number; // megabytes
};
