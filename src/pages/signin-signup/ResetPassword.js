import React, { useState } from "react";
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { PasswordOTP } from "../../components/admin-signup/PasswordOTP";
import { PasswordReset } from "../../components/admin-signup/PasswordReset";
import { requestPassOTP } from "../../helper/axios";
import { toast } from "react-toastify";
import { Alert, Container } from "react-bootstrap";

export const ResetPassword = () => {
  const [form, setForm] = useState("otp");
  const [resp, setResp] = useState({});
  const handleOnOTPRequest = async (email) => {
    if (!email.includes("@") && !email.includes(".")) {
      return toast.error("Invalid email");
    }
    const pending = requestPassOTP(email);
    toast.promise(pending, { pending: "Please Wait..." });
    const result = await pending;
    setResp(result);
    setForm("reset");
  };

  const forms = {
    otp: <PasswordOTP handleOnOtpRequest={handleOnOTPRequest} />,
    reset: <PasswordReset setForm={setForm} />,
  };

  return (
    <>
      <Header />
      <main className="main pt-5">
        {resp.message && (
          <Container>
            <Alert variant={resp.status === "success" ? "success" : "danger"}>
              {resp.message}
            </Alert>
          </Container>
        )}
        <div className="d-flex reset_password">{forms[form]}</div>
      </main>
      <Footer />
    </>
  );
};
