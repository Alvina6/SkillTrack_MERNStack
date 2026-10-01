import { useCallback, useEffect, useState } from "react";

import {
  createSkillApi,
  deleteSkillApi,
  getSkillsApi,
  updateSkillApi,
} from "../services/skillsApi";
import { getUserErrorMessage } from "../userError";

export const useSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handle_getSkillsApi = useCallback(async () => {
    try {
      const response = await getSkillsApi();
      setSkills(response.skills || []);
    } catch (requestError) {
      setError(getUserErrorMessage(requestError, "We couldn't load your skills."));
      return false;
    } finally {
      setLoading(false);
    }
    return true;
  }, []);

  useEffect(() => {
    handle_getSkillsApi();
  }, [handle_getSkillsApi]);

  const handle_createSkillsApi = async (formData) => {
    setError("");
    try {
      await createSkillApi(formData);
      await handle_getSkillsApi();
      return true;
    } catch (requestError) {
      setError(getUserErrorMessage(requestError, "We couldn't save this skill."));
      return false;
    }
  };

  const handle_updateSkillsApi = async (id, formData) => {
    setError("");
    try {
      await updateSkillApi({
        id,
        ...formData,
      });

      await handle_getSkillsApi();
      return true;
    } catch (requestError) {
      setError(getUserErrorMessage(requestError, "We couldn't update this skill."));
      return false;
    }
  };

  const handle_deleteSkillsApi = async (id) => {
    setError("");
    try {
      await deleteSkillApi(id);
      await handle_getSkillsApi();
      return true;
    } catch (requestError) {
      setError(getUserErrorMessage(requestError, "We couldn't delete this skill."));
      return false;
    }
  };

  return {
    skills,
    loading,
    error,
    clearError: () => setError(""),
    addSkill: handle_createSkillsApi,
    editSkill: handle_updateSkillsApi,
    deleteSkill: handle_deleteSkillsApi,
  };
};