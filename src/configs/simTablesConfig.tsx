import { TypeColumns } from "@inovua/reactdatagrid-community/types/TypeColumn";
import "../styles/containers.css";

const mimicTableColumns: TypeColumns = [
    {
        name: "name",
        resizable: false,
        header: "Название",
        headerAlign: "center",
        flex: 1
    }
];

const variableTableColumns: TypeColumns = [
    {
        name: "name",
        resizable: true,
        header: "Имя",
        headerAlign: "center",
        flex: 1,
    },
    {
        name: "value",
        resizable: true,
        header: "Значение",
        headerAlign: "center",
        flex: 1,
    },
]

const simVariableTableColumns: TypeColumns = [
    {
        name: "name",
        resizable: true,
        header: "Имя",
        headerAlign: "center",
        flex: 1,
    },
    {
        name: "value",
        resizable: true,
        header: "Значение",
        headerAlign: "center",
        flex: 1,
    },
    {
        name: "color",
        resizable: true,
        header: "Значение",
        headerAlign: "center",
        flex: 1,
        textAlign: "center",
        render: ({value}) => <div className='color-cell' style={{backgroundColor: value}}/>,
    },
]

export { mimicTableColumns, variableTableColumns, simVariableTableColumns };