const DAY_FACTOR = 86_400_000
const HOUR_FACTOR = 3_600_000
const MINUTE_FACTOR = 60_000
const SECOND_FACTOR = 1_000
function isNotNullOrUndefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
export const removeNullishValues = <T>(arr: (T|null|undefined)[]): T[] =>arr.filter(isNotNullOrUndefined)

export const ensureArray = <T>(value: T): T[] =>  {
    if (typeof value === 'undefined'|| !value) return []
    if (Array.isArray(value)) return value
    return []
}
export const dateTime = new Intl.DateTimeFormat('en-US', {
  day: "numeric",
  hour12: false,
  year: "numeric",
  month: 'short',
  minute: 'numeric',
  hour: "numeric",
})
export const formatDate = (date: Date|number) => dateTime.format(date)
export const dateDifference = (date: Date| number) =>{
  const start = date instanceof Date ? date.getTime() : date
  const target = { date: Date.now() - start}
  const days = Math.floor(target.date/ DAY_FACTOR)
  target.date %= DAY_FACTOR
  const hours = Math.floor(target.date/HOUR_FACTOR)
  target.date %= HOUR_FACTOR
  const minutes = Math.floor(target.date/MINUTE_FACTOR)
  target.date%= MINUTE_FACTOR
  const seconds = Math.floor(target.date / SECOND_FACTOR)
  target.date %=SECOND_FACTOR
return Object.assign(target, { date, seconds, minutes, hours, days,})
}
export const drainArray = removeNullishValues
export const replaceSubdomain =(subdomain: string): string => window.location.host.replace(/\w+/, subdomain)

export  const determineEnvironment = (environment: string): string => {
    switch(environment) {
      default: return `Unknown Environment`
      case 'dev':
      case 'development':
        return "Development"
      case 'prod':
        case 'production':
          return 'Production'
    }
  }