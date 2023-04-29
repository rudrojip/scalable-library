import { Layout, Menu, theme } from "antd";
import { useState } from "react";
import AddBook from "./AddBook";
import BookCard from "./BookCard";
const { Header, Content, Footer } = Layout;

export function LayoutDesign() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [currentPage, setCurrentPage] = useState(1);

  const handleNavigationClick = (event) => {
    setCurrentPage(event.key);
  };

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

  return (
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
  );
}
