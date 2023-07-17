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

const Film = () => {
  const [imageError, setImageError] = useState(false)

  const filmName = useSearchParams().get("filmName")
  const filmId = useSearchParams().get("filmId")

  const { data, loading, error } = useSwapiData()
  const { films } = data

  const filmDetails = films.find((film) => film.title === filmName)
  const filmImage = `${images.films}/${filmId}.jpg`

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
              src={filmImage}
              alt="film"
              width={400}
              height={400}
              onError={handleImageError}
            />
          )}
          <div className={styles.content}>
            <div className={styles.text}>
              <h1>{filmDetails?.title}</h1>
              <p>
                <b>Episode:</b> {filmDetails?.episode_id}
              </p>
              <p>
                <b>Director:</b> {filmDetails?.director}
              </p>
              <p>
                <b>Producer:</b> {filmDetails?.producer}
              </p>
              <p>
                <b>Release date:</b> {filmDetails?.release_date}
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

export default Film
