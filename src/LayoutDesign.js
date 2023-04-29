import { Layout, Menu, theme } from "antd";
import { useEffect, useState } from "react";
import AddBook from "./AddBook";
import BookCard from "./BookCard";
import { BellOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { notification } from "antd";
import axios from "axios";

const { Header, Content, Footer } = Layout;

export function LayoutDesign() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [currentPage, setCurrentPage] = useState(1);

  const [notificationCount, setNotificationCount] = useState(0);
  const [notificationData, setNotificationData] = useState([]);

  const handleNavigationClick = (event) => {
    setCurrentPage(event.key);
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_GATEWAY_ENDPOINT}/gateway/notifications`
      )
      .then((response) => {
        setNotificationData(
          response.data.sort(function (a, b) {
            return new Date(b.createdTime) - new Date(a.createdTime);
          })
        );
        setNotificationCount(response.data?.length);
      });
  }, []);

  const renderPageByKey = (key) => {
    switch (key) {
      case "1":
        return <BookCard />;
      case "2":
        return <AddBook />;
      default:
        return <BookCard />;
    }
  };
  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    notificationData.slice(0,4).map((notification) => {
      api.open({
        message: "Library Notification",
        description: notification.message,
        duration: 0,
        key: notification.id,
      });
      setNotificationCount(0);
    });
  };

  return (
    <>
      {contextHolder}
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={[
              { key: 1, label: "Books", onClick: handleNavigationClick },
              { key: 2, label: "Add Book", onClick: handleNavigationClick },
              {
                key: 3,
                icon: (
                  <Badge count={notificationCount} size="small">
                    <BellOutlined style={{ fontSize: "20px" }} />
                  </Badge>
                ),
                onClick: openNotification,
                style: { position: "absolute", right: 20 },
              },
            ]}
          />
        </Header>
        <Content
          style={{
            padding: "0 50px",
          }}
        >
          <div
            className="site-layout-content"
            style={{
              background: colorBgContainer,
              minHeight: `80vh`,
            }}
          >
            {renderPageByKey(currentPage)}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Scalable Library ©2023
        </Footer>
      </Layout>
    </>
  );
}
