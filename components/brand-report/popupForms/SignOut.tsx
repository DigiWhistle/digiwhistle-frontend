"use client";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { setCookie } from "cookies-next";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearUser } from "@/store/UserSlice";
import CancelButton from "@/components/ui/customAlertDialog/CancelButton";
import ActionButton from "@/components/ui/customAlertDialog/ActionButton";
const SignOut = () => {
  const [checkState, checkSetter] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = () => {
    router.push("/login");
    dispatch(clearUser());
    deleteCookie("role");
    deleteCookie("token");
    if (checkState) {
      setCookie("Signout", true, { maxAge: 60 * 60 * 24 * 10000 });
    }
  };

  return (
    <div className="flex flex-col pt-5 border-t-2 space-y-4">
      <div className="flex gap-2">
        <Checkbox
          className="border-tc-ic-black-disabled "
          checked={checkState}
          onCheckedChange={() => checkSetter(!checkState)}
        />
        <div className="text-body-sm-light text-tc-body-grey ">
          Don’t show this dialog box again.
        </div>
      </div>
      <div className="flex gap-3">
        <CancelButton />
        <ActionButton onClick={handleLogout}>Signout</ActionButton>
      </div>
    </div>
  );
};

export default SignOut;
