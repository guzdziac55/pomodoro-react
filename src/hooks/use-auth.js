import { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Navigate } from "react-router";
export { useAuthLogin, useAuthCreateAcc, useAuthLogout, useAuthResetPassword };

const useAuthLogin = () => {
  const [isLoading, setLoading] = useState(false); // to zostanie przypisane do komponentu ktory używa hooka
  const [error, setError] = useState(null); // to zostanie przypisane do komponentu ktory yuzywa hooka
  const navigate = useNavigate();

  const authLogin = async (email, password) => {
    try {
      setError("");
      setLoading(true);
      await auth.signInWithEmailAndPassword(email, password);
      toast.success("User login success");
      navigate("/", { replace: true });
    } catch (err) {
      setError(`${err}`);
    }
    setLoading(false);
  };
  return { isLoading, error, authLogin };
};

const useAuthCreateAcc = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const authCreateAcc = async (email, password) => {
    try {
      setError("");
      setLoading(true);
      await auth.createUserWithEmailAndPassword(email, password); // async make await
      toast.success("automatically logged in to the new account");
      navigate("/", { replace: true });
    } catch (err) {
      setError(`${err}`);
    }
    setLoading(false);
  };
  return { isLoading, error, authCreateAcc };
};

const useAuthLogout = () => {
  const [isLoading, setLoading] = useState(false); // to zostanie przypisane do komponentu ktory używa hooka
  const [error, setError] = useState(null); // to zostanie przypisane do komponentu ktory yuzywa hooka
  const navigate = useNavigate();
  const authLogout = async () => {
    try {
      setError("");
      setLoading(true);
      await auth.signOut();
      toast.success("User Logout success");
      navigate("/", { replace: true });
    } catch (error) {
      setError("Failed to Logout User");
    }
    setLoading(false);
  };

  return { isLoading, error, authLogout };
};

const useAuthResetPassword = () => {
  const [isLoading, setLoading] = useState(false); // to zostanie przypisane do komponentu ktory używa hooka
  const [error, setError] = useState(null); // to zostanie przypisane do komponentu ktory yuzywa hooka
  const navigate = useNavigate();
  const authResetPassword = async (email) => {
    try {
      setError("");
      setLoading(true);
      await auth.sendPasswordResetEmail(email);
      toast.success("User password restart success - check your email !");
      navigate("/", { replace: true });
    } catch (err) {
      setError(`${err}`);
    }
    setLoading(false);
  };

  return { isLoading, error, authResetPassword };
};
