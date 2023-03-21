import React, { useState, useEffect } from 'react'
import styles from './PopupEdit.module.scss'
import { IoCloseSharp } from 'react-icons/io5'
import Select from './Select'

function PopupEdit({
  setPopupOpen,
  popupOpen,
  sections,
  addSection,
  setProvideIdSection,
  addAccordion,
  accordions,
  addAccordionChildren,
}) {
  const [selectSec, setSelectSec] = useState('') // textarea
  const [selectAcc, setSelectAcc] = useState('') // select Section
  const [selectTag, setSelectTag] = useState('') // select Accordion
  const [inputText, setInputText] = useState('') // select Tag

  const makeAddData = (func) => {
    if (popupOpen === 'editAccordionChildren') {
      if (!inputText || !selectTag) {
        closePopup()
        return
      } else {
        func(selectTag, inputText) // добавить
        closePopup()
        return
      }
    }

    if (!inputText) {
      setPopupOpen(false)
      setProvideIdSection(false)
      return
    }
    //
    if (inputText) {
      func(inputText)
      setPopupOpen(false)
      setInputText('')
      setProvideIdSection(false)
      return
    }
  }

  const closePopup = () => {
    setPopupOpen(false)
    setProvideIdSection(false)
    setInputText('')
    setSelectSec('')
    setSelectAcc('')
    setSelectTag('')
  }

  return (
    <div
      className={
        popupOpen === 'editAccordion' ||
        popupOpen === 'editSection' ||
        popupOpen === 'editAccordionChildren'
          ? `${styles.popupBack} ${styles.popupBackEditOpen}`
          : styles.popupBack
      }
      onClick={(e) => {
        e.currentTarget === e.target && closePopup()
      }}
    >
      <div
        className={
          popupOpen === 'editAccordion' ||
          popupOpen === 'editSection' ||
          popupOpen === 'editAccordionChildren'
            ? `${styles.popupBody} ${styles.popupBodyEditOpen}`
            : styles.popupBody
        }
      >
        <div className={styles.popupContent}>
          {popupOpen === 'editAccordion' && (
            <>
              <h2>Введите им аккордиона:</h2>
              <div className={styles.popupBlockElement}>
                <textarea
                  className={styles.inputAdd}
                  onChange={(e) => setInputText(e.target.value)}
                  type='text'
                  onKeyPress={(e) =>
                    e.key === 'Enter' && e.shiftKey && makeAddData(addAccordion)
                  }
                  value={inputText}
                />
                <button
                  className={styles.buttonAccept}
                  onClick={() => {
                    makeAddData(addAccordion)
                  }}
                >
                  ОК
                </button>
              </div>
            </>
          )}{' '}
          {popupOpen === 'editAccordionChildren' && (
            <>
              <h2>Выберите параметры children:</h2>
              <div className={styles.popupBlockElement}>
                <Select
                  options={[
                    { label: 'h4', value: 'h4' },
                    { label: 'p', value: 'p' },
                    { label: 'code', value: 'code' },
                  ]}
                  onOptionSelect={(option) => setSelectTag(option.value)}
                >
                  Tag
                </Select>
                <textarea
                  className={styles.inputAdd}
                  onChange={(e) => setInputText(e.target.value)}
                  type='text'
                  onKeyPress={(e) =>
                    e.key === 'Enter' &&
                    e.shiftKey &&
                    makeAddData(addAccordionChildren)
                  }
                  value={inputText}
                />
                <button
                  className={styles.buttonAccept}
                  onClick={() => {
                    makeAddData(addAccordionChildren)
                  }}
                >
                  ОК
                </button>
              </div>
            </>
          )}
          {popupOpen === 'editSection' && (
            <div
              className={`${styles.popupBlockElement} ${styles.popupBlockElementSect}`}
            >
              <h2>Введите название секции:</h2>
              <div className={styles.popupBlockElementSectFlex}>
                <textarea
                  className={styles.inputAdd}
                  onChange={(e) => setInputText(e.target.value)}
                  type='text'
                  onKeyPress={(e) =>
                    e.key === 'Enter' && e.shiftKey && makeAddData(addSection)
                  }
                  value={inputText}
                />
                <button
                  onClick={() => {
                    makeAddData(addSection)
                  }}
                  className={styles.buttonAccept}
                >
                  ОК
                </button>
              </div>
            </div>
          )}
          <button
            className={styles.buttonClose}
            onClick={() => {
              closePopup()
            }}
          >
            <IoCloseSharp />
          </button>
        </div>
      </div>
    </div>
  )
}

export default PopupEdit
