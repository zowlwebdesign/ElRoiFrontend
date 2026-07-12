const fs = require('fs');

async function test() {
  const envFile = fs.readFileSync('.env.local', 'utf-8');
  const tokenMatch = envFile.match(/STRAPI_TOKEN="([^"]+)"/);
  const token = tokenMatch ? tokenMatch[1] : '';

  const query = `
  query ProductoBySlug($slug: String!) {
    productos(filters: { slug: { eq: $slug } }) {
      activo
      descripcion_corta
      descripcion_larga
      imagen_principal {
        url
      }
      nombre
      precio_base
      imagenes {
        url
        size
      }
      stock
      precio_descuento
      producto_principal
      locale
      slug
      categoria_producto {
        nombre
        slug
      }
    }
  }
  `;

  const res = await fetch('http://localhost:1337/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ query, variables: { slug: "test" } })
  });

  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

test();
