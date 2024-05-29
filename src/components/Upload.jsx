import axios from 'axios';
import React, { useState} from "react";
import "../style.css"
import Step from "./Step";

const Upload = () => {

  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [parseButton, setParseButton] = useState(false);
  const [stepValue, setStepValue] = useState(0);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
    
      setError(null);
    } else {
      setFile(null);
      setMessage("");
      setError("Please select a valid docx file.");
    }
 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setError("Please select a valid docx file.");
      return;
    }

    setLoading(true);
    setStepValue(1) 

    try {
      const formData = new FormData();
      formData.append("file", file);
      const apiUrl = 'http://localhost:8000/api/upload';

      const response = await axios.post(apiUrl, formData, {

        headers: {
          'Content-Type': 'multipart/form-data',
        },

      });

      if (response.status === 200) {
     
        setError("");
        setMessage(response.data.message);
        setParseButton(true);
      } else {
        setError(response.data.error || "File upload failed.");
      }

    } catch (error) {
      setError(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const convertHandler = async () => {
    setLoading(true);
    setMessage("");
    setError("");
    // setValue(value+1)
    try {
      const response = await axios.get("http://localhost:8000/api/convertDocxToDita");

      if (response.status === 200) {
        setMessage(response.data.message);
        setDownloadLink(response.data.downloadLink);
        setParseButton(false);
        setStepValue(2)
      } else {
        setError(response.data.message || "Conversion failed.");
      }
    } catch (error) {
      setError(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5">
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <Step stepValue={stepValue} />
        </div>
        <div className="col-lg-8">
          <form onSubmit={handleSubmit} className="mt-4 mt-md-0">
            {stepValue === 0 && (
              <div
                className="input-group mb-3 mx-auto"
                style={{
                  maxWidth: "500px",
                }}
              >
                <input
                  className="form-control w-25 mx-auto"
                  type="file"
                  id="formFile"
                  onChange={handleFileChange}
                  accept=".docx"
                />

                <button
                  className="btn btn-outline-secondary text-white border-0"
                  type="submit"
                  id="button-addon2"
                  style={{
                    background: "#71A5CB",
                  }}
                >
                  Upload
                </button>
              </div>
            )}
            {error && <div className="text-danger">{error}</div>}

            {message && (
              <div className="text-success text-center">
                <span className="my-2">{message}</span>
              </div>
            )}

            {parseButton && (
              <button
                className="btn btn-info d-block mx-auto mt-3 text-white border-0"
                style={{
                  background: "#71A5CB",
                }}
                type="button"
                id="button-addon2"
                onClick={convertHandler}
              >
                Convert to dita format.
              </button>
            )}
            {downloadLink && (
              <a
                className="text-decoration-none btn mt-4 text-white"
                style={{
                  background: "#FE5E45",
                }}
                href={downloadLink}
              >
                Download output
              </a>
            )}

            {loading && (
              <div className="spinner-border text-primary mt-4" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Upload;
