import toast from "react-hot-toast";
let autoCloseTime = 1800;

export const errorMessage = (text = "") => {
  toast.error(text, {
    duration: autoCloseTime,
  });
};

export const successMessage = (text = "") => {
  toast.success(text, {
    duration: autoCloseTime,
  });
};

export const warningMessage = (text = "") => {
  toast.warn(text, {
    duration: autoCloseTime,
  });
};
