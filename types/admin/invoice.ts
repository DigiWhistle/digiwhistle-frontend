export const PURCHASE_INVOICE_TABLE_PAGE_LIMIT = 3;
export type IPurchaseInvoice = {
  id: string;
  //   campaign: ICampaign;
  invoiceNo: string;
  pan: string;
  amount: number;
  igst: number;
  cgst: number;
  sgst: number;
  totalAmount: number;
  tds: number;
  tdsPercentage: number;
  tdsSection: string;
  finalAmount: number;
  amountToBeReceived: number;
  balanceAmount: number;
  //   paymentTerms: Enum.PaymentTerms;
  //   paymentStatus: Enum.InvoiceStatus;
  file?: string | null;
  //   influencerProfile?: IInfluencerProfile | null;
  //   agencyProfile?: IAgencyProfile | null;
  invoiceDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface ISaleInvoice {
  id: string;
  // campaign: ICampaign;
  gstTin: string;
  invoiceNo: string;
  invoiceDate: Date;
  amount: number;
  sgst: number;
  cgst: number;
  igst: number;
  total: number;
  tds: number;
  received: number;
  balanceAmount: number;
  month: string;
  // paymentStatus: Enum.InvoiceStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
