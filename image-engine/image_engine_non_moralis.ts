// Test image-engine function without connecting to Moralis server and listening to Mint event

const { createImage_delta } = require('./scripts/image_engine_delta')
const { createImage_regular } = require('./scripts/image_engine_regular')
const { get_random_traits_regular } = require('./scripts/get_random_traits_regular')
const { get_random_traits_delta } = require('./scripts/get_random_traits_delta')
const { save_metadata_to_ipfs } = require("./scripts/save_metadata_to_ipfs")


export const image_engine_non_moralis = async (random_number_array:number[]) => {

        let variant_or_delta: number, random_numbers: any[6];
        [variant_or_delta, ...random_numbers] = random_number_array

        if (variant_or_delta <= 20) {
            // Create image IPFS link for Delta variant
            const traits = get_random_traits_delta(random_numbers)
            const image_ipfs_link = await createImage_delta(traits[0], traits[1], traits[2], traits[3], traits[4], traits[5])
            const metadata_link = await get_metadata_ipfs(1, traits, image_ipfs_link)
            console.log(metadata_link)

            const ipfs_data = [JSON.parse(JSON.stringify(image_ipfs_link)), JSON.parse(JSON.stringify(metadata_link)), 1]
            return(ipfs_data)
        } else {
            // Create image IPFS link for Regular variant
            const traits = get_random_traits_regular(random_numbers)
            const image_ipfs_link = await createImage_regular(traits[0], traits[1], traits[2], traits[3], traits[4], traits[5])
            const metadata_link = await get_metadata_ipfs(1, traits, image_ipfs_link)
            console.log(metadata_link)
            // res(JSON.parse(JSON.stringify(metadata_link)))

            const ipfs_data = [JSON.parse(JSON.stringify(image_ipfs_link)), JSON.parse(JSON.stringify(metadata_link)), 1]
            return(ipfs_data)
        } 
}

async function get_metadata_ipfs(id:number, object:any, image_link:string) {

        // Generate metadata
        const metaData = 
            {
                "name": `Covid Cat #${id}`,
                "attributes": [
                    {
                        "trait_type": "Face",
                        "value": object[0]
                    },
                    {
                        "trait_type": "Ear",
                        "value": object[1]
                    },
                    {
                        "trait_type": "Mouth",
                        "value": object[2]
                    },
                    {
                        "trait_type": "Eyes",
                        "value": object[3]
                    },
                    {
                        "trait_type": "Accessory",
                        "value": object[4]
                    },
                    {
                        "trait_type": "Mask",
                        "value": object[5]
                    },
                ],
                "description": "",
                "external_url": "https://covidcats.art/",
                "image": image_link
            }

        // // Save metadata to IPFS
        const metadata_ipfs_link = await save_metadata_to_ipfs(metaData)
        const tokenURI = "ipfs://" + metadata_ipfs_link.slice(-46)
        return tokenURI
}

// main().catch((error) => {
//     console.error(error);
//     process.exitCode = 1;
//   });

// ABI to paste into Moralis Sync event
// {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_minter","type":"address"},{"indexed":true,"internalType":"uint256","name":"_tokenID","type":"uint256"},{"indexed":false,"internalType":"uint256[7]","name":"random_numbers","type":"uint256[7]"}],"name":"Mint","type":"event"}
