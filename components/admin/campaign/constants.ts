import { uuid } from "uuidv4";
export const campaigns = [
  {
    id: uuid(),
    name: "Summer Campaign 2024",
    code: "SC2024",
    invoice: "NJKDC78432",
    brandName: "BrandX",
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-09-01"),
    commercial: 50000,
    incentiveWinner: "Aman Maurya (+5%)", // handled on backend
    status: "active",
    participants: [
      {
        id: uuid(),
        type: "influencer",
        name: "John Doe",
        exclusive: true,
        commercialBrand: 10000,
        commercialCreator: 7000,
        toBeGiven: 5000,
        margin: 2000,
        paymentStatus: "Pending",
        invoiceStatus: "Not Generated",
        invoice: null,
        deliverables: [
          {
            id: uuid(),
            title: "Instagram Post",
            platform: "instagram",
            campaignStatus: "Live",
            deliverableLink: "https://instagram.com/deliverable_link",
            er: 5.2,
            cpv: 3.4,
          },
          {
            id: uuid(),

            title: "YouTube Video",
            platform: "youtube",
            campaignStatus: "Not Live",
            deliverableLink: "https://youtube.com/deliverable_link",
            er: 6.7,
            cpv: 4.2,
          },
        ],
      },
      {
        id: uuid(),
        type: "agency",
        name: "AgencyX",
        commercialBrand: 20000,
        commercialCreator: 15000,
        toBeGiven: 12000,
        margin: 3000,
        paymentStatus: "All Paid",
        invoiceStatus: "Generated",
        invoice: "INV-1234",
        influencer: [
          {
            id: uuid(),
            name: "Jane Smith",
            deliverables: [
              {
                id: uuid(),
                title: "Twitter Post",
                platform: "x",
                campaignStatus: "Live",
                deliverableLink: "https://twitter.com/deliverable_link",
                er: 4.5,
                cpv: 2.8,
              },
              {
                id: uuid(),
                title: "TikTok Video",
                platform: "youtube",
                campaignStatus: "Not Live",
                deliverableLink: "https://tiktok.com/deliverable_link",
                er: 7.1,
                cpv: 5.0,
              },
            ],
          },
        ],
      },
    ],
  },
];
