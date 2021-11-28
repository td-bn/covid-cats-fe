import { Box, Flex, Heading, Spacer, Text, Link } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

function Charities(): ReactElement {
  return (
    <Box id="charities" fontFamily="Lato, sans-serif">
      <Heading as="h2" size="xl">Charities</Heading>
      <br/>
      <Flex>
        {/* <Spacer maxW="15%"  /> */}
        <Box>
          <Text>We’ve selected three charities to receive the proceeds of the initial minting:</Text>
          <br/>
          <Link fontWeight="bold" href="https://mhanational.org/about" isExternal>Mental Health America <ExternalLinkIcon mx="2px" /></Link>
          <br/>
          <Text>MHA is the leading community-based nonprofit in the US dedicated to addressing the needs of those living with mental illness and to promoting the overall mental health of all.  Recently, MHA released the first state and county-level data about suicide risk during COVID-19. This important data helps identify communities in need of mental health support; it includes resources, greater understanding and awareness, and direct crisis care.</Text>
          <br/>
          <Link fontWeight="bold" href="https://www.beyondblue.org.au/" isExternal>Beyond Blue (Australia)<ExternalLinkIcon mx="2px" /></Link>
          <br/>
          <Text>Beyond Blue provides information and support to help everyone in Australia achieve their best possible mental health, whatever their age and wherever they live.</Text>
          <br/>
          <Link fontWeight="bold" href="https://www.mindsfoundation.org/" isExternal>Minds Foundation (India)<ExternalLinkIcon mx="2px" /></Link>
          <br/>
          <Text>Minds Foundation is the leading mental health foundation in India - their vision is to create a world that fosters a shared approach to mental wellness</Text>
        </Box>
        <Spacer maxW="5%" />
      </Flex>
    </Box>
  )
}

export default Charities
