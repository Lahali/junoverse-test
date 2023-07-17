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

const Vehicle = () => {
  const [imageError, setImageError] = useState(false)

  const vehicleName = useSearchParams().get("vehicleName")
  const vehicleId = useSearchParams().get("vehicleId")

  const { data, loading, error } = useSwapiData()
  const { vehicles } = data

  const vehicleDetails = vehicles.find(
    (vehicle) => vehicle.name === vehicleName
  )
  const vehicleImage = `${images.vehicles}/${vehicleId}.jpg`

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
              src={vehicleImage}
              alt="vehicle"
              width={400}
              height={400}
              onError={handleImageError}
            />
          )}
          <div className={styles.content}>
            <div className={styles.text}>
              <h1>{vehicleDetails?.name}</h1>
              <p>
                <b>Model:</b> {vehicleDetails?.model}
              </p>
              <p>
                <b>Manufacturer:</b> {vehicleDetails?.manufacturer}
              </p>
              <p>
                <b>Length:</b> {vehicleDetails?.length}
              </p>
              <p>
                <b>Cargo capacity:</b> {vehicleDetails?.cargo_capacity}
              </p>
              <p>
                <b>Passengers:</b> {vehicleDetails?.passengers}
              </p>
              <p>
                <b>Vehicle class:</b> {vehicleDetails?.vehicle_class}
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

export default Vehicle
