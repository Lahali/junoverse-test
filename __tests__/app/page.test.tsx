import React from "react"
import { render, screen } from "@testing-library/react"
import Home from "../../app/page"

describe("Home page", () => {
  it("Should render properly", () => {
    render(<Home />)

    const image = screen.getByTestId("home-image")
    expect(image).toBeInTheDocument()

    const text = screen.getByTestId("home-text")
    expect(text).toBeInTheDocument()

    const home = screen.getByTestId("test-home")
    expect(home).toBeInTheDocument()
    expect(home).toHaveClass("welcome")
  })
})
