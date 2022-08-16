import React from 'react';
import { ReactComponent as Info } from "../assets/info.svg";
import { ReactComponent as Close } from "../assets/close.svg";
import styles from "../styles/components/confirmModal.module.scss";

const ConfirmModal = ({ title, content, isModalVisible, setIsModalVisible, onSubmit, btnText }) => {
  const handleOk = () => {
    onSubmit();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {isModalVisible &&
        <div className={styles.bg}>
          <section className={styles.wrapper}>
              <article className={styles.header}>
                  <Info />
                  <p>{title}</p>
                  <Close className={styles.close} onClick={handleCancel} />
              </article>
              <article className={styles.body}>
                  <p>{content}</p>
              </article>
              <article className={styles.footer}>
                  <button className={styles.cancel} onClick={handleCancel}>취소하기</button>
                  <button className={styles.save} onClick={handleOk}>{btnText}</button>
              </article>
          </section>
        </div>
      }
    </>
  );
};

export default ConfirmModal;