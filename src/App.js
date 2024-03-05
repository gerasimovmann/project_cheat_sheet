import { useState } from "react"
import "./App.css"
import styles from "./styles/App.module.scss"
import "./styles/config.scss"
import dataSection from "./data/dataSection"
import dataSectionEmpty from "./data/dataSectionEmpty"
import dataSummary from "./data/dataSummary"
import dataSummaryEmpty from "./data/dataSummaryEmpty"
import { AiFillEdit } from "react-icons/ai"
import { BiPlus } from "react-icons/bi"
import "react-tooltip/dist/react-tooltip.css"
import { Tooltip } from "react-tooltip"
import Button from "./components/Button"
import { IoCloseSharp } from "react-icons/io5"
import { BsFillSunFill, BsCloudSunFill } from "react-icons/bs"
import { useEffect } from "react"
import PopupInfo from "./components/PopupInfo"
import PopupEdit from "./components/PopupEdit"
import Section from "./components/Section"

const themes = {
  dark: "dark",
  light: "light",
}
const getTheme = () => {
  // при загрузке страницы получает из localStorage записанную тему
  const theme = `${window?.localStorage?.getItem("theme")}`
  if (theme === "undefined" || theme === "null") return "light"
  return themes[theme]
}

const getDataSections = () => {
  // при загрузке страницы получает из localStorage записанную тему
  const dataSections = `${window?.localStorage?.getItem("dataSections")}`
  if (dataSections) return dataSections
}

const getDataAccordions = () => {
  // при загрузке страницы получает из localStorage записанную тему
  const dataAccordions = `${window?.localStorage?.getItem("dataAccordions")}`
  if (dataAccordions) return dataAccordions
}

const App = function App() {
  const [localStorageSections, setLocalStorageSections] = useState(getDataSections())
  const [localStorageAccordions, setLocalStorageAccordions] = useState(getDataAccordions())
  const [sections, setSections] = useState(() => (localStorageSections !== "null" ? JSON.parse(localStorageSections) : dataSection)) // data
  const [accordions, setAccordions] = useState(() => (localStorageAccordions !== "null" ? JSON.parse(localStorageAccordions) : dataSummary)) // data

  const [statePage, setStatePage] = useState("common") // edit / common
  const [nightMode, setNightMode] = useState(false) // toggle for button
  const [theme, setTheme] = useState(getTheme()) // state of localStorage
  const [popupOpen, setPopupOpen] = useState("") // state of popup
  const [provideIdSection, setProvideIdSection] = useState(false)
  const [provideIdAccordion, setProvideIdAccordion] = useState(false)

  useEffect(() => {
    localStorage.setItem("dataSections", JSON.stringify(sections))
    localStorage.setItem("dataAccordions", JSON.stringify(accordions))
    document.documentElement.dataset.popup = popupOpen
    document.documentElement.dataset.theme = theme
    localStorage.setItem("theme", theme)
  }, [sections, accordions, popupOpen, nightMode])

  const deleteSection = (sectionId) => {
    // удаляем секцию сравнивая id через метод filter
    setSections((prev) => {
      return prev.filter((el) => sectionId !== el.id)
    })
  }

  const deleteAccordion = (accordionId) => {
    // удаляем аккордион сравнивая id через метод filter
    setAccordions((prev) => {
      return prev.filter((el) => accordionId !== el.id)
    })
  }

  const deleteAccordionChildren = (childrenId, accordId) => {
    // удаляем tag указывая id в методе splice. Не используем filter, тк это вложенный массив состояния, необходимо мутировать массив
    setAccordions((prev) => {
      const newData = [...prev]
      console.log(newData[accordId - 1].children.splice(childrenId, 1))
      return newData
    })
  }

  const addSection = (text) => {
    // добавляем новую секцию
    const modelSections = {
      id: sections.length + 1,
      title: text,
    }
    setSections((prev) => [...prev, modelSections])
  }

  const addAccordion = (text) => {
    // добавляем новый аккордион
    const modelAccordion = {
      id: accordions.length + 1,
      idSection: provideIdSection,
      title: text,
      children: [],
    }
    setAccordions((prev) => [...prev, modelAccordion])
  }

  const addAccordionChildren = (selectTag, text) => {
    // добавляем новый элемент в children
    const modelTag = {
      type: selectTag,
      text: text,
    }
    setAccordions((prev) => {
      const newData = [...prev]
      newData[provideIdAccordion - 1].children.push(modelTag)
      return newData
    })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchTitle}>
        <h1>
          Шпаргалка <span>JavaScript</span>
        </h1>
      </div>
      {sections.length ? (
        sections.map((sectionEl, idSec) => {
          return (
            <Section
              key={idSec}
              deleteSection={deleteSection}
              deleteAccordion={deleteAccordion}
              accordions={accordions}
              setAccordions={setAccordions}
              sectionEl={sectionEl}
              statePage={statePage}
              setPopupOpen={setPopupOpen}
              setProvideIdSection={setProvideIdSection}
              setProvideIdAccordion={setProvideIdAccordion}
              deleteAccordionChildren={deleteAccordionChildren}
            />
          )
        })
      ) : (
        <div className={styles.emptyData}>
          Добавьте ваш первый блок <span>&#128578;</span>
        </div>
      )}
      {statePage === "edit" && (
        <button
          onClick={() => {
            setPopupOpen("editSection")
          }}
          className={styles.addSection}
        >
          <BiPlus />
          <span>Секция</span>
        </button>
      )}
      {/* fixed buttons */}
      <div className={styles.fixedBar}>
        {statePage === "edit" && <Tooltip anchorId="titleAdd" place="left" content="Добавить аккордион" />}
        {statePage === "edit" && <Tooltip anchorId="titleEdit" place="left" content="Выйти" />}
        {statePage === "common" && <Tooltip anchorId="titleEdit" place="left" content="Редактировать" />}
        <Tooltip anchorId="titleColor" place="left" content="Сменить тему" />
        <Button
          statePage={statePage}
          id="titleEdit"
          onClick={() => {
            statePage === "edit" ? setStatePage((prev) => (prev = "common")) : setStatePage((prev) => (prev = "edit"))
            statePage === "common" && setPopupOpen("info")
          }}
        >
          {statePage === "common" ? <AiFillEdit /> : <IoCloseSharp />}
        </Button>
        <Button
          id="titleColor"
          onClick={() => {
            setNightMode((prev) => !prev) // toggle state
            if (theme === themes.light) setTheme(themes.dark) // записываем правильную тему при нажатии
            if (theme === themes.dark) setTheme(themes.light) // записываем правильную тему при нажатии
          }}
        >
          {nightMode ? <BsFillSunFill /> : <BsCloudSunFill />}
        </Button>
      </div>
      <PopupInfo popupOpen={popupOpen} setPopupOpen={setPopupOpen}>
        Вы находитесь в режиме редактирования.
      </PopupInfo>
      <PopupEdit
        sections={sections}
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        addSection={addSection}
        setProvideIdSection={setProvideIdSection}
        addAccordion={addAccordion}
        accordions={accordions}
        addAccordionChildren={addAccordionChildren}
      ></PopupEdit>
    </div>
  )
}

export default App
