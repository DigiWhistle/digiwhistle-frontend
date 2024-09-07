import React from "react";
import CampaignCard from "./campaign-card";
import { campaigns } from "./constants";
const CampaignTable = () => {
  return (
    <div>
      {campaigns.map(campaign => (
        <CampaignCard data={campaign as any} key={campaign.code} />
      ))}
    </div>
  );
};

export default CampaignTable;
