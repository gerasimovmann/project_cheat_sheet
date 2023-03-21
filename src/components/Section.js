import React from 'react'
import Accordion from './Accordion'
import { BiPlus } from 'react-icons/bi'
import styles from '../styles/App.module.scss'
import { IoMdTrash } from 'react-icons/io'

const Section = ({
  sectionEl,
  accordions,
  statePage,
  setPopupOpen,
  setProvideIdSection,
  setProvideIdAccordion,
  deleteSection,
  deleteAccordion,
  deleteAccordionChildren,
}) => {
  return (
    <section>
      <div className={styles.sectionH2}>
        <h2>{sectionEl.title}</h2>
        {statePage !== 'common' && (
          <IoMdTrash
            onClick={() => deleteSection(sectionEl.id)}
            className={styles.svgDelete}
          />
        )}
      </div>
      {accordions.map((elAccord, id) => {
        return sectionEl.id === elAccord.idSection ? (
          <Accordion
            key={id}
            elAccord={elAccord}
            statePage={statePage}
            setProvideIdAccordion={setProvideIdAccordion}
            setPopupOpen={setPopupOpen}
            deleteAccordion={deleteAccordion}
            deleteAccordionChildren={deleteAccordionChildren}
          />
        ) : null
      })}
      {statePage === 'edit' && (
        <button
          onClick={() => {
            setPopupOpen('editAccordion')
            setProvideIdSection(sectionEl.id)
          }}
          className={styles.addSection}
        >
          <BiPlus />
          <span>Аккордион</span>
        </button>
      )}
    </section>
  )
}

export default Section
