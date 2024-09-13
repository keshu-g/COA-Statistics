module.exports = {
  FETCH: [200, ":item fetched successfully."],
  LOGIN: [200, "Login successfull."],
  SUCCESS: [200, ":item sent successfully."],
  ADD_SUCCESS: [200, ":item added successfully."],
  STATUS_SUCCESS: [200, ":item status updated successfully."],
  UPDATE_SUCCESS: [200, ":item updated successfully."],
  RESET_SUCCESS: [200, ":item reset successfully."],
  DELETE_SUCCESS: [200, ":item deleted successfully."],
  SENT_SUCCESS: [200, ":item sent successfully."],
  CUSTOM_SUCCESS: [200, ":item."],

  CUSTOM_ERROR: [400, ":item."],
  SENT_ERROR: [400, "Couldn't sent :item."],
  ADD_ERROR: [400, "Couldn't create :item."],
  STATUS_ERROR: [400, "Couldn't update status as being used in :item."],
  UPDATE_ERROR: [400, "Couldn't update :item."],
  DELETE_ERROR: [400, "Couldn't remove :item."],
  REQUIRED: [400, ":item is required."],
  EXISTS: [400, ":item already exists."],
  EMAIL_EXISTS: [400, "User with this emailID already exists."],
  EXPIRED: [400, "Invalid/Expired :item, please try again."],
  PASS_EXPIRED: [400, "Password has been expired. Please check your email"],
  USED_PASSWORD: [
    400,
    "Password has been used in past, please create a new one.",
  ],
  INVALID_AUTH: [400, "Invalid Email or Password"],
  INVALID: [400, "Invalid :item."],
  UNAUTHORIZED: [401, ":item is unauthorized. Please login again."],
  FORBIDDEN: [403, "Not today.."],
  NOT_FOUND: [404, ":item not found."],

  SERVER_ERROR: [500, "Something went wrong. Please try again later."],
};
