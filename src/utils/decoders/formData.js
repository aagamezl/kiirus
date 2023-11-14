const getBoundary = (headers) => {
  const contentType = headers['content-type']
  const contentTypeArray = contentType.split(';').map(item => item.trim())
  const boundaryPrefix = 'boundary='
  let boundary = contentTypeArray.find(item => item.startsWith(boundaryPrefix))

  if (!boundary) {
    return null
  }

  boundary = boundary.slice(boundaryPrefix.length)

  if (boundary) {
    boundary = boundary.trim()
  }

  return boundary
}

const formData = (rawData, headers) => {
  const boundary = getBoundary(headers)

  // Parse the multipart/form-data
  const parts = Buffer.concat(rawData).toString('binary').split(`--${boundary}`)
  const formData = {}
  const files = {}

  for (let i = 1; i < parts.length - 1; i++) {
    const part = parts[i].trim()

    if (part !== '') {
      const match = part.match(/Content-Disposition: form-data; name="([^"]+)"/i)
      const name = match && match[1]

      if (name) {
        const isFile = part.includes('filename=')

        if (isFile) {
          // Parse file data
          const fileNameMatch = part.match(/filename="([^"]+)"/i)
          const fileName = fileNameMatch && fileNameMatch[1]
          const fileContent = part.substring(part.indexOf('\r\n\r\n') + 4, part.length)

          files[name] = {
            filename: fileName,
            content: Buffer.from(fileContent, 'binary')
          }
        } else {
          // Parse form field data
          formData[name] = part.substring(part.indexOf('\r\n\r\n') + 4, part.length)
        }
      }
    }
  }

  return { formData, files }
}

export default formData
