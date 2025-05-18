import { useEmployeeEditor } from "@/contexts/employees/editor";
import { CreateIconButton } from "@/pages/employees/viewer/toolbar/buttons";
import { EmployeeFooterToolbar } from "@/pages/employees/viewer/toolbar/footer";
import { EmployeeHeaderToolbar } from "@/pages/employees/viewer/toolbar/header";
import { Employee } from "@/pages/employees/viewer/employee";
import { Flex, Form } from "antd";
import { useEffect } from "react";
import { useEditMode } from "@/contexts/employees/edit-mode";

export function EmployeesViewer() {
    const { displayedEmployeeVersion, setIsValid, isValid } =
        useEmployeeEditor();
    const { editModeEnabled } = useEditMode();
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(displayedEmployeeVersion);
    }, [displayedEmployeeVersion]);

    useEffect(() => {
        const validateForm = async () => {
            try {
                await form.validateFields({ warnings: false });
                setIsValid(true);
            } catch (error) {
                setIsValid(false);
            }
        };

        const intervalId = setInterval(validateForm, 300);

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [form]);

    const emptyContent = (
        <Flex
            justify="center"
            align="center"
            gap="large"
            style={{ width: "100%", height: "25%" }}
        >
            <CreateIconButton />
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
