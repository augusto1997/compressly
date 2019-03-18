const form = document.getElementById('form')
const button = document.getElementById('button')
const inputField = document.querySelector('input[name="url"]')

form.addEventListener('submit', handleFormSubmit)

function handleFormSubmit (event) {
  event.preventDefault()
  const { value } = event.target.url
  if (!value || button.hasAttribute('value')) {
    return
  }
  button.classList.add('running')
  changeCurrentLinkForm(value)
}

async function changeCurrentLinkForm (link) {
  const { url } = await getGeneratedURL(link)
  inputField.value = url
  button.setAttribute('value', 'copy')
  button.textContent = 'Copy'
  button.addEventListener('click', copyLinkToClipboard)
  button.classList.remove('running')
}

function copyLinkToClipboard () {
  inputField.select()
  document.execCommand('copy')
  resetFormBehaviour()
}

function resetFormBehaviour () {
  button.textContent = 'Go'
  inputField.value = ''
  button.removeAttribute('value')
  button.removeEventListener('click', copyLinkToClipboard)
}

async function getGeneratedURL (link) {
  const response = await window.fetch('http://localhost:8080/', {
    method: 'Post',
    body: JSON.stringify({ link }),
    headers: { 'content-type': 'application/json' }
  })
  const responseJSON = await response.json()
  return responseJSON
}
