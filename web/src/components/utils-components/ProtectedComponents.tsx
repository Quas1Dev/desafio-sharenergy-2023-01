import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserInterface } from "../../interfaces/GlobalInterface";

interface Props {
    user: UserInterface;
    redirectPath: string;
    children?: JSX.Element;
}

const ProtectedRoute: FC<Props> = ({user, redirectPath = "/", children }) => {
    if (!user._id) {
        return <Navigate to={redirectPath} />
    }
    return children ? children : <Outlet />;
};

export default ProtectedRoute;