import { Box, Flex, Heading, Spacer, Text, Link } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

function Dao(): ReactElement {
  return (
    <Box id="dao" fontFamily="Lato, sans-serif">
      <Heading as="h2" size="xl">DAO</Heading>
      <br/>
      <Flex>
        {/* <Spacer maxW="15%"  /> */}
        <Box>
          <Text>Each future sale of a Covid Cat will include a 15% royalty.  Future proceeds will go to a treasury for disbursement to charities.</Text>
          <br/>
          <Text>The team will use Snapshot to allow each NFT holder (1 NFT will equal 1 vote) to vote on charity choices.</Text>
          <br/>
          <Text>Community discussions and charity proposals will occur in our Discord server.  We encourage the entire CovidCats community to propose new charities.</Text>
          <br/>
          <Link fontWeight="bold" href="https://discord.gg/WKtnBveD" isExternal>Join our Discord<ExternalLinkIcon mx="2px" /></Link>
        </Box>
        <Spacer maxW="5%" />
      </Flex>
    </Box>
  )
}

export default Dao
