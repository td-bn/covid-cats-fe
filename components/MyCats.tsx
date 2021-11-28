import { Box, Flex, Heading, Spacer, Text } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

function MyCats(): ReactElement {
  return (
    <Box id="my-cats" fontFamily="Lato, sans-serif">
      <Heading as="h2" size="xl">My Cats</Heading>
      <br/>
      <Flex>
        {/* <Spacer maxW="15%"  /> */}
        <Box>
          <Text>In Version 2, this section will show your cat and display some information about traits and rarity percentages.  </Text>
        </Box>
        <Spacer maxW="5%" />
      </Flex>
    </Box>
  )
}

export default MyCats
