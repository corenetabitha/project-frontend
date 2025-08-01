export const requestReturn = async (lendingId, data) => {
    try {
      const response = await fetch(`https://booked-render.onrender.com/api/return-request/${lendingId}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit return request");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Return request error:", error);
      throw error;
    }
  };
  

  export const getUserOrders = async () => {
    const token = localStorage.getItem("access");
  
    try {
      const response = await fetch("https://booked-render.onrender.com/api/orders/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch user orders");
      }
  
      return await response.json();
    } catch (error) {
      console.error("getUserOrders error:", error);
      throw error;
    }
  };
  