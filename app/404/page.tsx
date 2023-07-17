"use client"
import Link from "next/link"
import React from "react"
import styles from "./errorStyles.module.css"
import { useSwapiData } from "@/context/DataContext"

const NotFound: React.FC = () => {
  const { resetData } = useSwapiData()

  const handleClick = () => {
    resetData()
  }

  return (
    <div className={styles.main} data-testid="test-not-found">
      <h1 data-testid="not-found-text">404</h1>
      <p>Hard to see the dark side is</p>
      <Link href="/" onClick={handleClick} data-testid="not-found-link">
        Follow the Force
      </Link>
    </div>
  )
}

export default NotFound
