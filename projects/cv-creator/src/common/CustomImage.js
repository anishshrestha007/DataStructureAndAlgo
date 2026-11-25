import React, { useState } from "react";
import "./CustomImage.css";
// import Input from "@mui/material/Input";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const CustomImage = ({ photo, ...props }) => {
  const [selectedFile, setSeletedFile] = useState(photo);

  function onFileChange(event) {
    setSeletedFile(event.target.files[0]);
    props.setPhoto(event.target.files[0]);
  }

  //   onFileUpload = () => {
  //     // Create an object of formData
  //     const formData = new FormData();
  //     // Update the formData object
  //     formData.append(
  //       "myFile",
  //       selectedFile,
  //       selectedFile.name
  //     );
  //     // Details of the uploaded file
  //     console.log(selectedFile);
  //     // Request made to the backend api
  //     // Send formData object
  //     axios.post("api/uploadfile", formData);
  //   };

  function fileData() {
    if (selectedFile) {
      return (
        <img
          className="custom-image"
          alt="not found"
          width={"100px"}
          height={"100px"}
          src={URL.createObjectURL(selectedFile)}
        />
      );
    }
  }

  return (
    <div className="custom-image-div">
      <>
        <label className="custom-file-upload">
          <input type="file" onChange={onFileChange} accept="image/*" />
          {/* <button onClick={this.onFileUpload}>Upload!</button> */}
          {/* <CloudUploadIcon color="action" className="custom-cloud-icon" /> Photo */}
          Profile Picture
        </label>
      </>
      {fileData()}
    </div>
  );
};

export default CustomImage;
