import express from 'express'
import { plainToClass } from 'class-transformer'
import { validate, validateOrReject, ValidationError } from 'class-validator'

import ShortenDto from './dto/shorten-dto'
import { IShortnerService } from '../services/shorten'

export default class ShortenController {
  constructor(private readonly service: IShortnerService) {
    this.create = this.create.bind(this)
    this.get = this.get.bind(this)
  }

  async create(request: express.Request, response: express.Response) {
    const { body } = request
    const dto = plainToClass(ShortenDto, body)
    try {
      await validateOrReject(dto)
    } catch (error) {
      const validationErr = error as ValidationError[]
      const errors = validationErr.map(({ property, constraints }) => ({
        [property]: constraints
      }))
      return response.status(400).send({ errors })
    }

    const url = await this.service.compress(body.url)
    return response.status(201).send({ url })
  }

  async get(request: express.Request, response: express.Response) {
    const { params } = request
    const { url } = params
    const completeUrl = await this.service.get(url)
    if (!completeUrl) {
      return response.status(404).send({ error: 'not found' })
    }

    return response.status(200).send({ url: completeUrl })
  }
}
