import { useEffect, useState } from "react";

import {
  getMeAPI,
  updateProfileAPI,
  changePasswordAPI,
} from "../services/profile.api";

export const useProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =========================
     GET PROFILE
  ========================= */

  const handleGetProfile = async () => {
    setLoading(true);

    try {
      const response = await getMeAPI();

      setUser(response.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     UPDATE PROFILE
  ========================= */

  const handleUpdateProfile = async (formData) => {
    setLoading(true);

    try {
      const response = await updateProfileAPI(formData);

      setUser(response.user);

      return response;
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     CHANGE PASSWORD
  ========================= */

  const handleChangePassword = async ({
    currentPassword,
    newPassword,
  }) => {
    return changePasswordAPI({ currentPassword, newPassword });
  };

  /* =========================
     LOAD PROFILE ONCE
  ========================= */

  useEffect(() => {
    let isCurrent = true;

    getMeAPI()
      .then((response) => {
        if (isCurrent) setUser(response.user);
      })
      .catch(() => {
        if (isCurrent) setUser(null);
      })
      .finally(() => {
        if (isCurrent) setLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  return {
    user,
    loading,

    getProfile: handleGetProfile,

    updateProfile: handleUpdateProfile,

    changePassword: handleChangePassword,
  };
};