import React, { useRef, useState } from "react";
import EXIF from "exif-js";
import styles from "./ArticleImageUploadForm.module.css";

const GPSConvert = (metadata) => {
  const dmsLaRef = metadata.GPSLatitudeRef;
  const dmsLa = metadata.GPSLatitude;
  const dmsLoRef = metadata.GPSLongitudeRef;
  const dmsLo = metadata.GPSLongitude;

  const degreeLa =
    dmsLaRef === "S"
      ? -1 * dmsLa[0] + (-60 * dmsLa[1] + -1 * dmsLa[2]) / 3600
      : dmsLa[0] + (60 * dmsLa[1] + dmsLa[2]) / 3600;
  const degreeLo =
    dmsLoRef === "W"
      ? -1 * dmsLo[0] + (-60 * dmsLo[1] + -1 * dmsLo[2]) / 3600
      : dmsLo[0] + (60 * dmsLo[1] + dmsLo[2]) / 3600;

  return [degreeLa, degreeLo];
};

const ArticleImageUploadForm = (props) => {
  const fileInputRef = useRef();
  const [imagePreview, setImagePreview] = useState();

  const handleClickFileInput = () => {
    fileInputRef.current?.click();
  };

  const uploadPhoto = (e) => {
    const fileList = e.target.files;
    if (fileList && fileList[0]) {
      const file = fileList[0];

      EXIF.getData(file, function () {
        if (EXIF.pretty(this) && EXIF.getTag(this, "GPSLatitude")) {
          const metadata = EXIF.getAllTags(this);
          const url = URL.createObjectURL(file);
          const [lat, lng] = GPSConvert(metadata);
          setImagePreview({ url, name: file.name });
          props.setImageFile({ file, url, lat, lng });
        } else {
          alert("위치정보가 없는 사진입니다. 다른 사진을 선택해주세요.");
        }
      });
    }
  };

  const removePhoto = () => {
    setImagePreview();
    props.setImageFile();
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={uploadPhoto}
      />
      {!imagePreview ? (
        <div className={styles.beforeUpload} onClick={handleClickFileInput}>
          사진 업로드
        </div>
      ) : (
        <img
          className={styles.afterUpload}
          src={imagePreview.url}
          alt={imagePreview.name}
          onClick={handleClickFileInput}
        />
      )}
      <button onClick={removePhoto}>사진 삭제</button>
    </div>
  );
};

export default ArticleImageUploadForm;
