"use client";
import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/lib/config/store";
import { usePathname, useSearchParams } from "next/navigation";
import { DataTable } from "./data-table";
import {
  ProfileControlTableData,
  ProfileControlTableLoading,
  fetchProfileControlTableData,
} from "@/store/admin/profile-control/ProfileControlSlice";
import { PROFILE_CONTROL_TABLE_PAGE_LIMIT } from "@/types/admin/ProfileControl";
import { createColumns } from "./profile-control-columns";
import {
  deleteProfileByID,
  updateIsPaused,
} from "@/store/admin/profile-control/ProfileControlSlice";
import { User } from "@/store/UserSlice";
const ProfileControlTable = () => {
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const user = useAppSelector(User);

  const dispatch: AppDispatch = useDispatch();
  const data = useAppSelector(ProfileControlTableData);
  const loading = useAppSelector(ProfileControlTableLoading);
  useEffect(() => {
    dispatch(
      fetchProfileControlTableData({
        page: Number(currentPath.split("/")[currentPath.split("/").length - 1]),
        limit: PROFILE_CONTROL_TABLE_PAGE_LIMIT,
      }),
    );
  }, []);
  const deleteProfile = useCallback(
    (userId: string) => {
      dispatch(deleteProfileByID(userId));
    },
    [dispatch],
  );
  const setIsPaused = useCallback(
    (userId: string, data: { isPaused: boolean }) => {
      dispatch(updateIsPaused({ userId: userId, isPaused: data.isPaused }));
    },
    [dispatch],
  );

  const columns = useMemo(() => createColumns(deleteProfile, setIsPaused, user?.role), []);
  return (
    <div className="py-5">
      {loading ? (
        <div className="flex w-full items-center h-48 justify-center">
          <span className="loading loading-spinner loading-sm "></span>
        </div>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  );
};

export default ProfileControlTable;
