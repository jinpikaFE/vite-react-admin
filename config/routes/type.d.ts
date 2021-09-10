import type { ComponentType, FC, LazyExoticComponent } from "react";

export type RouteType = {
  path: string;
  component: LazyExoticComponent<FC | ComponentType | any>;
  exact?: boolean;
  meta?: {
    [key: string]: any;
  },
  routes?: RouteType[];
}