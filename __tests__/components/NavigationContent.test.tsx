import React from "react"
import { render, screen } from "@testing-library/react"
import NavigationContent from "../../components/NavigationContent"

describe("NavigationContent component", () => {
  it("Should render properly", () => {
    render(<NavigationContent />)
    const navigationContent = screen.getAllByTestId("navigation-content")
    navigationContent.forEach((content) => {
      expect(content).toBeInTheDocument()
    })
  })

  it("Should render navigation link", () => {
    render(<NavigationContent />)
    const navigationLink = screen.getAllByTestId("navigation-link")
    navigationLink.forEach((link) => {
      expect(link).toBeInTheDocument()
    })
  })
})
