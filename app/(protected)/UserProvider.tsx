import React, { useEffect } from "react";
import { getAuthorizedRequest } from "@/lib/config/axios";
import { IUser, setUser, User } from "@/store/UserSlice";
import { getCookie } from "cookies-next";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // TODO: add user context
  const user = useSelector(User);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) {
        if (getCookie("token") && getCookie("role")) {
          const role = getCookie("role");
          const response = await getAuthorizedRequest<IUser>(`${role}/profile`);

          if (response.data) {
            dispatch(setUser(response.data));
          } else if (response.error) {
            toast.error(response.error);
          }
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  return <>{children}</>;
};

export default UserProvider;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
