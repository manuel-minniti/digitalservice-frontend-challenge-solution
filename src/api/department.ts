import {
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query"
import { DB_URL } from "../constants"

const DEPARTMENTS_ENDPOINT = `${DB_URL}/departments`
const DEPARTMENTS_QUERY_KEY = "departments"

export async function fetchDepartments() {
  // Simulate network request.
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const response = await fetch(DEPARTMENTS_ENDPOINT)

  // Simulate random network error.
  if (Math.random() < 0.3 || !response.ok) {
    throw new Error("Die Abteilungen konnten nicht geladen werden.")
  }

  return response.json()
}

export function useDepartments() {
  return useQuery({
    queryKey: [DEPARTMENTS_QUERY_KEY],
    queryFn: fetchDepartments,
    initialData: [],
  })
}
