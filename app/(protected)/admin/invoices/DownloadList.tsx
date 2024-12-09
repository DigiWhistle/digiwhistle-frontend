"use client";

import { POST } from "@/lib/config/axios";
import { formatDateWithZeroTime } from "@/lib/utils";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { usePathname, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const DownloadList = () => {
  const currentPath = usePathname();
  const searchParams = useSearchParams();

  const startTime = searchParams.get("startTime")
    ? formatDateWithZeroTime(new Date(searchParams.get("startTime")!))
    : formatDateWithZeroTime(new Date(new Date().setFullYear(new Date().getFullYear() - 1)));

  const endTime = searchParams.get("endTime")
    ? formatDateWithZeroTime(new Date(searchParams.get("endTime")!))
    : formatDateWithZeroTime(new Date());

  const invoiceType = currentPath.split("/")[currentPath.split("/").length - 2] as
    | "sale"
    | "proforma";

  const downloadLink = `invoice/${invoiceType}/download`;

  const handleClick = async () => {
    const response: any = await POST(downloadLink, {
      startDate: startTime,
      endDate: endTime,
    });
    if (response.error) {
      toast.error("Cannot  download invoice list");
      return;
    }
    window.open(response.data?.url, "_blank");
  };

  if (invoiceType === "proforma") {
    return null;
  }
  return (
    <button className="flex items-center gap-2 mr-2" onClick={handleClick}>
      <ArrowDownTrayIcon className="w-5 h-5" />
      Download List
    </button>
  );
};

export default DownloadList;
