import { Button } from "@/components/ui/button";
import { POST } from "@/lib/config/axios";
import React from "react";
import { toast } from "sonner";

const SendAgreement = ({
  isAgreementSent,
  userId,
}: {
  isAgreementSent: boolean;
  userId: string;
}) => {
  const [agreement, setAgreement] = React.useState(isAgreementSent);
  if (agreement) {
    return <div className="text-success text-center">Agreement Sent</div>;
  }

  return (
    <Button
      onClick={async () => {
        const response = await POST("agreement", {
          userId: userId,
        });
        if (response.error) {
          toast.error("Failed to send agreement");
        } else {
          toast.success("Agreement sent");
          setAgreement(true);
        }
      }}
    >
      Send Agreement
    </Button>
  );
};

export default SendAgreement;
