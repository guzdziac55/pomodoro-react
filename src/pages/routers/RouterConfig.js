import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Spinner } from "../../components/UI/Spinner";
import { useSelector } from "react-redux";

const App = React.lazy(() => import("./../../App")); // Layout

const AppPage = React.lazy(() => import("./../AppPage"));
const LoginPage = React.lazy(() => import("./../LoginPage"));
const SignUpPage = React.lazy(() => import("./../SignUpPage"));
const ResetPasswordPage = React.lazy(() => import("./../ResetPasswordPage"));

const RouterConfig = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        {/*  App is our Layout  with header*/}
        <Route path="/" element={<App />}>
          <Route path="/" element={<AppPage />} />
          <Route path="app" element={<AppPage />} />
          {!currentUser && <Route path="login" element={<LoginPage />} />}
          <Route path="signup" element={<SignUpPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Suspense>
  );
};

// jak poprawić
// APP = > ZAMIENIC NA LAYOUT POSIADAJĄCY WEW HEADER I OUTLED DLA MAIN PAGES
// WEW APP PAGE DAĆ CHILD ROUTER

export default RouterConfig;

// COPY

// const RouterConfig = () => {
//   const currentUser = useSelector((state) => state.auth.currentUser);

//   return (
//     <Suspense fallback={<Spinner />}>
//       <Routes>
//         {/*  App is our Layout  with header*/}
//         <Route path="/" element={<App />}>
//           <Route path="/" element={<AppPage />} />
//           <Route path="app" element={<AppPage />} />
//           {!currentUser && <Route path="login" element={<LoginPage />} />}
//           <Route path="signup" element={<SignUpPage />} />
//           <Route path="reset-password" element={<ResetPasswordPage />} />
//         </Route>
//         <Route path="*" element={<Navigate replace to="/" />} />
//       </Routes>
//     </Suspense>
//   );
// };
