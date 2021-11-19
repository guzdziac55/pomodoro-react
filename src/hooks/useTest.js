// we need ref , useState conditional

// import { useRef, useState } from "react";

// const [open, setOpen] = useState(false);
// const formRef = useRef(); // ref={formRef in element}
// // refFormRef
// // cb SetState useState

// const useClickOutside = (ref, cb) => {
//   useEventListener(
//     "click",
//     (e) => {
//       if (ref.current == null || ref.current.contains(e.target)) return;
//       cb(e);
//     },
//     document
//   );
// };

// const useEventListener = (eventType, callBack, element) => {
//   useEffect(() => {
//     const callBackRef = callBack;
//   }, [callBack]);

//   useEffect(() => {
//     // handler = >  e.target sprawdzający
//     const handler = (e) => callBackRef.current(e);

//     return () => {
//       element.removeEventListener(eventType, handler);
//     };
//   }, [input]);

// event click, scroll
// callback => test that target contains ref
// element > document, window etc
