const TabButton = ({ tab, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center p-4 rounded-none border-b-2 border-t-0 border-l-0 border-r-0 hover:text-gray-600 hover:border-gray-300 ${
        isActive ? "text-blue-600 border-blue-600" : "text-gray-500 border-transparent"
      }`}
    >
      {tab.icon}
      {tab.label}
    </button>
  );
  
  export default TabButton;
  