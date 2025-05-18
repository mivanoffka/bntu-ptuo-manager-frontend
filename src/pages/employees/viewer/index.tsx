import { useEmployeeEditor } from "@/contexts/employees/editor";
import { IEmployeeVersion } from "@/model";
import { Employee } from "@/pages/employees/viewer/employee";
import { CreateIconButton } from "@/pages/employees/viewer/toolbar/buttons";
import { EmployeeFooterToolbar } from "@/pages/employees/viewer/toolbar/footer";
import { EmployeeHeaderToolbar } from "@/pages/employees/viewer/toolbar/header";
import { Flex, Form } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";

export function EmployeesViewer() {
    const { displayedEmployeeVersion } = useEmployeeEditor();
    const [form] = Form.useForm();

    useEffect(() => {
        const employee = {
            ...displayedEmployeeVersion,
            birthdate: dayjs(displayedEmployeeVersion?.birthdate) || null,
            educationalInstitutions:
                displayedEmployeeVersion?.educationalInstitutions?.map(
                    (ei) => ({
                        ...ei,
                        graduatedAt: dayjs(ei?.graduatedAt) || null,
                    })
                ),
            rewards: displayedEmployeeVersion?.rewards?.map((r) => ({
                ...r,
                grantedAt: dayjs(r?.grantedAt) || null,
            })),
            relatives: displayedEmployeeVersion?.relatives?.map((r) => ({
                ...r,
                birthdate: dayjs(r?.birthdate) || null,
            })),
            bntuPositions: displayedEmployeeVersion?.bntuPositions?.map(
                (p) => ({
                    ...p,
                    hiredAt: dayjs(p?.hiredAt) || null,
                    dischargedAt: dayjs(p?.dischargedAt) || null,
                })
            ),
            joinedAt: dayjs(displayedEmployeeVersion?.joinedAt) || null,
            recordedAt: dayjs(displayedEmployeeVersion?.recordedAt) || null,
            archivedAt: dayjs(displayedEmployeeVersion?.archivedAt) || null,
            retiredAt: dayjs(displayedEmployeeVersion?.retiredAt) || null,
        };

        form.setFieldsValue(employee);
    }, [displayedEmployeeVersion]);

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
        <Form form={form}>
            <Flex
                justify="space-between"
                align="center"
                vertical
                style={{ width: "100%", height: "100%" }}
            >
                <EmployeeHeaderToolbar form={form}></EmployeeHeaderToolbar>
                {displayedEmployeeVersion && <Employee></Employee>}
                <EmployeeFooterToolbar></EmployeeFooterToolbar>
            </Flex>
        </Form>
    );

    return (
        <Flex
            vertical
            align="center"
            justify="start"
            style={{ width: "100%", height: "100%" }}
        >
            {displayedEmployeeVersion ? content : emptyContent}
        </Flex>
    );
}
