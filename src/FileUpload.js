import React, { useState } from "react";
import axios from "axios";
import authService from "./authService";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadStatus("");
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:8081/v1/api/file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": "Bearer " + authService.getToken(),
        },
      });
      setUploadStatus("✅ File uploaded successfully.");
    } catch (error) {
      setUploadStatus("❌ Upload failed: " + (error.response?.data || error.message));
    }
  };

  return (
    <div style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2>Upload File</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: 10 }}>Upload</button>
      <p>{uploadStatus}</p>
    </div>
  );
}

export default FileUpload;
