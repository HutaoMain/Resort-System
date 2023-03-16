import { createContext, useState } from "react";

const FormContext = createContext({});

export const FormProvider = ({ children }) => {
  const title = {
    0: "billing info",
    1: "shipping info",
    2: "option",
  };

  const [page, setPage] = useState(0);

  // const [formData, setFormData] = usestate({

  // })

  return (
    <FormContext.Provider value={{ title, page, setPage }}>
      {/* setPage, data, setData, canSubmit, handleChange, disablePrev, disableNext, prevHide, nextHide, submitHide */}
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
