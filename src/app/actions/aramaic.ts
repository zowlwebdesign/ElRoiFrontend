"use server";

export async function translateAramaicName(name: string) {
  if (!name || name.trim() === '') return null;

  const strapiUrl = process.env.STRAPI_URL || 'http://localhost:1337';
  const token = process.env.STRAPI_TOKEN;

  try {
    const url = `${strapiUrl}/api/fuzzy-search/search?query=${encodeURIComponent(name.trim())}`;
    
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store'
    });

    if (!res.ok) {
      console.error("Strapi error:", res.status, res.statusText);
      return null;
    }

    const data = await res.json();
    
    // El plugin devuelve los resultados dentro de un arreglo con la llave del nombre de la colección.
    // Revisamos 'diccionario-arameo', 'nombre-arameos' y 'nombre-arameo' para asegurar compatibilidad.
    const aramaicResults = data['diccionario-arameo'] || data['nombre-arameos'] || data['nombre-arameo'];
    
    if (aramaicResults && aramaicResults.length > 0) {
      const item = aramaicResults[0];
      return item.attributes ? item.attributes : item;
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching from Strapi:", error);
    return null;
  }
}
