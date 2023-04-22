export const getUsers = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users`);
  return await res.json();
};

export const forgotPassword = async ({ email }) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/forgotpassword`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    }
  );
  return await res.json();
};

export const verifyLink = async (id, token) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/resetpassword/${id}/${token}`
  );
  return await res.json();
};

export const updatePassword = async ({ id, token, password }) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/resetpassword/${id}/${token}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
      }),
    }
  );
  return await res.json();
};

export const signUpUser = async ({ name, email, password }) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
  return await res.json();
};

export const loginUser = async ({ email, password }) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  return await res.json();
};
