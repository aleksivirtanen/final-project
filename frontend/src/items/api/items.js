export const getItems = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/items`);
  return await res.json();
};

export const getMyItems = async (token) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/items/myitems`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return await res.json();
};

export const createItem = async ({
  itemName,
  description,
  category,
  price,
  image,
  token,
}) => {
  console.log(itemName, description, category, price, image);
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/items`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      itemName,
      description,
      category,
      price,
      image,
    }),
  });
  return await res.json();
};

export const editItem = async ({
  id,
  itemName,
  description,
  price,
  token,
}) => {
  console.log(id, itemName, description, price);
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/items/${id}`, {
    method: "PUT",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      id,
      itemName,
      description,
      price,
    }),
  });
  return await res.json();
};

export const deleteItem = async ({ id, token }) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/items/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return await res.json();
};
