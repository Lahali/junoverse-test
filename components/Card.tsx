"use client"
import React, { useState } from "react"
import styles from "./components.module.css"
import Image from "next/image"
import { images } from "@/app/constants"

type TCard = {
  name: string
  url: string
  image: string
}

const Card = ({ name, url, image }: TCard) => {
  const [imageError, setImageError] = useState(false)
  const getId = url ? url.split("/") : []

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div className={styles.card} data-testid="test-card">
      {imageError ? (
        <Image
          src={images.notFound}
          alt="error image"
          width={300}
          height={200}
          layout="responsive"
          data-testid="error-image"
        />
      ) : (
        <Image
          src={`${image}/${getId[5]}.jpg`}
          alt="starwars"
          width={300}
          height={200}
          layout="responsive"
          onError={handleImageError}
          data-testid="card-image"
        />
      )}
      <div>
        <p data-testid="card-name">{name}</p>
      </div>
    </div>
  )
}

export default Card
