"use client"

import Image from "next/image"
import React, { useState } from "react"
import menu from "../public/menu.svg"
import close from "../public/close.svg"
import styles from "./components.module.css"
import NavigationContent from "./NavigationContent"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <nav className={styles.navbar} data-testid="test-navbar">
        {isOpen ? (
          <Image
            priority
            src={close}
            width={50}
            height={50}
            alt="close"
            onClick={handleClick}
          />
        ) : (
          <Image
            priority
            src={menu}
            width={50}
            height={50}
            alt="menu"
            onClick={handleClick}
          />
        )}
      </nav>
      <div
        className={isOpen ? styles.navigator : styles.hidden}
        data-testid="content-container"
      >
        <NavigationContent handleClick={handleClick} />
      </div>
    </>
  )
}

export default Navbar
