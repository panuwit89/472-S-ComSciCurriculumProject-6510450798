import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Button from "../components/button";
import UploadFileButton from "../components/uploadfile-button";
import "../styles/creditCheck.css";

const CreditCheckPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"error" | "success" | null>(
    null
  );
  const [selectedPage, setSelectedPage] = useState("creditcheck");
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile || null);
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleSubmit = () => {
    if (!file) {
      setMessage("ไม่สามารถตรวจสอบไฟล์ได้");
      setMessageType("error");
      return;
    }
    if (file.type !== "application/pdf") {
      setMessage("ไฟล์แนบต้องเป็น PDF");
      setMessageType("error");
    } else {
      setMessage("ไฟล์ถูกต้อง");
      setMessageType("success");
      // Logic to send files to the backend
      console.log("Files sent to backend:", file);
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 3000); // 3 seconds

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleNavigate = (page: string) => {
    setSelectedPage(page);
    navigate(`/${page}`);
  };

  return (
    <div className="credit-check-page">
      <Header />
      <div className="content">
        <div className="credit-check-container">
          <div className="button-container">
            <label>
              <input
                type="radio"
                name="page"
                value="insertgradfile"
                checked={selectedPage === "insertgradfile"}
                onChange={() => handleNavigate("insertgradfile")}
              />
              ต้องการเช็คจบ
            </label>
            <label>
              <input
                type="radio"
                name="page"
                value="creditcheck"
                checked={selectedPage === "creditcheck"}
                onChange={() => handleNavigate("creditcheck")}
              />
              ต้องการเช็คหน่วยกิต
            </label>
          </div>
          <div className="upload-section">
            <span className="upload-text">แนบไฟล์ผลการเรียน*</span>
            <UploadFileButton onChange={handleFileChange} onRemoveFile={handleRemoveFile} />
          </div>
          <p />
          <div className="upload-container faded">
            <span className="upload-text">
              แนบไฟล์กิจกรรม*
            </span>
            <UploadFileButton onChange={handleFileChange} onRemoveFile={handleRemoveFile} />
          </div>
          <p />
          <div className="upload-container faded">
            <span className="upload-text">แนบหลักฐานการชำระค่าเทอม*</span>
            <UploadFileButton onChange={handleFileChange} onRemoveFile={handleRemoveFile} />
          </div>
          {message && (
            <div className="message-container">
              <p
                className={
                  messageType === "success"
                    ? "success-message"
                    : "error-message"
                }
              >
                {message}
              </p>
            </div>
          )}
          <p />
          <Button text="ตรวจสอบไฟล์" className="button" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default CreditCheckPage;
