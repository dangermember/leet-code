import { db } from "./db";
import { migrate } from "./migrate";

migrate();

export { db };