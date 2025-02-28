const TabContent = ({ tabs, activeTab }) => {
    const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;
    return <div className="">{activeContent}</div>;
  };
  
  export default TabContent;
  