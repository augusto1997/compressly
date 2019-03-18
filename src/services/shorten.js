import randomstring from 'randomstring'
import RedisClient from '../redis-client'

const { REDIS_URL, REDIS_PORT } = process.env

class ShortnerService {
  constructor (redisClient) {
    this.redisClient = redisClient
  }

  async getCompletedUrl (compressedUrl) {
    const url = await this.redisClient.get(compressedUrl)
    return url
  }

  async getCompressedUrl (baseUrl) {
    if (!baseUrl) {
      throw new Error('You must provide a link')
    }
    const compressedUrl = randomstring.generate({
      length: 9,
      capitalization: 'uppercase'
    })
    await this.redisClient.put(compressedUrl, baseUrl)
    return compressedUrl
  }
}

export default new ShortnerService(new RedisClient(REDIS_URL, REDIS_PORT))
