// Do logic for image engine here, in an API call

import { NextApiRequest, NextApiResponse } from "next";
const { image_engine_main } = require('../../image-engine/index')

export default async function (req: NextApiRequest, res: NextApiResponse) {
  
    try {
      const metadata_link = await image_engine_main()
      res.status(200).send( metadata_link )
    } catch (err) {
      res.status(500).json({ error: 'failed to load data' })
    }

  }