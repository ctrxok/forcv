//temp solution
//change this to redis
class CacheMemory {
    constructor() {
        this.#memory = new Map<number, object>()
    }
    //! make types for object 
    #memory: Map<number, object>;

    Reset() {
        this.#memory = new Map<number, object>();
    }

    set(key: number, value: TUserProp) {
        this.#memory.set(key, value)
    }

    get(key: number): TUserProp {
        return this.#memory.get(key) as TUserProp;
    }

    has(key: number): boolean {
        return this.#memory.has(key);
    }

    updateUser(key: number, value: TUserProp) {
        let oldProp = cache.get(key);

        cache.set(key, { ...oldProp, ...value })
    }
}

export let cache = new CacheMemory;

type TUserProp = {
    access_token?: string;
    expired_in?: number;
    state?: "chating" | "insertMessage";
}