import { Box, Center, Flex } from "@chakra-ui/layout"
import { Image, Spacer, Text } from "@chakra-ui/react"
import styled from "@emotion/styled"

const StyledFlex = styled(Flex)({
  padding: "12px",
  height: "60px",

  justifyContent: "space-between",
  alignContent: "center",
  flexWrap: "wrap",

  color: "white",
  backgroundColor: "#0f52ba",
})

const StyledImg = styled(Image)({
  width: "30px",
  height: "30px",
})

const imgSize = 30

const Navbar = () => {
  return (
    <StyledFlex>
      <Text fontSize="xl">InfoSistemas - Code Challenge</Text>
      <Box boxSize={imgSize}>
        <StyledImg
          src="/github-mark-white.svg"
          alt="Github logo"
          width={imgSize}
          height={imgSize}
        />
      </Box>
    </StyledFlex>
  )
}

export default Navbar
