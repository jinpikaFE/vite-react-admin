import type { ComponentType, FC, LazyExoticComponent } from "react";

export type RouteType = {
  component?: LazyExoticComponent<FC | ComponentType | any>;
  path?: string;
  exact?: boolean;
  redirect?: string;
  meta?: {
    [key: string]: any;
  },
  routes?: RouteType[];
}