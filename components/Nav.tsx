import React, { ReactElement } from 'react'
import { Link, HStack, Box, Flex, Spacer, useToken } from "@chakra-ui/react"
import useEagerConnect from "../hooks/useEagerConnect";
import Account from './Account';

// [LinkName, HTML_ID]
const links = [
  ["Mission", "mission"],
  ["Mint", "mint"],
  ["My Cats", "cats"],
  ["Charities", "charities"],
  ["DAO", "dao"],
]

function Nav(): ReactElement {
  const [black, blue200] = useToken(
    "colors",
    ["black", "blue.200"],
  )
  const triedToEagerConnect = useEagerConnect()

  return (
    <Flex mt="10" >
      <Box w="10"></Box>
      <Spacer />
      <HStack ml="10" mr="5" boxShadow={`5px 5px 5px ${black}, 0 0 8px ${blue200}`} bg="white" spacing="2px">
        {
          links.map( (link, i) => (
            <Box 
              key={i} p="2"
              onClick={()=>{window.location.href=`#${link[1]}`}}
              _hover={{ bg: "purple.300"}} >
              <Link 
                _hover={{ textDecoration: "none"}}
                _focus={{ outline: "0", border: "none"}}
                p="2">
                  {link[0]}
              </Link>
            </Box>
          ))
        }
      </HStack>
      <Spacer />
      <Account triedToEagerConnect={triedToEagerConnect} />
    </Flex>
  )
}

export default Nav
