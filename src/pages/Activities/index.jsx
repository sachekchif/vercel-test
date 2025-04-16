import React, { useState, useEffect } from "react";
import {
  DatePicker,
  Input,
  Button,
  Dropdown,
  Menu,
  Card,
  Avatar,
  Tag,
  List,
  Spin,
  Alert,
  Pagination,
  Empty,
  Drawer,
  Descriptions,
  Skeleton,
  Space,
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  ClockCircleOutlined,
  CloseOutlined,
  EyeOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useGetActivityLogsQuery } from "../../services/apiSlice";
import { capitalizeText } from "../../utils/constants";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const { RangePicker } = DatePicker;

const Activities = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [filters, setFilters] = useState({
    search: "",
    dateRange: null,
    action: null,
  });
  const [allActivities, setAllActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);

  const {
    data: activitiesResponse,
    isLoading,
    isError,
    error,
    isFetching,
  } = useGetActivityLogsQuery({
    page: pagination.current,
    limit: pagination.pageSize,
  });

  // Store all loaded activities
  useEffect(() => {
    if (activitiesResponse?.data) {
      setAllActivities(prev => {
        const existingIds = new Set(prev.map(a => a.id));
        const newActivities = activitiesResponse.data.filter(
          a => !existingIds.has(a.id)
        );
        return [...prev, ...newActivities];
      });
    }
  }, [activitiesResponse]);

  // Apply filters whenever filters or allActivities change
  useEffect(() => {
    const filtered = allActivities.filter(activity => {
      if (
        filters.search &&
        !activity.description.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }
      
      if (filters.action && activity.action !== filters.action) {
        return false;
      }
      
      if (filters.dateRange) {
        const activityDate = new Date(activity.createdAt);
        const startDate = filters.dateRange[0];
        const endDate = filters.dateRange[1];
        
        if (startDate && activityDate < startDate) return false;
        if (endDate && activityDate > endDate) return false;
      }
      
      return true;
    });
    setFilteredActivities(filtered);
  }, [allActivities, filters]);

  // Paginate the filtered results
  const paginatedActivities = filteredActivities.slice(
    (pagination.current - 1) * pagination.pageSize,
    pagination.current * pagination.pageSize
  );

  const totalFiltered = filteredActivities.length;
  const hasMoreData = activitiesResponse?.data?.length === pagination.pageSize;
  const showNextPageButton = hasMoreData || 
    (pagination.current * pagination.pageSize < totalFiltered);

  const showDrawer = (activity) => {
    setSelectedActivity(activity);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedActivity(null);
  };

  const handlePaginationChange = (page, pageSize) => {
    setPagination({ current: page, pageSize });
  };

  const handleNextPage = () => {
    if (pagination.current * pagination.pageSize >= allActivities.length) {
      setPagination(prev => ({
        ...prev,
        current: prev.current + 1
      }));
    } else {
      setPagination(prev => ({
        ...prev,
        current: prev.current + 1
      }));
    }
  };

  const handlePrevPage = () => {
    setPagination(prev => ({
      ...prev,
      current: Math.max(1, prev.current - 1)
    }));
  };

  const handleSearchChange = (e) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleDateRangeChange = (dates) => {
    setFilters(prev => ({ ...prev, dateRange: dates }));
  };

  const handleActionFilter = (action) => {
    setFilters(prev => ({ ...prev, action: action === "all" ? null : action }));
  };

  const getActionColor = (action) => {
    switch (action) {
      case "block":
        return "red";
      case "restore":
        return "green";
      case "create":
        return "cyan";
      case "update":
        return "blue";
      default:
        return "geekblue";
    }
  };

  const getRoleStyle = (role) => {
    if (!role) return "bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full border border-gray-700";
    
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full border border-green-700";
      case "staff":
        return "bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full border border-gray-700";
      case "super_admin":
        return "bg-purple-100 text-purple-700 text-xs font-medium px-2 py-0.5 rounded-full border border-purple-700";
      default:
        return "bg-blue-100 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-full border border-blue-500";
    }
  };

  return (
    <div className="flex dark:text-black">
      <Navbar />
      <Sidebar />
      <div className="px-8 py-8 sm:ml-64 bg-gray-50 w-full h-full">
        <main className="rounded-lg mt-14 mb-12">
          {/* Header Section */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">ACTIVITIES</h1>
            <p className="text-gray-600">
              Monitor all system activities and user actions
            </p>
          </div>

          {/* Main Content */}
          <div className="shadow-sm">
            <div className="mt-4">
              {/* Filter Section */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <RangePicker 
                  size="large" 
                  className="w-full md:w-auto" 
                  onChange={handleDateRangeChange}
                  value={filters.dateRange}
                />

                <Input
                  placeholder="Search activities..."
                  prefix={<SearchOutlined />}
                  className="w-full md:w-64"
                  size="large"
                  value={filters.search}
                  onChange={handleSearchChange}
                  allowClear
                />

                <Dropdown
                  overlay={
                    <Menu onClick={({ key }) => handleActionFilter(key)}>
                      <Menu.Item key="all">All Actions</Menu.Item>
                      <Menu.Item key="create">Create</Menu.Item>
                      <Menu.Item key="update">Update</Menu.Item>
                      <Menu.Item key="restore">Restore</Menu.Item>
                      <Menu.Item key="block">Block</Menu.Item>
                    </Menu>
                  }
                  trigger={["click"]}
                >
                  <Button size="large">
                    <FilterOutlined />
                    {filters.action ? capitalizeText(filters.action) : "Filter by Action"}
                  </Button>
                </Dropdown>
              </div>

              {/* Error State - Only shows in the table area */}
              {isError && (
                <Card className="mb-4">
                  <Alert
                    message="Error loading activities"
                    description={error?.message || "Failed to load activity logs"}
                    type="error"
                    showIcon
                  />
                </Card>
              )}

              {/* Loading State */}
              {isLoading && !isError && (
                <Card>
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="mb-4">
                      <Skeleton
                        active
                        avatar
                        paragraph={{ rows: 2 }}
                        title={false}
                      />
                    </div>
                  ))}
                </Card>
              )}

              {/* Empty State */}
              {!isLoading && !isError && paginatedActivities.length === 0 && (
                <div className="flex flex-col items-center">
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                      <span className="text-gray-500">
                        {allActivities.length === 0 
                          ? "No activities found" 
                          : "No activities match your filters"}
                      </span>
                    }
                    className="py-12"
                  />
                  {pagination.current > 1 && (
                    <Button
                      icon={<LeftOutlined />}
                      onClick={handlePrevPage}
                      className="mb-6"
                    >
                      Go Back to Previous Page
                    </Button>
                  )}
                </div>
              )}

              {/* Activities List */}
              {!isLoading && !isError && paginatedActivities.length > 0 && (
                <>
                  <List
                    itemLayout="horizontal"
                    dataSource={paginatedActivities}
                    renderItem={(activity) => (
                      <List.Item
                        actions={[
                          <Button
                            key="view-details"
                            type="primary"
                            onClick={() => showDrawer(activity)}
                            icon={<EyeOutlined />}
                            className="flex items-center bg-purple-600 hover:!bg-purple-700 border-purple-600"
                          >
                            View Details
                          </Button>,
                        ]}
                      >
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              src={`https://ui-avatars.com/api/?name=${
                                activity.userName || "U"
                              }&background=641aa5&color=ffffff`}
                              size="large"
                            />
                          }
                          title={
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">
                                {activity.userName || "Unknown User"}
                              </span>
                              {activity.role && (
                                <span className={getRoleStyle(activity.role)}>
                                  {capitalizeText(
                                    activity.role?.replace(/_/g, " ") ||
                                      "Unknown Role"
                                  )}
                                </span>
                              )}
                              <Tag
                                color={getActionColor(activity.action)}
                                className="ml-2"
                              >
                                {activity.action?.toUpperCase() || "ACTION"}
                              </Tag>
                            </div>
                          }
                          description={
                            <div>
                              <p>{activity.description}</p>
                              <div className="flex items-center mt-1 text-gray-500">
                                <ClockCircleOutlined className="mr-1" />
                                <span>
                                  {new Date(
                                    activity.createdAt
                                  ).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />

                  {/* Pagination Controls */}
                  <div className="flex justify-between items-center mt-6">
                    <Space>
                      {pagination.current > 1 && (
                        <Button
                          icon={<LeftOutlined />}
                          onClick={handlePrevPage}
                          disabled={isFetching}
                        >
                          Previous Page
                        </Button>
                      )}
                      {showNextPageButton && (
                        <Button
                          icon={<RightOutlined />}
                          onClick={handleNextPage}
                          loading={isFetching}
                          type="primary"
                        >
                          Next Page
                        </Button>
                      )}
                    </Space>

                    <Pagination
                      current={pagination.current}
                      pageSize={pagination.pageSize}
                      total={totalFiltered}
                      onChange={handlePaginationChange}
                      onShowSizeChange={(current, size) => {
                        setPagination({
                          current: 1,
                          pageSize: size
                        });
                      }}
                      showSizeChanger
                      showQuickJumper
                      disabled={isFetching}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </main>

        {/* Activity Details Drawer */}
        <Drawer
          title="Activity Details"
          width={600}
          onClose={closeDrawer}
          visible={drawerVisible}
          bodyStyle={{ paddingBottom: 80 }}
          extra={
            <Button
              icon={<CloseOutlined />}
              onClick={closeDrawer}
              type="text"
            />
          }
        >
          {selectedActivity && (
            <Descriptions bordered column={1}>
              <Descriptions.Item label="User">
                <div className="flex items-center">
                  <Avatar
                    src={`https://ui-avatars.com/api/?name=${
                      selectedActivity.userName || "U"
                    }&background=641aa5&color=ffffff`}
                    size="large"
                    className="mr-2"
                  />
                  <div>
                    <div className="font-semibold">
                      {selectedActivity.userName || "Unknown User"}
                    </div>
                    {selectedActivity.role && (
                      <span className={getRoleStyle(selectedActivity.role)}>
                        {capitalizeText(
                          selectedActivity.role?.replace(/_/g, " ") ||
                            "Unknown Role"
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Action">
                <Tag color={getActionColor(selectedActivity.action)}>
                  {selectedActivity.action?.toUpperCase() || "ACTION"}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Description">
                {selectedActivity.description}
              </Descriptions.Item>
              <Descriptions.Item label="Date & Time">
                <div className="flex items-center">
                  <ClockCircleOutlined className="mr-2" />
                  {new Date(selectedActivity.createdAt).toLocaleString()}
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Activity ID">
                {selectedActivity.id}
              </Descriptions.Item>
              <Descriptions.Item label="User ID">
                {selectedActivity.userId}
              </Descriptions.Item>
            </Descriptions>
          )}
        </Drawer>
      </div>
    </div>
  );
};

export default Activities;