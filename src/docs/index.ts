import { basicInfo } from "./basic";
import { servers } from "./servers";
import { components } from "./components";
import { tags } from "./tags";
import { endpoints } from "./endpoints";

export const docs = {
  ...basicInfo,
  ...servers,
  ...components,
  ...tags,
  ...endpoints,
};
