import React, { useRef, useState } from "react";
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

      // 확장자 처리
      const extension = file.name.toLowerCase().split(".").pop();
      if (!(extension === "jpg" || extension === "jpeg")) {
        alert("jpg, jpeg 파일만 업로드할 수 있습니다.");
        return;
      }

      // 이미지 크기 리사이즈
      const image = document.createElement("img");
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        // 이미지 로드되면
        const ratio = image.height / image.width; // 이미지 가로, 세로 비율 계산
        URL.revokeObjectURL(image.src);
        const canvas = document.createElement("canvas"); // 캔버스 생성
        const widthSize = 720;
        canvas.width = widthSize;
        canvas.height = canvas.width * ratio; // 비율에 맞게 리사이즈
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, widthSize, canvas.height); // 캔버스에 그리기
        context.canvas.toBlob(
          (blob) => {
            const newFile = new File([blob], "articleImage.jpg");
            const newPreview = URL.createObjectURL(newFile);
            setArticle((article) => ({
              ...article,
              isText: false,
              photo: newFile,
              preview: newPreview,
            }));
          },
          "image/jpg", // 파일 확장자
          0.5 // 사진 퀄리티
        ); // 이미지를 blob 객체로 저장
      };

      // 메타데이터 추출 (위경도)
      EXIF.getData(file, function () {
        if (EXIF.pretty(this) && EXIF.getTag(this, "GPSLatitude")) {
          const metadata = EXIF.getAllTags(this);
          const [lat, lng] = GPSConvert(metadata);

          // 저장
          setArticle((article) => ({
            ...article,
            lat,
            lng,
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
        accept="image/jpeg, image/jpg"
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
