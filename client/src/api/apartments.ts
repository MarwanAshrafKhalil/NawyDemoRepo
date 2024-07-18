export async function fetchData() {
  try {
    const response = await fetch("http://localhost:5432/api/apartments/all", {
      method: "GET",
    });
    return await response.json();
  } catch (error) {
    return error;
  }
}

export async function fetchApartment(id: number) {
  try {
    const response = await fetch(
      `http://localhost:5432/api/apartments/unit/${id}`,
      {
        method: "GET",
      },
    );
    return await response.json();
  } catch (error) {
    return error;
  }
}
