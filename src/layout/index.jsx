// import { Content } from "antd/lib/layout/layout";
import { lazy, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HeaderWrapper } from "./components/layout-header/HeaderWrapper";
import AsideDefault from "./components/layout-side-nav/index";
import { PageDataProvider } from './core/PageData';
import { MenuComponent } from "../_metronic/assets/ts/components";
import { Content } from "./components/Content";

const MasterLayout = ({children}) => {
    
  const location = useLocation()
  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    },500)
  }, [])

  useEffect(() =>{
    setTimeout(() => {
      MenuComponent.reinitialization()
    },500)
  }, [location.key])

    return (
      <PageDataProvider>
        <div className="page d-flex flex-row flex-column-fluid">
          <AsideDefault />
          <div className="wrapper d-flex flex-column flex-row-fluid" id='kt_wrapper'>
            <HeaderWrapper />
            <div id='kt_content' className="content d-flex flex-column flex-column-fluid">
              <div className="post d-flex flex-column-fluid" id='kt_post'>
                <Content>{children}</Content>
              </div>
            </div>
          </div>
        </div>
      </PageDataProvider>        
    )
}

export {MasterLayout}