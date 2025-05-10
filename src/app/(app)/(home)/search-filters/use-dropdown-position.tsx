import  { RefObject } from "react";

const useDropDownPosition = (
  ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>
) => {
  const getDropdownPosition = () => {
    if (!ref.current) return { top: 0, left: 0 };
    const rect = ref.current.getBoundingClientRect();
    const dropdownWidth = 240; // w-60 = 15rem = 240px because w-4 = 1rem => 4 * 60 = 240px
    // Calculate the initial position of the dropdown
    let left = rect.left + window.scrollX;
    // let top = rect.bottom + window.scrollY;

    // Check if the dropdown goes off the right edge of the screen
    if (left + dropdownWidth > window.innerWidth) {
      // Align to right edge of the button instead
      left = rect.right + window.scrollX - dropdownWidth;

      // If still of the screen, align to right edge of the viewport with padding
      if (left < 0) {
        left = window.innerWidth - dropdownWidth - 16;
      }

      // ensure dropdown is not off the left edge
      if (left < 0) {
        left = 16;
      }
    }
  };
  return { getDropdownPosition };
};

export default useDropDownPosition;
