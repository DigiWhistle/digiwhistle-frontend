"use client";

import React, { useEffect } from "react";
import { GET } from "@/lib/config/axios";
import { IUser, setUser, User } from "@/store/UserSlice";
import { getCookie, setCookie } from "cookies-next";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useDispatch } from "react-redux";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // TODO: add user context
  const dispatch = useDispatch();
  const user = useSelector(User);
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) {
        if (getCookie("token")) {
          const response = await GET<IUser>(`user`);
          if (response.data) {
            dispatch(setUser(response.data));
            setCookie("role", response.data.role);
          } else if (response.error) {
            toast.error(response.error);
          }
        }
      }
    };

    fetchUserProfile();
  }, [dispatch, user]);

  return <>{children}</>;
};

export default UserProvider;
