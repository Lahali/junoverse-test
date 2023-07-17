import React from "react"
import { render, screen } from "@testing-library/react"
import Loader from "../../components/Loader"

describe("Loader component", () => {
  it("Should render properly", () => {
    render(<Loader />)
    const loaderText = screen.getByTestId("text-loader")
    expect(loaderText).toBeInTheDocument()
  })

  it("Renders when loading is true", () => {
    render(<Loader />)
    const loaderText = screen.getByTestId("text-loader")
    expect(loaderText).toBeInTheDocument()

    const loader = screen.getByTestId("span-loader")
    expect(loader).toBeInTheDocument()
  })
})
