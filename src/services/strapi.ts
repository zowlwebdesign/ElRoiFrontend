const STRAPI_URL = process.env.STRAPI_URL ?? 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

/**
 * Función base para hacer consultas GraphQL a Strapi.
 * Centraliza la URL base y el token de autorización para no repetirlos
 * en cada servicio.
 */
export async function query<T = unknown>(gqlQuery: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${STRAPI_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify({ query: gqlQuery, variables }),
    cache: 'no-store', // Temporalmente sin caché para desarrollo
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`Strapi error: ${res.status} ${res.statusText} - ${errorText}`);
    throw new Error(`Error en petición a Strapi: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}
