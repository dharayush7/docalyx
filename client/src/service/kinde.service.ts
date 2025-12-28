import response from "@/lib/response";
import axios, { isAxiosError } from "axios";

export async function updateUserProfile({
  name,
  userId,
}: {
  name: string;
  userId: string;
}) {
  try {
    const KINDE_MANAGEMENT_API = process.env.KINDE_MANAGEMENT_API;
    const KINDE_M2M_ACCESS_TOKEN = process.env.KINDE_M2M_ACCESS_TOKEN;

    const nameParts = name.split(" ");
    const family_name = nameParts.pop() || "";
    const given_name = nameParts.join(" ");

    if (!KINDE_MANAGEMENT_API || !KINDE_M2M_ACCESS_TOKEN) {
      throw new Error("Missing required environment variables");
    }

    const _apiResponse = await axios.patch(
      `${KINDE_MANAGEMENT_API}/v1/user`,
      {
        given_name,
        family_name,
      },
      {
        headers: {
          Authorization: `Bearer ${KINDE_M2M_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        params: {
          id: userId,
        },
      }
    );

    return response.success(null);
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Kinde API error:", error.response?.data);
      return response.error(error.response?.data);
    }
    return response.error("Failed to update user profile");
  }
}
