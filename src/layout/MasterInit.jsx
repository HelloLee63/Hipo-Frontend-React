import { useEffect, useRef } from "react";
import { DrawerComponent, MenuComponent, ScrollComponent, ScrollTopComponent, StickyComponent, SwapperComponent, ToggleComponent } from "../_metronic/assets/ts/components";
import { useLayout } from "./core";


export function MasterInit() {
  const { config } = useLayout()
  const isFirstRun = useRef(true)
  const pluginsInitialization = () => {
    isFirstRun.current = false
    setTimeout(() => {
      ToggleComponent.bootstrap()
      ScrollTopComponent.bootstrap()
      DrawerComponent.bootstrap()
      StickyComponent.bootstrap()
      MenuComponent.bootstrap()
      ScrollComponent.bootstrap()
      SwapperComponent.bootstrap()
    }, 500)
  }

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      pluginsInitialization()
    }
  }, [config])

  return <></>
}