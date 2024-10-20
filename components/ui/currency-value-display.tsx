const CurrencyValueDisplay = ({ value }: { value: number | string }) => {
  if (typeof value === "string") {
    value = parseFloat(value);
  }
  const formatToIndianCurrencyWithSpace = (amount: number): string => {
    const formattedAmount = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

    // Add a space between the currency symbol and the value
    return formattedAmount;
  };

  const formattedBasicWithSpace = formatToIndianCurrencyWithSpace(value);

  if (isNaN(value)) {
    return <div className="">-</div>;
  }
  return <div className="">{formattedBasicWithSpace}</div>;
};

export default CurrencyValueDisplay;
