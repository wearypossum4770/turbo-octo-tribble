import { createId } from "@paralleldrive/cuid2";

export type FeatureFlag = {
  name: string;
};
export type FeatureConfig = {
  id: number;
  href: string;
  label: string;
};

export type FeatureEnvironment = {
  id: number;
  environment: string;
  label: string;
  features: Array<FeatureConfig>;
};

export type FeatureParams = {
  environment: string;
  feature: string;
};

export type TagWidget = {
  label: string;
  id: number;
  uuid: string;
};

export type FeatureTag = TagWidget & {};
