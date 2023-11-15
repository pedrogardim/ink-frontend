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
    formated?: string;
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
    required: true,
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
    customMessage: "Names can only contain letters",
  },
  lastName: {
    validation: (id) => NAME_REGEX.test(id),
    required: true,
    customMessage: "Names can only contain letters",
  },
  email: {
    validation: (id) => EMAIL_REGEX.test(id),
    required: true,
    customMessage: `Must contain an "@" and a valid domain`,
  },
  password: {
    validation: (id) => PASSWORD_REGEX.test(id),
    required: true,
    customMessage: "Must contain letters, numbers and symbols",
  },
  phoneNumber: {
    validation: (id) => PHONE_NUMBER_REGEX.test(id),
    required: true,
    customMessage: `Must contain 9 numbers`,
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

export const formTypes: {
  [key: string]: {
    entity: ValidationEntity;
    fields: string[];
    optionalFields?: string[];
  };
} = {
  login: {
    entity: "user",
    fields: ["email", "password"],
  },
  registerFirstStep: {
    entity: "user",
    fields: ["firstName", "lastName"],
  },
  registerSecondStep: {
    entity: "user",
    fields: ["email", "password"],
  },
  profile: {
    entity: "user",
    fields: Object.keys(userRules),
    optionalFields: ["password"],
  },
  appointment: {
    entity: "appointment",
    fields: Object.keys(appointmentsRules),
    optionalFields: ["password"],
  },
};

export type FormType = keyof typeof formTypes;

export const validateField = (key: string, value: any, formType: FormType) => {
  const { entity, optionalFields } = formTypes[formType];
  const rule = validationRules[entity][key];

  if (rule.required && !optionalFields?.includes(key) && !value && value !== 0)
    return "This field can't be empty";

  if ((value || value === 0) && !rule.validation(value))
    return rule.customMessage || "This field is not valid";
};
