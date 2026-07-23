import { Difficulty } from "./Difficulty";
import { Topic } from "./Topic";

export interface Problem {
    id: number;
    number: number;
    url: string;
    title: string;
    description: string;
    solution: string;
    runtime: number | null;
    memory: number | null;
    difficulty: Difficulty;
    created_at: string;
    updated_at: string;
    topics: Topic[];
}