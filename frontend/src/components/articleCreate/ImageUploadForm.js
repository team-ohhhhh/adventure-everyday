import React, { useRef } from "react";
import EXIF from "exif-js";
import styles from "./ImageUploadForm.module.css";

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

const ImageUploadForm = ({ article, setArticle }) => {
  const fileInputRef = useRef();

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
          setArticle((article) => ({
            ...article,
            lat,
            lng,
            type: "image",
            image: { data: file, preview: url, name: file.name },
          }));
        } else {
          alert("위치정보가 없는 사진입니다. 다른 사진을 선택해주세요.");
        }
      });
    }
  };

  const removePhoto = () => {
    setArticle({
      type: "text",
      image: { data: null, preview: null, name: null },
    });
  };

  return (
    <div>
      <input
        className={styles.fileInput}
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={uploadPhoto}
      />
      {!article.image.preview ? (
        <div
          className={styles.beforeUpload}
          onClick={handleClickFileInput}
        ></div>
      ) : (
        <div>
          <img
            className={styles.afterUpload}
            src={article.image.preview}
            alt={article.image.name}
            onClick={handleClickFileInput}
          />
          <button onClick={removePhoto}>X</button>
        </div>
      )}
    </div>
  );
};

export default ImageUploadForm;
