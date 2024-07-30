import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

export const mobileNoSchema = z.string().refine(
  value => {
    // Add the '+' back if it's not there, as isValidPhoneNumber expects it
    const phoneNumberToValidate = value.startsWith("+") ? value : `+${value}`;
    return isValidPhoneNumber(phoneNumberToValidate);
  },
  {
    message: "Invalid phone number",
  },
);
