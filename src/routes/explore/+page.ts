import type { Args } from "./interfaces";

export function load({ url }): Args {
    const dbLink = url.searchParams.get('dbLink');
    return {
        dbLink: dbLink,
    };
}