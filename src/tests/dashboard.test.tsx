import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render, screen, waitFor } from "@testing-library/react"

import { renderWithClient } from "./utils"

import Dashboard from "../pages/dashboard"

import MockData from "../../db/db.json"

describe("Dashboard", () => {
  it("should render the Dashboard component", async () => {
    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <Dashboard />
      </QueryClientProvider>,
    )

    await waitFor(() => {
      expect(screen.getByText("Dashboard")).toBeInTheDocument()
    })
  })

  it("should render the DepartmentList component", async () => {
    const result = renderWithClient(<Dashboard />)

    await waitFor(
      () => {
        expect(
          result.getByText(`${MockData.departments.length} Abteilungen`),
        ).toBeInTheDocument()
      },
      { timeout: 1500 },
    )
  })

  it("should render the DepartmentFilterSelect component", async () => {
    const result = renderWithClient(<Dashboard />)

    await waitFor(
      () => {
        expect(result.getByText("Wähle eine Abteilung")).toBeInTheDocument()
      },
      { timeout: 1500 },
    )
  })
})
