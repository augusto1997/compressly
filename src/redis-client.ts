export type IRedisClient = {
  put: (key: string, item: string) => Promise<void>
  get: (key: string) => Promise<string | undefined>
}

class RedisClient implements IRedisClient {
  private entries: Map<string, string> = new Map()

  constructor() {}

  async put(key: string, item: string) {
    this.entries.set(key, item)
  }

  async get(key: string): Promise<string| undefined> {
    return this.entries.get(key);
  }
}

export default RedisClient
