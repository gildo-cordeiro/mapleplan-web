import { getHeaders } from "@/lib/api"
import { User } from "@/types"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL


export const userService = {

    getCompleteUser: async (token: string): Promise<User> => {
    const response = await axios.get(`${API_URL}/user/complete-user`, {
      headers: getHeaders(token)
    })
    return response.data
  },

}