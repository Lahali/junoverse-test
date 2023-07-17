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
import { spec } from "node:test/reporters"

const SpeciesDetaill = () => {
  const [imageError, setImageError] = useState(false)

  const speciesName = useSearchParams().get("speciesName")
  const speciesId = useSearchParams().get("speciesId")
  const { data, loading, error } = useSwapiData()
  const { species } = data

  const speciesDetails = species.find((sp) => sp.name === speciesName)
  const speciesImage = `${images.species}/${speciesId}.jpg`

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
              src={speciesImage}
              alt="species"
              width={400}
              height={400}
              onError={handleImageError}
            />
          )}
          <div className={styles.content}>
            <div className={styles.text}>
              <h1>{speciesDetails?.title}</h1>
              <p>
                <b>Name:</b> {speciesDetails?.name}
              </p>
              <p>
                <b>Classification:</b> {speciesDetails?.classification}
              </p>
              <p>
                <b>Designation:</b> {speciesDetails?.designation}
              </p>
              <p>
                <b>Skin colors:</b> {speciesDetails?.skin_colors}
              </p>
              <p>
                <b>Hair colors:</b> {speciesDetails?.hair_colors}
              </p>
              <p>
                <b>Eye colors:</b> {speciesDetails?.eye_colors}
              </p>
              <p>
                <b>Language:</b> {speciesDetails?.language}
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

export default SpeciesDetaill
