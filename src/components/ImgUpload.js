import React, { useState, useRef, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import styles from "../styles/components/imgUpload.module.scss";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ImgUpload = () => {
  const btnRef = useRef();

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  }
  
  useEffect(() => {
    btnRef.current?.scrollIntoView({behavior: "smooth", block: "nearest", inline: "start"});
  }, [fileList]);

  return (
    <div className={styles.wrapper}>
      <Upload
        listType="picture-card"
        beforeUpload={() => false}
        fileList={fileList}
        multiple={true}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 10 ? null
        :
        <div ref={btnRef}>
          <PlusOutlined />
          <div
            style={{
              marginTop: 8,
            }}
          >
            Upload<br/>(최대10장)
          </div>
        </div>
        }
      </Upload>
      <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </div>
  );
};

export default ImgUpload;