export default async function fetchCountry(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: { "content-type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Error al obtener los datos");
  }
  const data = await response.json();
  return data;
}

export const getUniqueCountry = (data) => {
  const countrys = data.map((item) => item.country);
  return [...new Set(countrys)];
};
