export const getItems = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/items`);
  return await res.json();
};

export const createItem = async ({
  itemName,
  category,
  price,
  image,
  token,
}) => {
  console.log(itemName, category, price, image);
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/items`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      itemName,
      category,
      price,
      image,
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
