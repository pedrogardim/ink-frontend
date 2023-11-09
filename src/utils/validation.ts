const INT_REGEX = /^-?\d+$/;
const URL_REGEX =
  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
const DESC_REGEX = /^.{1,256}$/;
const NAME_REGEX = /^[a-zA-Z\u00C0-\u017F ]+$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])([A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]){6,20}$/;
const PHONE_NUMBER_REGEX = /^[0-9]{9}$/;

type ValidationRules = {
  [key: string]: {
    validation: (data: any) => boolean;
    required?: boolean;
    customMessage?: string;
  };
};

export const appointmentsRules: ValidationRules = {
  startTime: {
    validation: (date) => !isNaN(Date.parse(date)),
    required: true,
  },
  endTime: {
    validation: (date) => !isNaN(Date.parse(date)),
    required: true,
  },
  tattooistId: {
    validation: (id) => INT_REGEX.test(id),
    required: true,
  },
  description: {
    validation: (desc) => DESC_REGEX.test(desc) && typeof desc === "string",
  },
  imageUrl: {
    validation: (url) => URL_REGEX.test(url),
  },
  type: {
    validation: (type) => type === "tattoo" || type === "piercing",
  },
};

export const tattooWorkRules: ValidationRules = {
  description: {
    validation: (desc) => DESC_REGEX.test(desc),
    required: true,
  },
  imageUrl: {
    validation: (url) => URL_REGEX.test(url),
    required: false,
  },
  type: {
    validation: (type) => ["tattoo", "piercing"].includes(type),
    required: true,
  },
};

export const userRules: ValidationRules = {
  firstName: {
    validation: (id) => NAME_REGEX.test(id),
    required: true,
  },
  lastName: {
    validation: (id) => NAME_REGEX.test(id),
    required: true,
  },
  email: {
    validation: (id) => EMAIL_REGEX.test(id),
    required: true,
    customMessage: `Must contain an @, and a valid domain`,
  },
  password: {
    validation: (id) => PASSWORD_REGEX.test(id),
    required: true,
    customMessage: `Must contain letters, numbers, symbols and have between 6 and 20 characters`,
  },
  phoneNumber: {
    validation: (id) => PHONE_NUMBER_REGEX.test(id),
    required: true,
  },
  profilePicUrl: {
    validation: (id) => URL_REGEX.test(id),
  },
  role: {
    validation: (type) =>
      ["client", "tattooist", "admin", "super_admin"].includes(type),
  },
};

export const validationRules = {
  user: userRules,
  appointment: appointmentsRules,
  tattoWork: tattooWorkRules,
};

export type ValidationEntity = "user" | "appointment" | "tattoWork";

export const validateField = (
  key: string,
  value: any,
  entity: ValidationEntity
) => {
  const rule = validationRules[entity][key];

  if (rule.required && !value && value !== 0)
    return `${key[0].toUpperCase()}${key.slice(1)} can't be empty`;

  if (!rule.validation(value))
    return (
      rule.customMessage ||
      `${key[0].toUpperCase()}${key.slice(1)} is not valid`
    );
};
