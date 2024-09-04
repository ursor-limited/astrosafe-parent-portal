declare module '*.png' {
  const value: string

  export default value
}

declare module '*.jpg' {
  const value: string

  export default value
}

declare module '*.jpeg' {
  const value: string

  export default value
}

declare module '*.svg' {
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >

  const src: string

  export default src
}

declare module '*.webp' {
  const value: string

  export default value
}

declare module '*.gif' {
  const value: string

  export default value
}
