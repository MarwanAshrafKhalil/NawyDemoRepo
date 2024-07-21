export async function postApartment(data: FormData) {
  try {
    const response = await fetch(
      "http://192.168.1.13:5432/api/apartments/add",
      {
        method: "POST",
        body: data,
      }
    );
    return await response.json();
  } catch (error) {
    return error;
  }
}

export async function fetchData() {
  try {
    const response = await fetch(
      "http://192.168.1.13:5432/api/apartments/all",
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function fetchApartment(id: number) {
  try {
    const response = await fetch(
      "http://192.168.1.13:5432/api/apartments/unit/${id}",
      {
        method: "GET",
      }
    );
    return await response.json();
  } catch (error) {
    return error;
  }
}
