import React, { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

const ArticlePhoto = () => {
  const fileInputRef = useRef();
  const [imageFile, setImageFile] = useState();
  const [flag, setflag] = useState(false);
  const handleClickFileInput = () => {
    fileInputRef.current?.click();
  };

  const uploadPhoto = (e) => {
    const fileList = e.target.files;
    if (fileList && fileList[0]) {
      const url = URL.createObjectURL(fileList[0]);
      console.log(fileList);
      setImageFile({
        file: fileList[0],
        thumbnail: url,
        type: fileList[0].type.slice(0, 5),
      });
    }
  };

  const showImage = useMemo(() => {
    if (!imageFile && imageFile == null) {
      return <div></div>;
    }
    return (
      <img
        src={imageFile.thumbnail}
        alt={imageFile.type}
        onClick={handleClickFileInput}
      />
    );
  }, [imageFile]);

  return (
    <div>
      {showImage}
      <h1>사진을 선택해주세요</h1>
      <Link to="/create/text">글만 작성하기</Link>

      <div
        onClick={handleClickFileInput}
        style={{
          width: "200px",
          height: "100px",
          backgroundColor: "lightGray",
          margin: "auto",
          lineHeight: "100px",
        }}
      >
        사진 업로드
      </div>

      <form>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={uploadPhoto}
          style={{ display: "none" }}
        />
      </form>
      <h1>장소</h1>
    </div>
  );
};

export default ArticlePhoto;
