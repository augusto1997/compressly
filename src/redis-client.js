import { promisify } from 'util'
import redis from 'redis'

class RedisClient {
  constructor (urlConnection) {
    this.client = redis.createClient(urlConnection)
    this.setupRedisWithPromises()
  }

  setupRedisWithPromises () {
    this.client.get = promisify(this.client.get).bind(this.client)
    this.client.set = promisify(this.client.set).bind(this.client)
    this.client.setExpirationTimeToKey = promisify(this.client.expire).bind(
      this.client
    )
  }

  async put (key, item) {
    await this.client.set(key, item)
    await this.setExpirationTimeToKey(key, 60)
  }

  async get (key) {
    const item = await this.client.get(key)
    return item
  }

  async setExpirationTimeToKey (key, timeInSeconds) {
    await this.client.expire(key, timeInSeconds)
  }
}

export default RedisClient
