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

const PeopleDetail = () => {
  const [imageError, setImageError] = useState(false)

  const peopleName = useSearchParams().get("peopleName")
  const peopleId = useSearchParams().get("peopleId")

  const { data, loading, error } = useSwapiData()
  const { people } = data

  const peopleDetails = people.find((p) => p.name === peopleName)
  const peopleImage = `${images.people}/${peopleId}.jpg`

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
              src={peopleImage}
              alt="planet"
              width={400}
              height={400}
              onError={handleImageError}
            />
          )}
          <div className={styles.content}>
            <div className={styles.text}>
              <h1>{peopleDetails?.name}</h1>
              <p>
                <b>Height:</b> {peopleDetails?.height}
              </p>
              <p>
                <b>Mass:</b> {peopleDetails?.mass}
              </p>
              <p>
                <b>Hair color:</b> {peopleDetails?.hair_color}
              </p>
              <p>
                <b>Skin color:</b> {peopleDetails?.skin_color}
              </p>
              <p>
                <b>Eye color:</b> {peopleDetails?.eye_color}
              </p>
              <p>
                <b>Birth year:</b> {peopleDetails?.birth_year}
              </p>
              <p>
                <b>Gender:</b> {peopleDetails?.gender}
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

export default PeopleDetail
