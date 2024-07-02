export function encodeData<T>(obj: T): string {
  const json = JSON.stringify(obj)
  return btoa(json)
}

export function decodeData<T>(encodedString: any): T {
  const json = atob(encodedString)
  return JSON.parse(json)
}
