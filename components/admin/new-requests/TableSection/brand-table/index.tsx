import React from "react";
import { Brand, columns } from "./brand-columns";
import SAMPLE_DATA from "./sample_data.json";
import { DataTable } from "./data-table";

const BrandTable = async () => {
  async function getData(): Promise<Brand[]> {
    // Fetch data from your API here.
    return SAMPLE_DATA;
  }
  const data = await getData();

  console.log(data);
  return (
    <div className="py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default BrandTable;
