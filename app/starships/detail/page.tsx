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

const Starship = () => {
  const [imageError, setImageError] = useState(false)

  const starshipName = useSearchParams().get("starshipName")
  const starshipId = useSearchParams().get("starshipId")
  const { data, loading, error } = useSwapiData()
  const { starships } = data

  const starshipDetails = starships.find(
    (starship) => starship.name === starshipName
  )
  const starshipImage = `${images.starships}/${starshipId}.jpg`

  const router = useRouter()

  const handleImageError = () => {
    setImageError(true)
  }

  return (
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
            src={starshipImage}
            alt="planet"
            width={400}
            height={400}
            onError={handleImageError}
          />
        )}
        <div className={styles.content}>
          <div className={styles.text}>
            <h1>{starshipDetails?.name}</h1>
            <p>
              <b>Model:</b> {starshipDetails?.model}
            </p>
            <p>
              <b>Manufacturer:</b> {starshipDetails?.manufacturer}
            </p>
            <p>
              <b>Length:</b> {starshipDetails?.length}
            </p>
            <p>
              <b>Cargo capacity:</b> {starshipDetails?.cargo_capacity}
            </p>
            <p>
              <b>Hyperdive rating:</b> {starshipDetails?.hyperdrive_rating}
            </p>
            <p>
              <b>Starship class:</b> {starshipDetails?.starship_class}
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
  )
}

export default Starship
