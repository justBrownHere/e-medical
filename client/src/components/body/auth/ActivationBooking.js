import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";

function ActivationBooking() {
  const { activation_token } = useParams();
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (activation_token) {
      const ActivationBooking = async () => {
        try {
          const res = await axios.post("/api/activation-booking", {
            activation_token,
          });
          setSuccess(res.data.msg);
        } catch (err) {
          err.response.data.msg && setErr(err.response.data.msg);
        }
      };
      ActivationBooking();
    }
  }, [activation_token]);

  return (
    <div className="active_page">
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
    </div>
  );
}

export default ActivationBooking;
