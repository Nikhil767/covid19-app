import { Deaths } from "./deaths";

export interface Cases extends Deaths{
    active?: any;
    critical?: any;
    recovered?: any;
}