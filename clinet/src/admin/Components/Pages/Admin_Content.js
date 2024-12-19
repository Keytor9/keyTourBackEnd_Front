import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import BlogComponent from "./BlogComponent";
import AboutUsComponent from "./AboutUsComponent";
import FAQs from "./Admin_FAQs";
import PrivacyComponent from "./Admin_Privacy";

function Admin_Content() {
  return (
    <>
      <div className="main">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="dev-table">
          <Navbar />
          <div className="content-card">
            <h1>Admin Content</h1>
            {/* Tabs for Blogs and About Us */}
            <Tabs>
              <TabList>
                <Tab>Blogs</Tab>
                <Tab>About Us</Tab>
                <Tab>FAQs</Tab>
                <Tab>Privacy Policy</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <BlogComponent />
                </TabPanel>
                <TabPanel>
                  <AboutUsComponent />
                </TabPanel>
                <TabPanel>
                  <FAQs />
                </TabPanel>
                <TabPanel>
                  <PrivacyComponent />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin_Content;
