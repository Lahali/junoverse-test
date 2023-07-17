import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import NotFound from "../../../app/404/page"

describe("Not found page", () => {
  it("Should render properly", () => {
    render(<NotFound />)

    const notFound = screen.getByTestId("test-not-found")
    expect(notFound).toBeInTheDocument()

    const text = screen.getByTestId("not-found-text")
    expect(text).toBeInTheDocument()

    const link = screen.getByTestId("not-found-link")
    expect(link).toBeInTheDocument()
  })

  it("Should reset data when link is clicked", () => {
    const resetData = jest.fn()
    render(<NotFound />)

    const link = screen.getByTestId("not-found-link")
    link.onclick = resetData

    fireEvent.click(link)

    expect(resetData).toHaveBeenCalledTimes(1)
  })
})
