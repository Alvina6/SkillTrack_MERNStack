import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
const Protected = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <main>
        <h1>loading ....</h1>
      </main>
    );
  }

  if (!user) {
    <Navigate to={"/login"} />;
  }

  return children;
};

export default Protected;
