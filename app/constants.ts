export const urls = {
  planets: "https://swapi.dev/api/planets/",
  starships: "https://swapi.dev/api/starships/",
  vehicles: "https://swapi.dev/api/vehicles/",
  people: "https://swapi.dev/api/people/",
  films: "https://swapi.dev/api/films",
  species: "https://swapi.dev/api/species",
}

export const images = {
  planets: "https://starwars-visualguide.com/assets/img/planets",
  starships: "https://starwars-visualguide.com/assets/img/starships",
  vehicles: "https://starwars-visualguide.com/assets/img/vehicles",
  people: "https://starwars-visualguide.com/assets/img/people",
  films: "https://starwars-visualguide.com/assets/img/films",
  species: "https://starwars-visualguide.com/assets/img/species",
  notFound: "https://starwars-visualguide.com/assets/img/big-placeholder.jpg",
}

export const navigate = {
  planets: "/planets",
  starships: "/starships",
  vehicles: "/vehicles",
  people: "/people",
  films: "/films",
  species: "/species",
}

export const categories = [
  { name: "home", url: "/" },
  { name: "planets", url: navigate.planets },
  { name: "starships", url: navigate.starships },
  { name: "vehicles", url: navigate.vehicles },
  { name: "people", url: navigate.people },
  { name: "films", url: navigate.films },
  { name: "species", url: navigate.species },
]
