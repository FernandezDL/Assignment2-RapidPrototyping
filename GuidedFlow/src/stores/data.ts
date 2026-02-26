import type { CardModel } from "../types";

export const starterCards: CardModel[] = [
    { id:"c1", name:"Aether Fox", type:"Beast", cost:2, stats:{atk:4,def:2,spd:6}, description:"Fast opener." },
    { id:"c2", name:"Iron Tortoise", type:"Beast", cost:3, stats:{atk:2,def:7,spd:1}, description:"Tank." },
    { id:"c3", name:"Spark Librarian", type:"Tech", cost:2, stats:{atk:3,def:3,spd:4}, description:"Utility." },
    { id:"c4", name:"Vine Warden", type:"Nature", cost:3, stats:{atk:3,def:6,spd:2}, description:"Defense." },
    { id:"c5", name:"Null Mage", type:"Mage", cost:4, stats:{atk:7,def:2,spd:3}, description:"Burst." },
    { id:"c6", name:"Copper Drone", type:"Tech", cost:1, stats:{atk:2,def:1,spd:5}, description:"Cheap speed." },
    { id:"c7", name:"Moss Giant", type:"Nature", cost:5, stats:{atk:6,def:6,spd:1}, description:"Big body." },
    { id:"c8", name:"Glitch Runner", type:"Tech", cost:2, stats:{atk:3,def:2,spd:7}, description:"Speed." },
    { id:"c9", name:"Frost Sigil", type:"Mage", cost:3, stats:{atk:5,def:3,spd:2}, description:"Control." },
    { id:"c10", name:"Sunleaf Healer", type:"Nature", cost:2, stats:{atk:2,def:4,spd:3}, description:"Sustain." },
    { id:"c11", name:"Gravel Hound", type:"Beast", cost:2, stats:{atk:4,def:3,spd:3}, description:"Frontline." },
    { id:"c12", name:"Arc Prism", type:"Mage", cost:4, stats:{atk:6,def:3,spd:4}, description:"Midrange." },
    { id:"c13", name:"Bramble Archer", type:"Nature", cost:2, stats:{atk:5,def:2,spd:4}, description:"Ranged." },
    { id:"c14", name:"Steel Monk", type:"Tech", cost:3, stats:{atk:4,def:5,spd:3}, description:"Balanced." },
    { id:"c15", name:"Night Moth", type:"Beast", cost:1, stats:{atk:2,def:1,spd:6}, description:"Evasive." },
];

export const COPIES_PER_CARD = 3;
export const MAX_COPIES_IN_DECK = 2;
export const TARGET_DECK_SIZE = 10;
export const CORE_TARGET = 5;