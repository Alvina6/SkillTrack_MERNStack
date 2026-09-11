import { useEffect, useState } from "react";

import {
  createSkillApi,
  deleteSkillApi,
  getSkillsApi,
  updateSkillApi,
} from "../services/skillsApi";

export const useSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handle_getSkillsApi();
  }, []);

  const handle_getSkillsApi = async () => {
    setLoading(true);

    try {
      const response = await getSkillsApi();
      setSkills(response.skills || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handle_createSkillsApi = async (formData) => {
    try {
      await createSkillApi(formData);
      await handle_getSkillsApi();
    } catch (err) {
      console.log(err);
    }
  };

  const handle_updateSkillsApi = async (id, formData) => {
    try {
      await updateSkillApi({
        id,
        ...formData,
      });

      await handle_getSkillsApi();
    } catch (err) {
      console.log(err);
    }
  };

  const handle_deleteSkillsApi = async (id) => {
    try {
      await deleteSkillApi(id);
      await handle_getSkillsApi();
    } catch (err) {
      console.log(err);
    }
  };

  return {
    skills,
    loading,
    addSkill: handle_createSkillsApi,
    editSkill: handle_updateSkillsApi,
    deleteSkill: handle_deleteSkillsApi,
  };
};