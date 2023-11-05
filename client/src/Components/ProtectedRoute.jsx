import { useKeycloak } from "@react-keycloak/web";

const ProtectedRoute = ({ children }) => {
    const { keycloak } = useKeycloak();

    const isLoggedIn = keycloak.authenticated;

    return isLoggedIn ? children : null;
};

export default ProtectedRoute;