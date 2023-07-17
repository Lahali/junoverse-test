import "@testing-library/jest-dom"
import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import Card from "../../components/Card"
import exp from "constants"

describe("Card component", () => {
  it("Should render properly", () => {
    render(
      <Card
        name="test-name"
        url="https://test.com/test/7"
        image="https://test.com/test-image.jpg"
      />
    )

    const cardName = screen.getByTestId("card-name")
    expect(cardName).toBeInTheDocument()

    const cardImage = screen.getByTestId("card-image")
    expect(cardImage).toBeInTheDocument()
  })

  it("Should shows error image when image url is invalid", () => {
    render(
      <Card
        name="test-name"
        url="https://test.com/test/7"
        image="https://test.com/test-image.jpg"
      />
    )
    const image = screen.getByTestId("card-image")
    fireEvent(image, new Event("error"))

    const errorImage = screen.getByTestId("error-image")
    expect(errorImage).toBeInTheDocument()
  })
})
