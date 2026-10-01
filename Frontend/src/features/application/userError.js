export function getUserErrorMessage(error, fallback) {
  const status = error?.response?.status;
  const responseMessage = error?.response?.data?.message;

  if (status === 401) return "Your session has expired. Please sign in again.";
  if (status === 403) return "You don't have permission to do that.";
  if (status === 404) return "This item could not be found. Refresh and try again.";
  if (status === 409) return responseMessage || "This change conflicts with existing information.";
  if (status >= 500) return "Something went wrong on our side. Please try again.";
  if (!error?.response) return "We couldn't reach SkillTrack. Check your connection and try again.";
  if (typeof responseMessage === "string" && responseMessage.trim()) {
    return responseMessage;
  }

  return fallback;
}