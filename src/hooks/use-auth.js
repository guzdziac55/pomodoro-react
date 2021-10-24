import { useState } from "react";
import { auth } from "../firebase";

export { useAuthLogin, useAuthCreateAcc, useAuthLogout, useAuthResetPassword };

const useAuthLogin = () => {
  const [isLoading, setLoading] = useState(false); // to zostanie przypisane do komponentu ktory używa hooka
  const [error, setError] = useState(null); // to zostanie przypisane do komponentu ktory yuzywa hooka
  const authLogin = async (email, password) => {
    try {
      setError("");
      setLoading(true);
      await auth.signInWithEmailAndPassword(email, password); // async make await
    } catch (error) {
      setError("Failed login in");
    }
    setLoading(false);
  };

  return { isLoading, error, authLogin };
};

const useAuthCreateAcc = () => {
  const [isLoading, setLoading] = useState(false); // to zostanie przypisane do komponentu ktory używa hooka
  const [error, setError] = useState(null); // to zostanie przypisane do komponentu ktory yuzywa hooka
  const authCreateAcc = async (email, password) => {
    try {
      setError("");
      setLoading(true);
      await auth.createUserWithEmailAndPassword(email, password); // async make await
    } catch (error) {
      setError("Failed to create ACC");
    }
    setLoading(false);
  };

  return { isLoading, error, authCreateAcc };
};

const useAuthLogout = () => {
  const [isLoading, setLoading] = useState(false); // to zostanie przypisane do komponentu ktory używa hooka
  const [error, setError] = useState(null); // to zostanie przypisane do komponentu ktory yuzywa hooka
  const authLogout = async () => {
    try {
      setError("");
      setLoading(true);
      await auth.signOut(); // async make await
    } catch (error) {
      setError("Failed to create ACC");
    }
    setLoading(false);
  };

  return { isLoading, error, authLogout };
};

const useAuthResetPassword = () => {
  const [isLoading, setLoading] = useState(false); // to zostanie przypisane do komponentu ktory używa hooka
  const [error, setError] = useState(null); // to zostanie przypisane do komponentu ktory yuzywa hooka
  const authResetPassword = async (email) => {
    try {
      setError("");
      setLoading(true);
      await auth.sendPasswordResetEmail(email); // async make await
    } catch (error) {
      setError("Failed to create ACC");
    }
    setLoading(false);
  };

  return { isLoading, error, authResetPassword };
};
