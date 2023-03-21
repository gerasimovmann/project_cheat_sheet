import React from 'react'
import Highlight from 'react-highlight'
import 'highlight.js/scss/zenburn.scss'
import styles from '../styles/App.module.scss'
import { IoMdTrash } from 'react-icons/io'
import { BiPlus } from 'react-icons/bi'

const Accordion = ({
  elAccord,
  statePage,
  setProvideIdAccordion,
  setPopupOpen,
  deleteAccordion,
  deleteAccordionChildren,
}) => {
  return (
    <details className={styles.accordion}>
      <summary>
        {elAccord.title}{' '}
        {statePage !== 'common' && (
          <IoMdTrash
            onClick={() => deleteAccordion(elAccord.id)}
            className={styles.svgDelete}
          />
        )}
      </summary>
      <div className={styles.accordionBody}>
        {elAccord.children.map((el, id) => {
          // элементы внутри аккордиона
          if (el.type === 'h4') {
            return (
              <div key={id} className={styles.elAcc}>
                <h4>{el.text}</h4>
                {statePage !== 'common' && (
                  <IoMdTrash
                    onClick={() => {
                      deleteAccordionChildren(id, elAccord.id)
                    }}
                    className={styles.svgDelete}
                  />
                )}
              </div>
            )
          }
          if (el.type === 'p') {
            return (
              <div key={id} className={styles.elAcc}>
                <p>{el.text}</p>
                {statePage !== 'common' && (
                  <IoMdTrash
                    onClick={() => {
                      deleteAccordionChildren(id, elAccord.id)
                    }}
                    className={styles.svgDelete}
                  />
                )}
              </div>
            )
          }
          if (el.type === 'ul') {
            return (
              <div key={id} className={styles.elAcc}>
                <p>{el.text}</p>
                {statePage !== 'common' && (
                  <IoMdTrash
                    onClick={() => {
                      deleteAccordionChildren(id, elAccord.id)
                    }}
                    className={styles.svgDelete}
                  />
                )}
              </div>
            )
          }
          if (el.type === 'div') {
            return (
              <div key={id} className={styles.elAcc}>
                <Highlight>{el.text.trim()}</Highlight>
                {statePage !== 'common' && (
                  <IoMdTrash
                    onClick={() => {
                      deleteAccordionChildren(id, elAccord.id)
                    }}
                    className={styles.svgDelete}
                  />
                )}
              </div>
            )
          }
        })}

        {statePage === 'edit' && (
          <button
            onClick={() => {
              setProvideIdAccordion(elAccord.id)
              setPopupOpen('editAccordionChildren')
            }}
            className={styles.addSection}
          >
            <BiPlus />
            <span>Элемент</span>
          </button>
        )}
      </div>
    </details>
  )
}

export default Accordion
