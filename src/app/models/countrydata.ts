import { Cases } from "./cases";
import { Deaths } from "./deaths";
import { Tests } from "./tests";

export interface CountryWiseData {
    code:string,
    continent?: any;
    country: string;
    countryOriginal?: string;
    population?: any;
    cases: Cases;
    deaths: Deaths;
    tests: Tests;
    day: string;
    time: Date;
}

export interface ResponseData {
    get: string;
    parameters: any[];
    errors: any[];
    results: number;
    response: CountryWiseData[];
}