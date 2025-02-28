import TabButton from "./TabButton";

const TabList = ({ tabs, activeTab, onTabClick }) => (
  <div className="mb-4 border-b-2 border-gray-300">
    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
      {tabs.map((tab) => (
        <li key={tab.id} className="me-2">
          <TabButton
            tab={tab}
            isActive={activeTab === tab.id}
            onClick={() => onTabClick(tab.id)}
          />
        </li>
      ))}
    </ul>
  </div>
);

export default TabList;
