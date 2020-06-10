import React, { memo } from "react";
import "./MenuTab.css";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

function MenuTab({ catList }) {
  return (
    <div className="menu_tab_main_div">
      <Tabs
        className="categoryTabs"
        defaultIndex={0}
        forceRenderTabPanel={false}
        disabledTabClassName="category_tab--disabled"
        selectedTabClassName="category_tab--selected"
        selectedTabPanelClassName="category_panel--selected"
      >
        <TabList className="category_tab_list">
          {catList.map((subCat) => (
            <Tab key={subCat.id} className="category_tab">
              {subCat.heading}
            </Tab>
          ))}
        </TabList>

        {catList.map((subCat) => (
          <TabPanel key={subCat.id} className="category_panel">
            <div className="category_panel_data">
              {subCat.items.map((item) => (
                <div key={item.name} className="cat_menu_items">
                  <a href={item.link}>{item.name}</a>
                </div>
              ))}
            </div>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
}

export default memo(MenuTab);
