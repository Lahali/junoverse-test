"use client"

import React, { useEffect } from "react"
import styles from "./components.module.css"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { categories } from "@/app/constants"

type TNavigate = {
  handleClick?: () => void
}

const NavigationContent: React.FC<TNavigate> = ({ handleClick }) => {
  const currentRoute = usePathname()

  return (
    <>
      {categories.map((category) => (
        <div
          data-testid="navigation-content"
          key={category.name}
          className={
            currentRoute === category.url ? styles.isActive : styles.normal
          }
        >
          <Link
            href={category.url}
            onClick={handleClick}
            passHref
            data-testid="navigation-link"
          >
            {category.name}
          </Link>
        </div>
      ))}
    </>
  )
}

export default NavigationContent
