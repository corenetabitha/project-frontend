export const registerUserAPI = async (userData) => {
  const response = await fetch("https://booked-render.onrender.com/api/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Registration failed");
  }

  return await response.json();
};

export const loginUserAPI = async (credentials) => {
  const response = await fetch("https://booked-render.onrender.com/api/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Login failed");
  }

  return await response.json();
};
