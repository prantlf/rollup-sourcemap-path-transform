export function createPathTransform({ prefixes = {}, requirePrefix } = {}) {
  return relativeSourcePath => {
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
