import { Language } from "./Language";

export interface Solution {
    id: number;
    problem_id: number;
    language: Language;
    solution: string;
    runtime: number | null;
    memory: number | null;
    major_version: number | null;
    minor_version: number | null;
    patch_version: number | null;
    submitted: boolean;
    created_at: string;
    updated_at: string;
}
