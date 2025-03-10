import {
  Layout,
  Menu,
  Space,
  Avatar,
  Dropdown,
  message,
  Switch,
  Badge,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import {
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  MoonOutlined,
  SunOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import ButtonAntd from "../../Component/ButtonAntd";
import InputSearch from "../../Component/InputSearch";
import { doLogout, doDarkMode } from "../../Store/reducer/userReducer";

const DEFAULT_LOGO = "/L.png";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation("header");

  const { token, _id: userId } = useSelector((state) => state.user?.user || {});
  const { nameApp, logo } = useSelector((state) => state.admin?.app || {});
  const isDarkMode = useSelector((state) => state.user.darkMode);
  const cartItems = useSelector((state) => state.cart.items[userId] || []);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    document.title = nameApp || "My App";
    const iconLink = document.querySelector("link[rel='icon']");
    if (logo && iconLink) {
      iconLink.href = logo;
    }
  }, [logo, nameApp]);

  const handleLogin = () => navigate("/login");

  const handleLogout = () => {
    dispatch(doLogout());
    message.success(t("logout_success"));
    navigate("/login");
  };

  const toggleDarkMode = () => dispatch(doDarkMode(!isDarkMode));

  const handleUserProfile = () => navigate("/userProfile");

  const profileMenu = (
    <Menu
      style={{
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        backgroundColor: isDarkMode ? "#1e2a3c" : "#fff",
      }}
    >
      <Menu.Item
        key="profile"
        icon={<UserOutlined />}
        onClick={handleUserProfile}
      >
        {t("profile")}
      </Menu.Item>
      <Menu.Item key="darkmode">
        <Space>
          {isDarkMode ? <MoonOutlined /> : <SunOutlined />}
          {t("dark_mode")}
          <Switch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
            size="small"
          />
        </Space>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        {t("logout")}
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout.Header
      style={{
        position: "fixed",
        top: 0,
        zIndex: 1000,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: isDarkMode ? "#161b22" : "#001529",
        padding: "0 20px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        transition: "background-color 0.3s ease, padding 0.3s ease",
        height: 64,
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          onClick={() => navigate("/")}
          src={logo || DEFAULT_LOGO}
          width={50}
          alt={nameApp || "Logo"}
          style={{
            cursor: "pointer",
            borderRadius: "8px",
            transition: "transform 0.3s ease",
            verticalAlign: "middle",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          aria-label="Go to homepage"
        />
      </div>

      {/* Right Section */}
      <Space
        size="middle"
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
      >
        <InputSearch />

        <Badge count={cartCount} offset={[8, 0]} size="small" color="#ff4d4f">
          <ShoppingCartOutlined
            onClick={() => navigate("/cart")}
            style={{
              fontSize: "24px",
              cursor: "pointer",
              color: "#fff",
              transition: "color 0.3s ease",
              verticalAlign: "middle",
              lineHeight: "64px",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#40c4ff")}
            onMouseLeave={(e) => (e.target.style.color = "#fff")}
            aria-label={`Cart with ${cartCount} items`}
          />
        </Badge>

        <Dropdown
          overlay={profileMenu}
          trigger={["click"]}
          placement="bottomRight"
        >
          {token ? (
            <Avatar
              size="large"
              icon={<UserOutlined />}
              style={{
                cursor: "pointer",
                backgroundColor: isDarkMode ? "#30363d" : "#1890ff",
                transition: "background-color 0.3s ease",
                verticalAlign: "middle",
                lineHeight: "64px",
              }}
              aria-label="User profile menu"
            />
          ) : (
            <ButtonAntd
              onClick={handleLogin}
              type="primary"
              icon={<LoginOutlined />}
              content={t("login")}
              style={{
                borderRadius: "6px",
                transition: "all 0.3s ease",
                height: "36px",
                lineHeight: "36px",
              }}
            />
          )}
        </Dropdown>
      </Space>
    </Layout.Header>
  );
};

export default Header;
