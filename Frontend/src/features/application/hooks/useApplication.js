import { useState, useEffect } from "react";
import {
  createApplicationApi,
  deleteApplicationApi,
  getApplicationsApi,
  updateApplicationApi,
} from "../services/application.api";

export const useApplication = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handle_getApplicationApi();
  }, []);

  const handle_getApplicationApi = async () => {
    setLoading(true);
    try {
      const response = await getApplicationsApi();
      setApplications(response.applications); // 👈 nested property nikalo
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handle_createApplicationApi = async (formData) => {
    try {
      await createApplicationApi(formData);
      await handle_getApplicationApi(); // 👈 list refresh
    } catch (err) {
      console.log(err);
    }
  };

  const handle_updateApplicationApi = async (id, formData) => {
    try {
      await updateApplicationApi({ id, ...formData });
      await handle_getApplicationApi();
    } catch (err) {
      console.log(err);
    }
  };

  const handle_deleteApplicationApi = async (id) => {
    try {
      await deleteApplicationApi(id);
      await handle_getApplicationApi();
    } catch (err) {
      console.log(err);
    }
  };

  return {
    applications,
    loading,
    addApplication: handle_createApplicationApi,
    editApplication: handle_updateApplicationApi,
    removeApplication: handle_deleteApplicationApi,
  };
};