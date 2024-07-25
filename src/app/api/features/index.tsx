import type { NextApiRequest, NextApiResponse } from "next";
import type { FeatureEnvironment } from "@/app/static-types";
import featureList from "@/lib/fixtures/features.json";

const handler = (
  _req: NextApiRequest,
  res: NextApiResponse<FeatureEnvironment[]>,
) => res.json(featureList);

export default handler;
