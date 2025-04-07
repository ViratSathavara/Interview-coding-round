import React, { useState } from "react";

const tabsData = [
  { label: "Home", content: "Welcome to Home!" },
  { label: "About", content: "We are React developers." },
  { label: "Contact", content: "Email us at support@example.com" },
];

function        DynamicTabs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className="tab-header">
        {tabsData.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            style={{
              fontWeight: activeTab === i ? "bold" : "normal",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        <p>{tabsData[activeTab].content}</p>
      </div>
    </>
  );
}
export default DynamicTabs;