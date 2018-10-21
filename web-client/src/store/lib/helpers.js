// REST verbs
const GET = 'get'
const PUT = 'put'
const POST = 'post'
const DELETE = 'delete'

// Defines requestHeaders object
const REQUEST_HEADERS = {
  'Content-Type': 'application/json'
}

// Defines request
function buildRequest (verb, options) {
  // Defines request headers
  let requestHeaders = { ...REQUEST_HEADERS }

  // Adds `Authorization` header to request if token parameter is defined
  if (options.token) requestHeaders['Authorization'] = `JWT ${options.token}`

  // Returns request object
  let req = { method: verb, headers: new Headers(requestHeaders) }

  // Appends body to request if it's defined
  if (options.body) req.body = JSON.stringify(options.body)

  // Returns the request
  return req
}

// TODO - this function should return the server-provided error messages
function handleErrors (response) {
  if (!response.ok) {
    throw Error(response)
  }
  return response
}

// // // //

// $POST helper function
export const $POST = function (url, options = {}) {
  return fetch(url, buildRequest(POST, options))
  .then(handleErrors)
  .then((response) => { return response.json() })
}

// // // //

// $GET Helper function
export const $GET = function (url, options = {}) {
  return fetch(url, buildRequest(GET, options))
  .then(handleErrors)
  .then((response) => { return response.json() })
}

// // // //

// $PUT helper function
export const $PUT = function (url, options = {}) {
  return fetch(url, buildRequest(PUT, options))
  .then(handleErrors)
  .then((response) => { return response.json() })
}

// // // //

// $DEL helper function
export const $DEL = function (url, options = {}) {
  return fetch(url, buildRequest(DELETE, options))
  .then(handleErrors)
  .then((response) => { return response.json() })
}
