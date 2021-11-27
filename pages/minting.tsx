import { useWeb3React } from "@web3-react/core";
import { Container } from "@chakra-ui/react"
import Head from "next/head";
import Nav from '../components/Nav';
import Main from "../components/Main";

import { GetServerSideProps } from 'next'

function Minting({data}) {

  return (
    <div>
      <Head>
        <title>Covid Cats NFT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <Container bg="teal.100" minW="720px" maxW="90%" marginTop="3" > */}
      <Container minW="720px" maxW="90%" marginTop="3" >
        <header >
          <Nav />
        </header>

      <main>
        <Main/>
      </main>
      </Container>

    </div>
  );
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   const { image_engine_main } = require('../image-engine/index')
  
//   // Person presses mint button
//   // Mint tx confirmed
//   // Request /minting page via minting
//   // Need to wait to return value (hopefully metadata_link) from getServerSideProps (Loading for ages until return value, give loading visuals)
//   // Once have metadata_link, render minting page with metadata link and image

//   try {
//     const metadata_link = await image_engine_main();
//     console.log(metadata_link)
//     console.log("GOT METADATA LINK")
//     const data = metadata_link
//     return {props: { data }}

//   } catch(err) {
//     console.log(err)
//   }

//   // const metadata_link = await image_engine_main();
//   // const data = numeral;

//   // return {props: { data }}
// }

export default Minting;