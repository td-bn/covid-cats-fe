// Do logic for image engine here, in an API call

import { NextApiRequest, NextApiResponse } from "next";
const { image_engine_main } = require('../../image-engine/index')
const { image_engine_non_moralis } = require("../../image-engine/image_engine_non_moralis")

export default async function (req: NextApiRequest, res: NextApiResponse) {
  
    const { random_number_array } = req.body as { random_number_array: number[] };

    try {
      // const metadata_link = await image_engine_main()
      const metadata_link = await image_engine_non_moralis(random_number_array)
      res.status(200).send( metadata_link )
    } catch (err) {
      res.status(500).json({ error: 'failed to load data' })
    }

  }