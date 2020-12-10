// import dependencies
import React from 'react'
import AppHeader from "./AppHeader"

// import react-testing methods
import { render, cleanup } from '@testing-library/react'

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup)

describe("AppHeader", () => {

    test("Renders App Header correctly", () => {
        const { getByText } = render(<AppHeader isUserSignedIn={true} />)

        expect(getByText("Sign Out")).toBeTruthy()
        expect(getByText("Simple Chat App")).toBeTruthy()
    })

    test("Renders App Header correctly", () => {
        const { getByText } = render(<AppHeader isUserSignedIn={false} />)

        expect(getByText("Simple Chat App")).toBeTruthy()
    })
})