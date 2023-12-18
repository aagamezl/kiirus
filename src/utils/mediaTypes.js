const mediaTypesMapping = {
  'application/json': {
    charset: 'UTF-8',
    extensions: ['json']
  },
  'application/xml': {
    charset: 'UTF-8',
    extensions: ['xml']
  },
  'application/xhtml+xml': {
    charset: 'UTF-8',
    extensions: ['xhtml']
  },
  'text/html': {
    charset: 'UTF-8',
    extensions: ['html', 'htm']
  },
  'text/plain': {
    charset: 'UTF-8',
    extensions: ['txt']
  },
  'application/javascript': {
    charset: 'UTF-8',
    extensions: ['js']
  },
  'image/jpeg': {
    charset: null,
    extensions: ['jpg', 'jpeg']
  },
  'image/png': {
    charset: null,
    extensions: ['png']
  },
  'image/gif': {
    charset: null,
    extensions: ['gif']
  },
  'audio/mpeg': {
    charset: null,
    extensions: ['mp3']
  },
  'video/mp4': {
    charset: null,
    extensions: ['mp4']
  },
  'application/pdf': {
    charset: null,
    extensions: ['pdf']
  },
  'application/zip': {
    charset: null,
    extensions: ['zip']
  },
  'application/x-www-form-urlencoded': {
    charset: 'UTF-8',
    extensions: []
  },
  'multipart/form-data': {
    charset: null,
    extensions: []
  }
  // Add more as needed
}

// TODO: Review this function, I think can be improved
const parseContentType = (contentTypeHeader) => {
  if (!contentTypeHeader) {
    return { type: null, charset: null }
  }

  // Split the Content-Type header into type and parameters
  // const [type, ...parameters] = contentTypeHeader.split(';').map(part => part.trim())
  const [type] = contentTypeHeader.split(';').map(part => part.trim())

  // Extract charset from parameters
  // let charset = null
  // parameters.forEach(param => {
  //   const [name, value] = param.split('=').map(part => part.trim().toLowerCase())
  //   if (name === 'charset' && value) {
  //     charset = value
  //   }
  // })

  const isValidType = mediaTypesMapping[type.toLowerCase()]

  return { type: isValidType ?? {} }
}

export default parseContentType
