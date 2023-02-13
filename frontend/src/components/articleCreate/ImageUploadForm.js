import React, { useRef } from "react";
import EXIF from "exif-js";

import styles from "./ImageUploadForm.module.css";
import { RiImageAddLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";

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
          console.log(metadata)
          const url = URL.createObjectURL(file);
          const [lat, lng] = GPSConvert(metadata);
          console.log(lat)
          console.log(lng)
          setArticle((article) => ({
            ...article,
            lat,
            lng,
            isText: false,
            photo: file,
            preview: url,
          }));
        } else {
          alert("위치정보가 없는 사진입니다. 다른 사진을 선택해주세요.");
        }
      });
    }
  };

  const removePhoto = () => {
    setArticle({
      isText: true,
      photo: null,
      preview: null,
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
      {!article.preview ? (
        <div className={styles.beforeUpload} onClick={handleClickFileInput}>
          <RiImageAddLine color="#1c0b69" size={40} />
        </div>
      ) : (
        <div>
          <div className={styles.afterUploadContainer}>
            <img
              className={styles.afterUpload}
              src={article.preview}
              alt={article.photo.name}
              onClick={handleClickFileInput}
            />
            <AiOutlineClose
              className={styles.removeBtn}
              size={20}
              onClick={removePhoto}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadForm;
