import { useCallback, useState } from "react";
import { auth } from "../firebase";
import { persistor } from "..";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export { useAuthLogin, useAuthCreateAcc, useAuthLogout, useAuthResetPassword };

const useAuthLogin = () => {
  const [isLoading, setLoading] = useState(false); // to zostanie przypisane do komponentu ktory używa hooka
  const [error, setError] = useState(null); // to zostanie przypisane do komponentu ktory yuzywa hooka
  const navigate = useNavigate();

  const authLogin = useCallback(async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      const response = await auth.signInWithEmailAndPassword(email, password);

      if (!response.ok) {
        throw new Error("Login failed - something goes wrong ! ");
      }

      toast.success("User login success");
      navigate("/", { replace: true });
      persistor.pause();
    } catch (err) {
      setError(`${err}`);
    }
    setLoading(false);
  }, []);
  return { isLoading, error, authLogin };
};

const useAuthCreateAcc = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const authCreateAcc = useCallback(async (email, password) => {
    setError(null);
    setLoading(true);

    try {
      const response = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (!response.ok) {
        throw new Error("Request failed");
      }
      toast.success("automatically logged in to the new account");
      navigate("/", { replace: true });
      persistor.pause();
    } catch (err) {
      setError(`${err}`);
    }
    setLoading(false);
  }, []);

  return { isLoading, error, authCreateAcc };
};

const useAuthLogout = () => {
  const [isLoading, setLoading] = useState(false); // to zostanie przypisane do komponentu ktory używa hooka
  const [error, setError] = useState(null); // to zostanie przypisane do komponentu ktory yuzywa hooka
  const navigate = useNavigate();
  const authLogout = useCallback(async () => {
    try {
      setError("");
      setLoading(true);
      const response = await auth.signOut();
      if (!response.ok) {
        throw new Error("Request LOGOUT failed");
      }
      toast.success("User Logout success");
      navigate("/", { replace: true });
      // persistor.persist();
    } catch (error) {
      setError("Failed to Logout User");
    }
    setLoading(false);
  }, []);

  return { isLoading, error, authLogout };
};

const useAuthResetPassword = () => {
  const [isLoading, setLoading] = useState(false); // to zostanie przypisane do komponentu ktory używa hooka
  const [error, setError] = useState(null); // to zostanie przypisane do komponentu ktory yuzywa hooka
  const navigate = useNavigate();
  const authResetPassword = useCallback(async (email) => {
    try {
      setError("");
      setLoading(true);
      const response = await auth.sendPasswordResetEmail(email);
      if (!response.ok) {
        throw new Error("Request failed");
      }
      toast.success("User password restart success - check your email !");
      navigate("/", { replace: true });
    } catch (err) {
      setError(`${err}`);
    }
    setLoading(false);
  }, []);

  return { isLoading, error, authResetPassword };
};
