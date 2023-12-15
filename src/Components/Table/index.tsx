import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper, SxProps, Theme } from "@mui/material"
import { ITableCellProps, ITableItensRowProps, ITableRowProps } from "../../@types/TableProps"
import { CustomNoDataTable } from "./customNoData"

interface ITableProps {
  tableCell: ITableCellProps[]
  tableRows: ITableRowProps[],
  style?: SxProps<Theme> | undefined
}

export const TableComponent = (props: ITableProps) => {

  return <TableContainer component={Paper} sx={{ maxHeight: 300, ...props.style }} >
    <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table" >
      <TableHead>
        <TableRow>
          {
            props.tableCell.map((item: ITableCellProps) => {
              return <TableCell sx={{ fontWeight: 600, fontSize: 'larger' }} align={item.align}>{item.name}</TableCell>
            })
          }
        </TableRow>
      </TableHead>
      <TableBody>
        {
          props.tableRows.length === 0 ?
            <CustomNoDataTable lenghtCell={props.tableCell.length} /> :
            props.tableRows.map((item: ITableRowProps) => {
              return <TableRow >
                {
                  item.rows.map((itenInsideRow: ITableItensRowProps, index: number) => {
                    return <TableCell align={itenInsideRow.align} sx={
                      { margin: 0, padding: '8px', fontSize: '1rem', ...itenInsideRow.style }
                    }>
                      {
                        index === (item.rows.length - 1) ?
                          itenInsideRow.actions :
                          itenInsideRow.name
                      }
                    </TableCell>
                  })
                }
              </TableRow>
            })
        }
      </TableBody>
    </Table>
  </TableContainer>
}
