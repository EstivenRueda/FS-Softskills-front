import { GridColDef } from "@mui/x-data-grid";
import { useMemo } from "react";
import { usePreguntasTableActions } from "./usePreguntasTableActions";



export function usePreguntasTableColumns() {

  const getTableActions = usePreguntasTableActions();


  return useMemo<GridColDef[]>(
    () => [
      {
        field: 'index',
        headerName: '#',
        sortable: false,
        type: 'number',
        filterable: false,
        width: 40,
        headerAlign: 'center',
        align: 'center',
        disableColumnMenu: true,
        renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
      },

    ],
    [getTableActions]
  );
}
