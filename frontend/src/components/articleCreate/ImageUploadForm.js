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

      // 확장자 처리
      const extension = file.name.toLowerCase().split(".").pop();
      if (!(extension === "jpg" || extension === "jpeg")) {
        alert("jpg, jpeg 파일만 업로드할 수 있습니다.");
        return;
      }

      // 프리뷰 이미지 생성
      const preview = URL.createObjectURL(file);

      // 이미지 크기 리사이즈
      const img2 = new Image();
      img2.src = preview;
      img2.onload = () => {
        console.log(img2.width, img2.height);
      };
      console.log(preview.width, preview.width);

      const image = document.createElement("img");
      image.src = URL.createObjectURL(file);
      console.log(image.width, image.height);
      // // 이미지가 로드되면 canvas를 원하는 크기로 만들고 이미지를 그에 맞춰 그립니다.
      // image.onload = () => {
      //   URL.revokeObjectURL(image.src);
      //   const canvas = document.createElement("canvas");
      //   canvas.width = 500;
      //   canvas.height = 500;
      //   const context = canvas.getContext("2d");
      //   context.drawImage(image, 0, 0, 500, 500);
      //   // canvas에 그려진 이미지를 Blob으로 만들고 다시 File로 만들어 배열에 저장합니다.
      //   context.canvas.toBlob(
      //     (newImageBlob) => {
      //       newImageFiles.push(new File([newImageBlob], oldImageFile.name));
      //       if (oldImageFiles.length === newImageFiles.length) {
      //         ok(newImageFiles);
      //       }
      //     },
      //     "image/png",
      //     0.5
      //   );
      // };

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
            isText: false,
            photo: file,
            preview: preview,
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
