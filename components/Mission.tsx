import { Box, Flex, Heading, Spacer, Text } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

function Mission(): ReactElement {
  return (
    <Box id="mission" >
      <Heading as="h2" size="xl">Mission</Heading>
      <Flex>
        <Spacer maxW="15%" />
        <Box>
          <Text>CovidCats is a 10k generative art project with two simple goals:</Text>
          <Text>#1 -- Create fun, tradable NFTs that increase in value over time</Text>
          <Text>#2 -- Fund charities and organizations that focus on imporoving 
            mental health for those affected by Covid-19
          </Text>
          <Spacer h="2"/>
          <Text>No matter your country of origin or your politics, we can all agree
            that Covid-19 has impacted mental health across the globe.
          </Text>
          <Spacer h="2"/>
          <Text>Uses a randomized # generator to keep raririty truly random</Text>
        </Box>
        <Spacer maxW="5%" />
      </Flex>
    </Box>
  )
}

export default Mission
