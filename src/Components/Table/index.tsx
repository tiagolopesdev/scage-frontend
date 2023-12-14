import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper, SxProps, Theme } from "@mui/material"


interface ITableCellProps {
  name: string
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify'
}

export interface ITableItensRowProps {
  name: string
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify',
  actions?: JSX.Element,
  style?: SxProps<Theme> | undefined
}

export interface ITableRowProps {
  rows: ITableItensRowProps[]
}

interface ITableProps {
  tableCell: ITableCellProps[]
  tableRows: ITableRowProps[]
}

export const TableComponent = (props: ITableProps) => {

  return <TableContainer component={Paper} sx={{ maxHeight: 300 }} >
    <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          {
            props.tableCell.map((item: ITableCellProps) => {
              return <>
                <TableCell sx={{ fontWeight: 600, fontSize: 'larger' }} align={item.align}>{item.name}</TableCell>
              </>
            })
          }
        </TableRow>
      </TableHead>
      <TableBody>
        {
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
/*

  const propsCells = [
    {name: 'Data', align: 'center'}
    {name: 'Horario', align: 'left'}
    {name: 'Nome do evento', align: 'left'}
    {name: 'Ações', align: 'Right'}
  ]
  
  const propsRows = [
    [
      {name: '00/00/0000', align: 'center'}
      {name: '00:00', align: 'left'}
      {name: 'Event name example', align: 'left'}    
      {name: '', align: 'left', actions: {}}    
    ]
  ]

*/


/*
const listDays = () => {
    return scaleContext.days?.map((item, index) => {
      return (
        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
          <TableCell sx={{ fontWeight: 600 }} component="th" scope="row">
            {item.name}
            {
              IsNewDay(item) ?
                <Chip
                  style={{ marginLeft: '20px' }}
                  size='small'
                  color="primary"
                  variant="outlined"
                  label='Rascunho'
                /> :
                ''
            }
          </TableCell>
          <TableCell sx={{ fontWeight: 600 }} align="center">{dayjs(item.dateTime).format('DD/MM/YYYY')}</TableCell>
          <TableCell sx={{ fontWeight: 600 }} align="center">{dayjs(item.dateTime).format('hh:mm:ss')}</TableCell>
          <TableCell align="right" style={{ padding: '0rem 0.5rem 0rem 0.5rem' }}>
            <IconButton onClick={() => {
              EditDay(item)
            }}>
              <Icon src={String(IconEdit)} />
            </IconButton>
            <IconButton onClick={() => { DeleteDay(item) }}>
              <Icon src={String(IconDelete)} />
            </IconButton>
          </TableCell>
        </TableRow>
      )
    })
  }
*/
