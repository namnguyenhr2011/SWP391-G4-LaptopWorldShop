import { useEffect, useState } from "react";
import { Typography } from "antd";
import { StarOutlined } from "@ant-design/icons";
import ProductCard from "./ProductCard";
import { getTopSold } from "../Service/Client/ApiProduct";

const { Title } = Typography;

const TopSoldProducts = ({ isDarkMode }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getTopSold();
        setProducts(response.products);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm bán chạy:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div style={{ marginBottom: "40px" }}>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <StarOutlined
          style={{ fontSize: "24px", color: "#ff4d4f", marginRight: "10px" }}
        />
        <Title
          level={4}
          style={{ margin: 0, color: isDarkMode ? "#e6edf3" : "#1c1e21" }}
        >
          Top bán chạy
        </Title>
      </div>
      <ProductCard products={products} loading={loading} />
    </div>
  );
};

export default TopSoldProducts;
