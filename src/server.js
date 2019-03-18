import * as dotenv from 'dotenv'
import application from './app'

function main () {
  dotenv.config()
  const PORT = process.env.PORT || 8080
  application.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
  })
}

main()
