export default async function fetchData(url) {
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
