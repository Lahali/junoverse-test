"use client"

import { urls } from "@/app/constants"
import React, { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type TSwapiDataResults = {
  name: string
  url: string
  diameter?: string
  climate?: string
  terrain?: string
  surface_water?: string
  population?: string
  gravity?: string
  model?: string
  manufacturer?: string
  cost_in_credits?: string
  length?: string
  cargo_capacity?: string
  hyperdrive_rating?: string
  starship_class?: string
  passengers?: string
  vehicle_class?: string
  height?: string
  mass?: string
  hair_color?: string
  skin_color?: string
  eye_color?: string
  birth_year?: string
  gender?: string
  title?: string
  episode_id?: string
  director?: string
  producer?: string
  release_date?: string
  classification?: string
  designation?: string
  average_height?: string
  average_lifespan?: string
  language?: string
  skin_colors?: string
  hair_colors?: string
  eye_colors?: string
}

type TSwapiData = {
  data: {
    planets: TSwapiDataResults[]
    starships: TSwapiDataResults[]
    vehicles: TSwapiDataResults[]
    people: TSwapiDataResults[]
    films: TSwapiDataResults[]
    species: TSwapiDataResults[]
  }
  loading: boolean
  error: boolean
  page: number
  resetData: () => void | undefined
  endOfData: boolean
  setEndOfData: (value: boolean) => void
  setLoading: (value: boolean) => void
  setError: (value: boolean) => void
}

const initialContext: TSwapiData = {
  data: {
    planets: [],
    starships: [],
    vehicles: [],
    people: [],
    films: [],
    species: [],
  },
  loading: false,
  error: false,
  page: 1,
  setEndOfData: () => {},
  setLoading: () => {},
  setError: () => {},
  resetData: () => {},
  endOfData: false,
}

export const SwapiDataContext = createContext<TSwapiData>(initialContext)

export const useSwapiData = () => {
  const context = useContext(SwapiDataContext)
  if (!context) {
    throw new Error("This hook must be used within a Provider")
  }
  return context
}

export const SwapiDataProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [data, setData] = useState(initialContext.data)
  const [endOfData, setEndOfData] = useState(false)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(initialContext.loading)
  const [error, setError] = useState(initialContext.error)

  const router = useRouter()

  const fetchData = async (url: string): Promise<TSwapiDataResults[]> => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      return data.results as TSwapiDataResults[]
    } catch (error) {
      console.log(error)
      throw new Error("Something went wrong")
    }
  }

  const getPlanets = () => {
    const url = `${urls.planets}?page=${page}`
    return fetchData(url)
  }

  const getStarships = async () => {
    const url = `${urls.starships}?page=${page}`
    return fetchData(url)
  }

  const getVehicles = async () => {
    const url = `${urls.vehicles}?page=${page}`
    return fetchData(url)
  }

  const getPeople = async () => {
    const url = `${urls.people}?page=${page}`
    return fetchData(url)
  }

  const getFilms = async () => {
    const url = `${urls.films}?page=${page}`
    return fetchData(url)
  }

  const getSpecies = async () => {
    const url = `${urls.species}?page=${page}`
    return fetchData(url)
  }

  useEffect(() => {
    setLoading(true)
    setError(false)

    Promise.all([
      getPeople(),
      getStarships(),
      getPlanets(),
      getVehicles(),
      getFilms(),
      getSpecies(),
    ])
      .then(
        ([
          peopleData,
          starshipsData,
          planetsData,
          vehiclesData,
          filmsData,
          speciesData,
        ]) => {
          setLoading(false)
          const newData = {
            people: peopleData,
            starships: starshipsData,
            planets: planetsData,
            vehicles: vehiclesData,
            films: filmsData,
            species: speciesData,
          }
          setData(newData)
          if (
            peopleData.length === 0 ||
            starshipsData.length === 0 ||
            planetsData.length === 0 ||
            vehiclesData.length === 0 ||
            filmsData.length === 0 ||
            speciesData.length === 0
          ) {
            setEndOfData(true)
          }
        }
      )
      .catch((error) => {
        setError(true)
        console.log(error)
        router.push("/not-found")
      })
  }, [endOfData, page, router])

  const resetData = () => {
    setPage(1)
    setData(initialContext.data)
  }

  return (
    <SwapiDataContext.Provider
      value={{
        data,
        loading,
        error,
        endOfData,
        page,
        resetData,
        setError,
        setLoading,
        setEndOfData,
      }}
    >
      {children}
    </SwapiDataContext.Provider>
  )
}
