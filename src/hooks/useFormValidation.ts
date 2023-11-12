import { useState } from "react";
import { validateField, formTypes } from "@/utils/validation";
import type { FormType } from "@/utils/validation";

const useFormValidation = (formType: FormType, initialValue: any = {}) => {
  const [values, setValues] = useState<{ [key: string]: any }>(initialValue);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const onChange = (key: string, value: string) => {
    setErrors((prev) => {
      delete prev[key];
      return prev;
    });
    setValues((prev) => {
      if (!value) {
        const newValues = { ...prev };
        delete newValues[key];
        return newValues;
      }
      return { ...prev, [key]: value };
    });
  };

  const onBlur = (key: string) => {
    const error = validateField(key, values[key], formType);
    if (error) setErrors((prev) => ({ ...prev, [key]: error }));
  };

  const validateAll = () => {
    const validationErrors: typeof errors = {};
    for (let key of formTypes[formType].fields) {
      const error = validateField(key, values[key], formType);
      if (error) validationErrors[key] = error;
    }
    setErrors(validationErrors);
    const isValid = Object.values(validationErrors).length === 0;
    return isValid;
  };

  return { values, errors, onChange, onBlur, validateAll };
};

export default useFormValidation;
