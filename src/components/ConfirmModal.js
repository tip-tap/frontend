import React from 'react';
import { ReactComponent as Info } from "../assets/info.svg";
import { ReactComponent as Close } from "../assets/close.svg";
import styles from "../styles/components/confirmModal.module.scss";

const ConfirmModal = ({ isModalVisible, setIsModalVisible }) => {
  const handleOk = () => {
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
                  <p>입력되지 않은 항목이 있습니다</p>
                  <Close className={styles.close} onClick={handleCancel} />
              </article>
              <article className={styles.body}>
                  <p>그래도 저장하시겠습니까?</p>
              </article>
              <article className={styles.footer}>
                  <button className={styles.cancel} onClick={handleCancel}>취소하기</button>
                  <button className={styles.save} onClick={handleOk}>저장하기</button>
              </article>
          </section>
        </div>
      }
    </>
  );
};

export default ConfirmModal;