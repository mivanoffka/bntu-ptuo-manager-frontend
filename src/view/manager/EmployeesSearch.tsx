import { SearchOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Space } from "antd";
import "./list-item.css";
import { Palette } from "@/view/constants";

import { Toolbar } from "@/view/manager/toolbar/Toolbar";
import { EmployeesList } from "@/view/manager/EmployeesList";
import { useEmployees } from "@/controller/employee";
import { InputField } from "@/view/primitives";

export function EmployeesSearch() {
    const { fetchAllEmployees, employeesListFilter, setEmployeesListFilter } =
        useEmployees();

    const { search: searchQuery } = employeesListFilter;

    function setSearchQuery(query: string | null) {
        setEmployeesListFilter({ ...employeesListFilter, search: query });
    }

    return (
        <Flex align="center" vertical style={{ width: "100%", height: "100%" }}>
            <Toolbar>
                <Space.Compact style={{ width: "100%" }}>
                    <InputField
                        editModeEnabled
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Поиск"
                    ></InputField>
                    <Button
                        onClick={fetchAllEmployees}
                        style={{ color: Palette.BLUE }}
                    >
                        <SearchOutlined />
                    </Button>
                </Space.Compact>
            </Toolbar>
            <Flex
                align="center"
                vertical
                style={{ width: "100%", height: "80%" }}
            >
                <Flex
                    align="center"
                    vertical
                    style={{ width: "90%", height: "50%" }}
                >
                    <EmployeesList></EmployeesList>
                </Flex>
                <Flex
                    align="center"
                    vertical
                    style={{ width: "100%", height: "50%" }}
                >
                    ...
                </Flex>
            </Flex>

            <Toolbar></Toolbar>
        </Flex>
    );
}
