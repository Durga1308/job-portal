import { useState } from "react";
import './ResumeUpload.css'

const ResumeUpload = () => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && !["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type)) {
      alert("Only PDF or DOCX files are allowed ");
      return;
    }

    setResume(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      alert("Please select a resume file");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);

    try {
      setLoading(true);
      alert("Resume uploaded successfully ");
      setResume(null);
    } catch (err) {
      alert(err.response?.data?.message || "Resume upload failed ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-upload-wrapper">
      <form className="resume-upload-form" onSubmit={handleSubmit}>
        <h2>Upload Resume</h2>

        <input
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileChange}
          className="file-input"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload Resume"}
        </button>
      </form>
    </div>
  );
};

export default ResumeUpload;
