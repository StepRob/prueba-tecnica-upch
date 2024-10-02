
export default async function fetchGender(url) {
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

export const getUniqueGenders = (data) => {
  const genders = data.map((item) => item.gender);
  return [...new Set(genders)];
};
