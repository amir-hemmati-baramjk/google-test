import { httpService } from "../httpService";
import { ApiResponse } from "../httpSercive.types";

export const uploadPictureService = async (
  file: File,
  mediaType: number = 0
): Promise<ApiResponse> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await httpService.post(
      `/picture/upload?mediaType=${mediaType}`,
      formData
    );

    return response;
  } catch (error: any) {
    return {
      success: false,
      errors: error.message || "Failed to upload picture",
      data: undefined,
    };
  }
};

export const updateProfilePictureService = async (
  pictureId: string
): Promise<ApiResponse> => {
  try {
    const response = await httpService.put(
      `/user/updateProfilePicture/${pictureId}`,
      null
    );

    return response;
  } catch (error: any) {
    return {
      success: false,
      errors: error.message || "Failed to update profile picture",
      data: undefined,
    };
  }
};

export const editProfilePictureService = async (
  file: File
): Promise<ApiResponse> => {
  try {
    const uploadResponse = await uploadPictureService(file, 0);

    if (!uploadResponse.success || !uploadResponse.data) {
      return {
        success: false,
        errors: uploadResponse.errors || "Failed to upload picture",
        data: undefined,
      };
    }
    const pictureId = uploadResponse.data.id;
    const updateResponse = await updateProfilePictureService(pictureId);
    if (!updateResponse.success) {
      return {
        success: false,
        errors: updateResponse.errors || "Failed to set as profile picture",
        data: undefined,
      };
    }

    return {
      success: true,
      data: uploadResponse.data,
      message: "Profile picture updated successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      errors: error.message || "Failed to update profile picture",
      data: undefined,
    };
  }
};
