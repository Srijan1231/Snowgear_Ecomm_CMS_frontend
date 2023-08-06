import React, { useEffect, useRef, useState } from "react";
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { postNewAdminVerificationInfo } from "../../helper/axios";
import { toast } from "react-toastify";
import { Alert, Container } from "react-bootstrap";

const AdminVerification = () => {
  const [queryStrings] = useSearchParams();
  const navigate = useNavigate();
  const c = queryStrings.get("c");
  const e = queryStrings.get("e");
  const [showSpinner, setShowSpinner] = useState(true);
  const [resp, setResp] = useState({});

  //   const callAPI = useRef(true);

  //   1. call api to verify from the server
  //   2. based on the respon show it and if success redirect to login page

  useEffect(() => {
    // callAPI &&
    postNewAdminVerificationInfo({ c, e }).then((resp) => {
      setResp(resp);
      setShowSpinner(false);
      toast[resp.status](resp.message);
      if (resp.status === "success") {
        navigate("/");
      }
    });

    // callAPI.current = false;
  }, [c, e, navigate]);
  return (
    <div>
      <Header />
      <main className="main mt-5">
        <Container>
          {showSpinner ? (
            <div className="mt-5 text-center ">
              <Spinner animation="border" variant="primary" className="fs-1" />
              <br />
              Please wait while account being verified...
            </div>
          ) : (
            <Alert variant={resp.status === "success" ? "success" : "danger"}>
              {resp.message}
            </Alert>
          )}
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default AdminVerification;
