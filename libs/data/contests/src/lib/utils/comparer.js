function isOrIncludes(a, b) {
  if (typeof a === "string") {
    if (a.indexOf(",") >= 0) {
      return a.split(",").includes(b)
    } else {
      return a === b
    }
  } else if (a && a.includes) {
    return a.includes(b)
  }
}

module.exports = {
  isOrIncludes,
}
