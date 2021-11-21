import { useEventListener } from "./use-eventListener";

export const useClickOutside = (ref, cb) => {
  useEventListener(
    "click",
    (e) => {
      console.log(e.currentTarget);
      // console.log("etarget ! ");

      if (ref.current == null || ref.current.contains(e.target)) {
        return;
      } else {
        cb(e);
      }
      // cb(e); // if (open) // setOpen(false)
    },
    document
  );
};
