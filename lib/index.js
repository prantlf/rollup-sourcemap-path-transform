export function createPathTransform({ prefixes = {}, requirePrefix } = {}) {
  for (const prefix of Object.keys(prefixes)) {
    const normalisedPrefix = prefix.replaceAll('\\', '/')
    if (prefix !== normalisedPrefix) {
      prefixes[normalisedPrefix] = prefixes[prefix]
      delete prefixes[prefix]
    }
  }
  return relativeSourcePath => {
    relativeSourcePath = relativeSourcePath.replaceAll('\\', '/')
    for (const prefix in prefixes) {
      let { length } = prefix
      let index
      if (prefix.startsWith('*')) {
        index = relativeSourcePath.indexOf(prefix.substring(1))
        --length
      } else {
        index = relativeSourcePath.startsWith(prefix) ? 0 : -1
      }
      if (index >= 0) {
        return `${prefixes[prefix]}${relativeSourcePath.substring(index + length)}`
      }
    }
    if (requirePrefix) throw new Error(`Unrecognised path: ${relativeSourcePath}`)
    return relativeSourcePath
  }
}
