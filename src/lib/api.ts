/**
 * Utilitários para requisições HTTP
 */

/**
 * Retorna headers com autenticação Bearer
 * @param token Token de autenticação
 * @returns Headers para requisições HTTP
 */
export function getHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`
  }
}

/**
 * Retorna headers com autenticação e content-type JSON
 * @param token Token de autenticação
 * @returns Headers para requisições HTTP
 */
export function getJsonHeaders(token: string) {
  return {
    ...getHeaders(token),
    'Content-Type': 'application/json'
  }
}

/**
 * Retorna headers para requisições multipart/form-data (upload)
 * @param token Token de autenticação
 * @returns Headers para requisições HTTP
 */
export function getFormHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data'
  }
}
