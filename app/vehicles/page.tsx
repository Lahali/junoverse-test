"use client"

import React, { useEffect, useState } from "react"
import Card from "@/components/Card"
import styles from "../page.module.css"
import { images, urls } from "../constants"
import { useSwapiData } from "@/context/DataContext"
import Link from "next/link"
import Loader from "@/components/Loader"
import { useRouter } from "next/navigation"

type TVehicles = {
  name: string
  url: string
}

const getData = async (page: number) => {
  try {
    const url = `${urls.vehicles}?page=${page}`
    const response = await fetch(url)
    const data = await response.json()
    return data.results as TVehicles[]
  } catch (error) {
    throw new Error("Something went wrong")
  }
}

const Vehicles = () => {
  const [page, setPage] = useState(1)
  const [vehicles, setVehicles] = useState<TVehicles[]>([])

  const { error, loading, endOfData, setEndOfData, setLoading } = useSwapiData()

  const router = useRouter()

  useEffect(() => {
    if (endOfData) {
      router.push("/404")
      return
    }

    if (page < 1) return
    setLoading(true)

    getData(page)
      .then((data) => {
        data.length === 0 ? setEndOfData(true) : setVehicles(data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        router.push("/404")
      })
    router.push(`/vehicles?page=${page}`)
  }, [endOfData, page, router, setEndOfData, setLoading])

  const handlePage = (action: string) => {
    action === "increase" ? setPage(page + 1) : setPage(page - 1)
    if (page < 1) return
    if (!vehicles) {
      router.push("/404")
    }
  }

  return (
    <main className={styles.main}>
      {loading && <Loader />}
      {error && <p>Error</p>}
      <div className={styles.container}>
        {vehicles.map((vehicle: TVehicles) => (
          <Link
            key={vehicle.name}
            href={`/vehicles/detail?vehicleName=${encodeURIComponent(
              vehicle.name
            )}&vehicleId=${vehicle.url.split("/")[5]}`}
          >
            <Card
              name={vehicle.name}
              url={vehicle.url}
              image={images.vehicles}
            />
          </Link>
        ))}
      </div>
      <div className={styles.buttonsContainer}>
        <button
          className={styles.button}
          onClick={() => handlePage("increase")}
        >
          load more
        </button>
        <button
          className={page === 1 ? styles.hidden : styles.button}
          onClick={() => handlePage("decrease")}
        >
          go back
        </button>
      </div>
    </main>
  )
}

export default Vehicles
