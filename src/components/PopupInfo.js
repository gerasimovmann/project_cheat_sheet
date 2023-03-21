import React from 'react'
import styles from './PopupInfo.module.scss'
import { IoCloseSharp } from 'react-icons/io5'
import { BsInfoLg } from 'react-icons/bs'

const PopupInfo = ({ children, popupOpen, setPopupOpen }) => {
  return (
    <div
      className={
        popupOpen === 'info'
          ? `${styles.popupBack} ${styles.popupBackInfoOpen}`
          : styles.popupBack
      }
      onClick={(e) => {
        e.currentTarget === e.target && setPopupOpen(false)
      }}
    >
      <div
        className={
          popupOpen === 'info'
            ? `${styles.popupBody} ${styles.popupBodyInfoOpen}`
            : styles.popupBody
        }
      >
        <div className={styles.popupContent}>
          <div className={styles.svgType}>
            <BsInfoLg />
          </div>
          <p>{children}</p>
          <button onClick={() => setPopupOpen(false)}>
            <IoCloseSharp />
          </button>
        </div>
      </div>
    </div>
  )
}

export default PopupInfo
