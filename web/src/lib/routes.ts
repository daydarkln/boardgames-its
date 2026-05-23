import { routes } from '@redwoodjs/router'

type RouteParams = Record<string, number | string>

export const routePath = (
  name: string,
  fallback: string,
  params?: RouteParams
) => {
  const helper = (routes as Record<string, unknown>)[name]

  if (typeof helper !== 'function') {
    return fallback
  }

  return (helper as (params?: RouteParams) => string)(params)
}
