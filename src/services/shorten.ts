import randomstring from 'randomstring'
import { IRedisClient } from '../redis-client'

export type IShortnerService = {
  get: (url: string) => Promise<string | undefined>
  compress: (url: string) => Promise<String>
}

export default class ShortnerService implements IShortnerService {
  constructor(private readonly redis: IRedisClient) {}

  get(compressedUrl: string): Promise<string|undefined> {
    return this.redis.get(compressedUrl)
  }

  async compress(url: string) {
    const options = { length: 4, charset: 'utf-8', capitalization: 'uppercase' };
    const compressedUrl = randomstring.generate(options)
    await this.redis.put(compressedUrl, url)
    return compressedUrl
  }
}
