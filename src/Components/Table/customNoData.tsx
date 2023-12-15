import { TableRow, TableCell } from "@mui/material"
import { Icon } from '../Img'

import ScaleNotFoundIcon from '../../Assets/icon_scale_notFound.svg'


interface ICustomNoDataTable {
  lenghtCell: number
}

export const CustomNoDataTable = ({ lenghtCell }: ICustomNoDataTable) => {
  return (
    <TableRow sx={{ padding: 0 }}>
      <TableCell align="center" colSpan={lenghtCell} sx={{ padding: 0 }}>
        <Icon src={String(ScaleNotFoundIcon)} style={{ width: '120px', margin: 0, padding: 0 }} />
        <p>Sem dados para exibir.</p>
      </TableCell>
    </TableRow>
  )
} 
