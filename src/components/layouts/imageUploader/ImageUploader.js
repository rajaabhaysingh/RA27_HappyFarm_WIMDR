import React, { memo, useEffect, useState } from "react";
import "./ImageUploader.css";

import { useDropzone } from "react-dropzone";

function ImageUploader({
  prodImages,
  thumbImage,
  formState,
  setFormState,
  isMultiple,
  inputText,
  previewClass,
}) {
  const [errorState, setErrorState] = useState("");

  // useDropzone
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: isMultiple,
    // maxSize: 5242880,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 8) {
        setErrorState("Maximum 8 images allowed.");
      } else {
        if (prodImages) {
          setFormState({
            ...formState,
            prodImages: acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            ),
          });
        } else {
          setFormState({
            ...formState,
            thumbImage: acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            ),
          });
        }
        setErrorState("");
      }
    },
  });

  // removeFile
  const removeFile = (file) => () => {
    if (prodImages) {
      const newFiles = [...prodImages];
      newFiles.splice(newFiles.indexOf(file), 1);
      setFormState({
        ...formState,
        prodImages: newFiles,
      });
    } else {
      const newFiles = [...thumbImage];
      newFiles.splice(newFiles.indexOf(file), 1);
      setFormState({
        ...formState,
        thumbImage: newFiles,
      });
    }
  };

  // handleErrorState
  const handleErrorState = () => {
    if (errorState !== "") {
      return (
        <div className="img_upld_error">
          <span style={{ color: "#cc0000" }}>
            <i className="fas fa-exclamation-triangle"></i>
          </span>{" "}
          {errorState}
        </div>
      );
    }
  };

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      if (prodImages) {
        prodImages.forEach((file) => URL.revokeObjectURL(file.preview));
      } else {
        thumbImage.forEach((file) => URL.revokeObjectURL(file.preview));
      }
    },
    [prodImages, thumbImage]
  );

  // thumbs
  const tempThumbList = prodImages ? prodImages : thumbImage;
  const thumbs = tempThumbList.map((file) => (
    <div className={previewClass} key={file.name}>
      <div className="img_upld_thumb_inner">
        <img src={file.preview} />
        <button
          type="button"
          onClick={removeFile(file)}
          className="img_upld_thumb_close_btn"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  ));

  return (
    <div className="img_upld_main_div">
      <div
        {...getRootProps({
          className: "img_upld_dropzone",
        })}
      >
        <input {...getInputProps()} />
        <p>{inputText}</p>
      </div>
      <div className="img_upld_thumb_container">{thumbs}</div>

      {handleErrorState()}
    </div>
  );
}

export default memo(ImageUploader);
