import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export function Loader() {
    return <Spin indicator={<LoadingOutlined spin />} size="large" />;
}
