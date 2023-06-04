import { ChakraProvider } from "@chakra-ui/react"

import "../css/reset.css"

const _App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default _App
