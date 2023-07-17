"use client"

import React, { useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import styles from "../../page.module.css"
import { images } from "@/app/constants"
import { useSwapiData } from "@/context/DataContext"
import back from "../../../public/back.svg"
import { useRouter } from "next/navigation"
import Loader from "@/components/Loader"

const Planet = () => {
  const [imageError, setImageError] = useState(false)

  const planetName = useSearchParams().get("planetName")
  const planetId = useSearchParams().get("planetId")
  const { data, loading, error } = useSwapiData()
  const { planets } = data

  const planetDetails = planets.find((planet) => planet.name === planetName)
  const planetImage = `${images.planets}/${planetId}.jpg`

  const router = useRouter()

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <>
      <main className={styles.mainDetail}>
        {loading && <Loader />}
        {error && <p>Error</p>}
        <div className={styles.detail}>
          {imageError ? (
            <Image
              src={images.notFound}
              alt="error image"
              width={400}
              height={400}
            />
          ) : (
            <Image
              src={planetImage}
              alt="planet"
              width={400}
              height={400}
              onError={handleImageError}
            />
          )}
          <div className={styles.content}>
            <div className={styles.text}>
              <h1>{planetDetails?.name}</h1>
              <p>
                <b>Population:</b> {planetDetails?.population}
              </p>
              <p>
                <b>Climate:</b> {planetDetails?.climate}
              </p>
              <p>
                <b>Terrain:</b> {planetDetails?.terrain}
              </p>
              <p>
                <b>Gravity:</b> {planetDetails?.gravity}
              </p>
              <p>
                <b> Diameter:</b> {planetDetails?.diameter}
              </p>
              <p>
                <b>Surface water:</b> {planetDetails?.surface_water}
              </p>
            </div>
            <div className={styles.buttonContainer}>
              <button onClick={() => router.back()}>
                <Image src={back} width={40} height={40} alt="back-icon" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Planet
