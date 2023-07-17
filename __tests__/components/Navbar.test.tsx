import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import Navbar from "../../components/Navbar"

describe("Navbar component", () => {
  it("Should render properly", () => {
    render(<Navbar />)
    const navbar = screen.getByTestId("test-navbar")
    expect(navbar).toBeInTheDocument()
  })

  it("Should render menu icon", () => {
    render(<Navbar />)
    const menuIcon = screen.getByAltText("menu")
    expect(menuIcon).toBeInTheDocument()
  })

  it("Should render navigation content when menu icon is clicked", () => {
    render(<Navbar />)
    const menuIcon = screen.getByAltText("menu")

    fireEvent.click(menuIcon)

    const navigationContent = screen.getAllByTestId("navigation-content")
    navigationContent.forEach((content) => {
      expect(content).toBeInTheDocument()
    })
  })

  it("Should render close icon when menu icon is clicked", () => {
    render(<Navbar />)
    const menuIcon = screen.getByAltText("menu")

    fireEvent.click(menuIcon)

    const closeIcon = screen.getByAltText("close")
    expect(closeIcon).toBeInTheDocument()
  })

  it("Should change content class to hidden", async () => {
    render(<Navbar />)

    const menuIcon = screen.getByAltText("menu")
    fireEvent.click(menuIcon)

    const closeIcon = screen.getByAltText("close")
    fireEvent.click(closeIcon)

    await new Promise((r) => setTimeout(r, 500))

    const navigationContents = screen.getAllByTestId("content-container")
    navigationContents.forEach((content) => {
      expect(content).toHaveClass("hidden")
    })
  })
})
