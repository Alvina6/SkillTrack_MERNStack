import { useState, useEffect, useCallback } from "react";
import {
  createApplicationApi,
  deleteApplicationApi,
  getApplicationsApi,
  updateApplicationApi,
} from "../services/application.api";
import { getUserErrorMessage } from "../userError";

export const useApplication = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handle_getApplicationApi = useCallback(async () => {
    try {
      const response = await getApplicationsApi();
      setApplications(response.applications || []);
    } catch (requestError) {
      setError(getUserErrorMessage(requestError, "We couldn't load your applications."));
      return false;
    } finally {
      setLoading(false);
    }
    return true;
  }, []);

  useEffect(() => {
    handle_getApplicationApi();
  }, [handle_getApplicationApi]);

  const handle_createApplicationApi = async (formData) => {
    setError("");
    try {
      await createApplicationApi(formData);
      await handle_getApplicationApi();
      return true;
    } catch (requestError) {
      setError(getUserErrorMessage(requestError, "We couldn't save this application."));
      return false;
    }
  };

  const handle_updateApplicationApi = async (id, formData) => {
    setError("");
    try {
      await updateApplicationApi({ id, ...formData });
      await handle_getApplicationApi();
      return true;
    } catch (requestError) {
      setError(getUserErrorMessage(requestError, "We couldn't update this application."));
      return false;
    }
  };

  const handle_deleteApplicationApi = async (id) => {
    setError("");
    try {
      await deleteApplicationApi(id);
      await handle_getApplicationApi();
      return true;
    } catch (requestError) {
      setError(getUserErrorMessage(requestError, "We couldn't delete this application."));
      return false;
    }
  };

  return {
    applications,
    loading,
    error,
    clearError: () => setError(""),
    addApplication: handle_createApplicationApi,
    editApplication: handle_updateApplicationApi,
    removeApplication: handle_deleteApplicationApi,
  };
};