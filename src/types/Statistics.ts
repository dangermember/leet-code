import { ChartSegment } from "./ChartSegment";

export interface Statistics {
    difficulty: ChartSegment[], 
    topics: ChartSegment[],
    runtime: number,
    memory: number
}