import axios from "../../utils/CustomizeApi";

export const getAllUser = async () => {
  try {
    const response = await axios.get("/admin/getAllUser", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch users");
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`/admin/delete/${userId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete user");
  }
};

export const changeRole = async (userId, newRole) => {
  try {
    const response = await axios.post(
      `/admin/changeRole/${userId}`,
      { newRole },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to change user role"
    );
  }
};


export const changeStatus = async (userId, status) => {
  try {
    const response = await axios.put(`/admin/changeStatus/${userId}`, { status }, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to change status user");
  }
};

