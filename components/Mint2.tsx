import { Box, Flex, Select, Text, Image, Button } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

function Mint2(): ReactElement {
  return (
    <Box id="mint" _focus={{bg: "white"}}>
        <Flex justifyContent = "center" mb="25px">
            <Image border = "2px black solid" maxHeight= "100%" width = "384px" src="cat_0.png" alt="CovidCat" /> 
        </Flex>
        <Flex flexDirection = "column" alignItems="center">
            <Text fontSize="2xl" fontWeight="bold">0/10000 CovidCats left at 0.1 ETH each</Text>
            {/* TO-DO connect "0/10000" and "0.1" number to view functions on CovidCats smart contract */}
            <br/>
            <Select maxWidth="25vw" borderColor="gray.400" variant="outline" placeholder="Select number to mint">
              <option value="option1">1</option>
              <option value="option2">2</option>
              <option value="option3">3</option>
              <option value="option3">4</option>
              <option value="option3">5</option>
            </Select>
            <br/>
            <Button colorScheme="blue">Mint</Button>
        </Flex>
    </Box>
  )
}

export default Mint2
