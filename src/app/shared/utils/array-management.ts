export class ArrayManagement {

    constructor() { }

    /**
     * Groups an array by the specified key property. The result is an object grouped by that key with an array of coincidences inside of every key
     * @param items Array of items
     * @param key property key to group
     * @returns Object with all the grouped keys
     */
    static groupBy(items: any[], key: string) {
        return items.reduce((acc, cur) => {
            acc[cur[key]] = acc[cur[key]] || [];
            acc[cur[key]].push(cur);
            return acc;
        }, []);
    }
}