import ShortenService from '../services/shorten'

class ShortenController {
  new (request, response) {
    response.render('index')
  }
  async index (request, response) {
    const {
      body: { link },
      headers: { host }
    } = request
    try {
      const compressedUrl = await ShortenService.getCompressedUrl(link)
      response.status(200).json({ url: `${host}/${compressedUrl}` })
    } catch (error) {
      response.boom.badRequest(error.message)
    }
  }

  async get (request, response) {
    const { url } = request.params
    const completedUrl = (await ShortenService.getCompletedUrl(url)) || '/'
    response.redirect(completedUrl)
  }
}

export default new ShortenController()
