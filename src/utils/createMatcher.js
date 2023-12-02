const createMatcher = (regex) => {
  return (input, offset = 0) => {
    regex.lastIndex = offset
    return regex.test(input)
  }
}

export default createMatcher
