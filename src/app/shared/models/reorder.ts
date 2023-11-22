import { Replay } from "./replay";
import { Rubric } from "./rubric";

export interface Reorder {
    firstList : Rubric[] | Replay[];
    currentList: Rubric[] | Replay[];
}