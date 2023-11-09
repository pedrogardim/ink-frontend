import { useState } from "react";
import { validateField } from "@/utils/validation";
import type { ValidationEntity } from "@/utils/validation";

interface UseFormArguments {
  entity: ValidationEntity;
}

const useFormValidation = ({ entity }: UseFormArguments) => {
  const [values, setValues] = useState<{ [key: string]: any }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const onChange = (key: string, value: string) => {
    setErrors((prev) => {
      delete prev[key];
      return prev;
    });
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const onBlur = (key: string) => {
    const error = validateField(key, values[key], entity);
    if (error) setErrors((prev) => ({ ...prev, [key]: error }));
  };

  const validateAll = () => {
    const validationErrors: typeof errors = {};
    for (let key in values) {
      const error = validateField(key, values[key], entity);
      if (error) validationErrors[key] = error;
    }
    setErrors(validationErrors);
  };

  return { values, errors, onChange, onBlur, validateAll };
};

export default useFormValidation;
