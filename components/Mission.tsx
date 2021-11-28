import { Box, Flex, Heading, Spacer, Text } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

function Mission(): ReactElement {
  return (
    <Box id="mission" fontFamily="Lato, sans-serif">
      <Heading as="h2" size="xl">Mission</Heading>
      <br/>
      <Flex>
        {/* <Spacer maxW="15%"  /> */}
        <Box>
          <Text>CovidCats is a 10k generative art project with two simple goals:</Text>
          <br/>
          <Text>#1 -- Create fun, tradable NFTs that using a randomized rarity generator (Chainlink VRF)</Text>
          <Text>#2 -- Fund charities and organizations dedicated to improving mental health for those affected by Covid-19</Text>
          {/* <Spacer h="2"/> */}
          <br/>
          <Text>Covid-19 has impacted mental health across the globe.  We’re not here to debate vaccines and mask mandates.  We think everyone can agree that mental health has been hit hard by the pandemic, and we want to use NFTs to help.</Text>
          {/* <Spacer h="2"/> */}
        </Box>
        <Spacer maxW="5%" />
      </Flex>
    </Box>
  )
}

export default Mission
