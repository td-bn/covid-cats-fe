import React, { ReactElement } from 'react'
import { Container, VStack, Box, StackDivider } from "@chakra-ui/react"
import Mission from './Mission'

function Main(): ReactElement {
  return (
    <VStack
      spacing={4}
      align="stretch"
      mt="20"
    >
      <Box minH="500px" />
      <Box minH="200px" bg="yellow.200">
        <Mission />
      </Box>
      <Box minH="200px" bg="tomato">
      </Box>
      <Box minH="200px" bg="pink.100">
      </Box>
    </VStack>
  )
}

export default Main
