import { useEmployeeEditor } from "@/contexts/employees/editor";
import { CreateIconButton } from "@/pages/employees/viewer/toolbar/buttons";
import { EmployeeFooterToolbar } from "@/pages/employees/viewer/toolbar/footer";
import { EmployeeHeaderToolbar } from "@/pages/employees/viewer/toolbar/header";
import { Employee } from "@/pages/employees/viewer/employee";
import { Flex, Form, Typography } from "antd";
import { useEffect } from "react";
import { USER_GROUPS, UserRole } from "@/model";
import { useAuth } from "@/contexts/auth";
import { SecondaryLabel } from "@/components/labels";
import { FontSize, Palette } from "@/constants";

export function EmployeesViewer() {
    const { displayedEmployeeVersion, setIsValid } = useEmployeeEditor();
    const [form] = Form.useForm();

    const { user } = useAuth();
    const userRole = user ? user.role : UserRole.UNAUTHORIZED;

    useEffect(() => {
        form.setFieldsValue(displayedEmployeeVersion);
    }, [displayedEmployeeVersion]);

    useEffect(() => {
        const validateForm = async () => {
            try {
                await form.validateFields();
                setIsValid(true);
            } catch (error) {
                setIsValid(false);
            }
        };

        const intervalId = setInterval(validateForm, 300);

        return () => clearInterval(intervalId);
    }, [form]);

    const emptyContent = (
        <Flex
            justify="center"
            align="center"
            gap="large"
            style={{ width: "100%", height: "25%" }}
        >
            {USER_GROUPS[UserRole.EDITOR].includes(userRole) ? (
                <CreateIconButton />
            ) : (
                <Typography.Text
                    style={{
                        textAlign: "center",
                        fontSize: FontSize.SMALL,
                        color: Palette.GRAY,
                    }}
                >
                    Выберите запись из списка
                </Typography.Text>
            )}
        </Flex>
    );

    const content = (
        <Form style={{ width: "100%", height: "100%" }} form={form}>
            <Flex
                justify="space-between"
                align="center"
                vertical
                style={{ width: "100%", height: "100%" }}
            >
                <EmployeeHeaderToolbar form={form} />
                {displayedEmployeeVersion && <Employee />}
                <EmployeeFooterToolbar />
            </Flex>
        </Form>
    );

    return (
        <Flex
            vertical
            align="center"
            justify="center"
            style={{ width: "100%", height: "100%" }}
        >
            {displayedEmployeeVersion ? content : emptyContent}
        </Flex>
    );
}
