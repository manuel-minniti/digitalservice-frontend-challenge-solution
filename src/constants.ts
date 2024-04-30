export const DB_URL = `http://localhost:${process.env.REACT_APP_DB_PORT}`

export const REACT_QUERY_CLIENT_CONFIG = {
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
}
