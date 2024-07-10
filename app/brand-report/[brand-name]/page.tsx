"use client";
import React from "react";
import "./print.css";
import Image from "next/image";
import ReportTitle from "@/components/brand-report/ReportTitle";
import DataCards from "@/components/brand-report/DataCard";
import DataCard from "@/components/brand-report/DataCard";

const InflucenerArray = [
  {
    name: "Anmol Sharma",
    image: "/assets/testimonials/card.webp",
    reelViews: 1000,
    linkClicks: 500,
    shares: 200,
    saves: 100,
    storyViews: "5k",
  },
  {
    name: "Anmol Sharma",
    image: "/assets/testimonials/card.webp",
    reelViews: 1000,
    linkClicks: 500,
    shares: 200,
    saves: 100,
    storyViews: "5k",
  },
  {
    name: "Anmol Sharma",
    image: "/assets/testimonials/card.webp",
    reelViews: 1000,
    linkClicks: 500,
    shares: 200,
    saves: 100,
    storyViews: "5k",
  },
  {
    name: "Anmol Sharma",
    image: "/assets/testimonials/card.webp",
    reelViews: 1000,
    linkClicks: 500,
    shares: 200,
    saves: 100,
    storyViews: "5k",
  },
  {
    name: "Anmol Sharma",
    image: "/assets/testimonials/card.webp",
    reelViews: 1000,
    linkClicks: 500,
    shares: 200,
    saves: 100,
    storyViews: "5k",
  },
];

const page = () => {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <nav className="flex justify-between items-center p-8 border bg-yellow-101 w-full">
        <h3>Digiwhistle</h3>
        <button onClick={() => window.print()}>Download Report</button>
      </nav>
      <section
        id="pdf-content"
        className=" print-content w-[750px] h-auto flex flex-col items-center gap-8 border border-gray-200 my-10 rounded-lg p-0"
      >
        {/*This is the page 1 content*/}
        <div id="main_section_print" className=" relative w-full overflow-hidden">
          <div className="absolute h-32 w-32 md:h-44  md:w-44 bg-[#FFEEA3] rounded-full -z-10 top-44 blur-2xl"></div>
          <div className="absolute  h-32 w-32 md:h-44 md:w-44 bg-[#F4BBEA] rounded-full -z-10 top-0 right-20 blur-2xl"></div>

          <div className="container w-[450px] flex flex-col items-center gap-6 mt-32">
            <Image src={"/assets/navbar/logo.svg"} width={100} height={50} alt="digiwhistle logo" />
            <h1 className="text-4xl font-bold text-tc-primary-default text-center">
              Influencer Marketing Campaign Report
            </h1>
            <div className="flex items-center gap-3 ">
              <div className=" w-full rounded-2xl bg-gradient-2 p-0.5">
                <div className="flex h-full w-full items-center justify-center p-3 bg-white  rounded-[15px]">
                  <Image
                    src={"/assets/navbar/logo.svg"}
                    className="h-7 w-auto"
                    width={200}
                    height={100}
                    alt="Digiwhistle Logo"
                  />
                </div>
              </div>

              <p className="text-3xl text-tc-primary-default">X</p>
              <div className=" w-full rounded-2xl bg-gradient-2 p-0.5">
                <div className="flex h-full w-full items-center justify-center p-3 bg-white  rounded-[15px]">
                  <Image
                    src={"/assets/brands/airtel.webp"}
                    className="h-7 w-auto"
                    width={200}
                    height={100}
                    alt="Digiwhistle Logo"
                  />
                </div>
              </div>
            </div>
            <Image
              src={"/assets/brand-report/hero-section-image.png"}
              className="h-52 w-auto"
              width={20000}
              height={10000}
              alt="hero section image"
            />
          </div>
        </div>

        <div
          id="first_page"
          className="page-break w-[650px] bg-sb-blue-580 p-10 flex flex-col rounded-2xl "
        >
          <ReportTitle title="Live Creators" />
          <div className="flex flex-wrap gap-6 items-center justify-center mt-12">
            {InflucenerArray.map((data, index) => (
              <div className="flex flex-col items-center gap-3" key={index}>
                <Image src={data.image} width={150} height={150} alt="influencer image" />
                <p className="font-semibold text-tc-primary-default">{data.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/*This is the page 2 content */}
        <div
          id="second_page"
          className=" page-break w-[650px] p-10 flex flex-col gap-12 rounded-2xl "
        >
          <ReportTitle title="MS Accounting Campaign Report" />
          <div className="spacer_print space-y-6">
            <div className="border rounded-2xl overflow-hidden">
              <p className="w-full text-center py-3 bg-yellow-561">Campaign CPV</p>
              <p className="w-full text-center py-3">0.7</p>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-gray-555">
              <table className=" tables_print min-w-full divide-y divide-gray-555">
                <thead className=" bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Creators
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Reel Views
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Link Clicks
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Shares
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Saves
                    </th>
                    {/* <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Story Views
                    </th> */}
                  </tr>
                </thead>
                <tbody className=" bg-white divide-y divide-gray-555">
                  {InflucenerArray.map((data, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{data.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{data.reelViews}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{data.linkClicks}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{data.shares}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{data.saves}</div>
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{data.storyViews}</div>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div
          id="uscpa"
          className="page-break w-[650px] p-10 flex flex-col gap-12 rounded-2xl bg-sb-blue-580"
        >
          <ReportTitle title="US CPA Campaign Report" />
          <div className="spacer_print space-y-6">
            <DataCard title="Campaign CPV" value={"0.7"} />
            <div className="tables_print overflow-x-auto rounded-2xl border border-gray-555">
              <table className=" min-w-full divide-y divide-gray-555">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Creators
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Reel Views
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Link Clicks
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Shares
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Saves
                    </th>
                    {/* <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Story Views
                    </th> */}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-555">
                  {InflucenerArray.map((data, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{data.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{data.reelViews}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{data.linkClicks}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{data.shares}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{data.saves}</div>
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{data.storyViews}</div>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="page-break w-[650px] py-10 flex flex-col gap-12 rounded-2xl ">
          <ReportTitle title="Campaign Report" />
          <div className="spacer_print flex gap-2 items-center">
            <div className="w-full flex flex-wrap items-center justify-center gap-4">
              <DataCard title="Total Creators" value={"5"} />
              <DataCard title="Total Reach" value={"2,66,668"} />
              <DataCard title="Link Clicks" value={"2,456"} />
              <DataCard title="Reach" value={"2,66,668"} />
              <DataCard title="Registrations" value={"2,66,668"} />
              <DataCard title="Visitors" value={"5,445"} />
            </div>
            <Image
              src={"/assets/brand-report/graph.png"}
              width={150}
              height={150}
              alt="influencer image"
            />
          </div>
          <div className="spacer_print flex flex-col items-center gap-2">
            <Image src={"/assets/navbar/logo.svg"} width={100} height={50} alt="digiwhistle logo" />
            <p className="text-gray-557 text-xs">
              Copyright © 2023 DigiWhistle, All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
