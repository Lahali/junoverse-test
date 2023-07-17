"use client"

import React, { useEffect, useState } from "react"
import Card from "@/components/Card"
import styles from "../page.module.css"
import { images, urls } from "../constants"
import { useSwapiData } from "@/context/DataContext"
import Loader from "@/components/Loader"
import Link from "next/link"
import { useRouter } from "next/navigation"

type TPeople = {
  name: string
  url: string
}

const getData = async (page: number) => {
  try {
    const url = `${urls.people}?page=${page}`
    const response = await fetch(url)
    const data = await response.json()
    return data.results as TPeople[]
  } catch (error) {
    throw new Error("Something went wrong")
  }
}

const People = () => {
  const [page, setPage] = useState(1)
  const [people, setPeople] = useState<TPeople[]>([])

  const { loading, error, endOfData, setEndOfData, setLoading } = useSwapiData()

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
        data.length === 0 ? setEndOfData(true) : setPeople(data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        router.push("/404")
      })
    router.push(`/people?page=${page}`)
  }, [endOfData, page, router, setEndOfData, setLoading])

  const handlePage = (action: string) => {
    action === "increase" ? setPage(page + 1) : setPage(page - 1)
    if (page < 1) return
    if (!people) {
      router.push("/404")
      return
    }
  }

  return (
    <main className={styles.main}>
      {loading && <Loader />}
      {error && <p>Error</p>}
      <div className={styles.container}>
        {people.map((p: TPeople) => (
          <Link
            key={p.name}
            href={`/people/detail?peopleName=${encodeURIComponent(
              p.name
            )}&peopleId=${p.url.split("/")[5]}`}
          >
            <Card name={p.name} url={p.url} image={images.people} />
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

export default People
