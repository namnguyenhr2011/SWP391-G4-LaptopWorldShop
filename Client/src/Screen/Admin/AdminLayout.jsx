import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  ShopOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const location = useLocation();

  const menuItems = [
    {
      key: "logo",
      label: (
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="../L.png"
            alt="Logo"
            style={{ width: "30px", height: "30px", objectFit: "contain" }}
          />
        </Link>
      ),
    },
    {
      key: "/admin",
      icon: <DashboardOutlined />,
      label: <Link to="/admin">Dashboard</Link>,
    },
    {
      key: "/admin/manage-user",
      icon: <UserOutlined />,
      label: <Link to="/admin/manage-user">Manage Users</Link>,
    },
    {
      key: "/admin/manage-sale",
      icon: <ShopOutlined />,
      label: <Link to="/admin/manage-sale">Manage Sales</Link>,
    },
    {
      key: "/admin/manage-feedback",
      icon: <MessageOutlined />,
      label: <Link to="/admin/manage-feedback">Manage Feedback</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems} // Sử dụng items thay vì children
        />
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0, textAlign: "center" }}>
          Admin Panel
        </Header>
        <Content style={{ margin: "16px" }}>
          <Outlet /> {/* Hiển thị nội dung của từng trang con */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
