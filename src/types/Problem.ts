import { Difficulty } from "./Difficulty";
import { Topic } from "./Topic";
import { Solution } from "./Solution";

export interface Problem {
    id: number;
    number: number;
    url: string;
    title: string;
    description: string;
    difficulty: Difficulty;
    created_at: string;
    updated_at: string;
    topics: Topic[];
    solutions: Solution[];
}