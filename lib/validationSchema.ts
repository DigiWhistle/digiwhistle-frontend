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
export const termsCheckSchema = z.boolean().refine(val => val === true, {
  message: "You must agree to the terms",
});

export const instagramURL = z
  .string()
  .optional()
  .refine(
    value => !value || /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9_.-]+\/?$/.test(value),
    {
      message: "Please provide a valid Instagram URL",
    },
  );
export const youtubeURL = z
  .string()
  .optional()
  .refine(
    value =>
      !value ||
      /^(https?:\/\/)?(www\.)?youtube\.com\/(channel\/|c\/|user\/|@)[\w-]{1,}/.test(value),
    {
      message: "Please provide a valid YouTube channel or user URL",
    },
  );
export const twitterURL = z
  .string()
  .optional()
  .refine(
    value =>
      !value || /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/[A-Za-z0-9_]+\/?$/.test(value),
    {
      message: "Please provide a valid X (Twitter) URL",
    },
  );

export const linkedinURL = z
  .string()
  .optional()
  .refine(
    value =>
      !value ||
      /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[A-Za-z0-9_-]+\/?$/.test(value),
    {
      message: "Please provide a valid LinkedIn URL",
    },
  );
