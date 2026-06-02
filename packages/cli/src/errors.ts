class ValidationError extends Error {

  constructor(
    message: string,
    options: {
    },
  ) {
    super(message)
    this.details = options.details
  }
}

// From https://github.com/causaly/zod-validation-error
export function fromZodError(
  zError: z.ZodError,
  {
    maxIssuesInMessage = 99,
    issueSeparator = '\n- ',
    prefixSeparator = '\n- ',
    prefix = 'Validation Error',
  }: {
    maxIssuesInMessage?: number
    issueSeparator?: string
    prefixSeparator?: string
    prefix?: string
  } = {},
): ValidationError {
  const joinPath = (arr: (string | number)[]) => {
    return arr.reduce<string>((acc, value) => {
      if (typeof value === 'number') return acc + '[' + value + ']'
      const separator = acc === '' ? '' : '.'
      return acc + separator + value
    }, '')
  }

  const reason = zError.issues

    // limit max number of issues printed in the reason section
    .slice(0, maxIssuesInMessage)
    // format error message
    .map((issue) => {
      const { message, path } = issue
      if (path.length > 0) return `${message} at \`${joinPath(path)}\``
      return message
    })
    // concat as string
    .join(issueSeparator)

  const message = reason ? [prefix, reason].join(prefixSeparator) : prefix

  return new ValidationError(message, {
  })
}
