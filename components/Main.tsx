import React, { ReactElement } from 'react'
import { Container, VStack, Box, Heading, Text } from "@chakra-ui/react"
import Mission from './Mission'
import Mint from './Mint'
import Mint2 from './Mint2'

function Main(): ReactElement {
  return (
    <VStack
      spacing={4}
      align="stretch"
      my="20"
    >
      <Box minH="300px" bg="white.100" mt="40px" mb="50px">
        <Mint2/>
      </Box> 
      <Box p={3} minH="200px" bg="yellow.100" border="2px">
        <Mission />
      </Box>
      {/* <Box p={3} minH="200px" bg="pink.100" id="cats" border="2px">
        <Heading as="h2" size="xl">My Cats</Heading>
        <br/>
        <Text>Integrated with the Chainlink VRF function to generate provably random traits</Text>
      </Box>
      <Box p={3} minH="200px" bg="green.100" id="charities" border="2px">
        <Heading as="h2" size="xl">Charities</Heading>
      </Box>
      <Box p={3} minH="200px" bg="orange.100" id="dao" border="2px">
        <Heading as="h2" size="xl">DAO</Heading>
      </Box> */}
    </VStack>
  )
}

export default Main