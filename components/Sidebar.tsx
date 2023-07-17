"use client"

import React from "react"
import styles from "./components.module.css"
import NavigationContent from "./NavigationContent"
import { useRouter } from "next/navigation"
import Image from "next/image"
import back from "../public/back.svg"

const Sidebar = () => {
  const router = useRouter()
  return (
    <aside className={styles.aside} data-testid="test-sidebar">
      <NavigationContent />
      <Image
        src={back}
        width={40}
        height={40}
        alt="go back"
        onClick={() => router.back()}
      />
    </aside>
  )
}

export default Sidebar
