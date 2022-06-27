import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useEffect, useState } from "react";

import { formatNumbers } from "../helpers";

export function TableDespesas(props: any) {
  const [despesas, setDespesas] = useState<any[]>([]);

  useEffect(() => {
    setDespesas(props.despesas);
  }, [props.despesas]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Despesas</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Dia</TableCell>
            <TableCell>Valor (R$)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {despesas.map((d, index) => {
            return (
              <TableRow key={index}>
                <TableCell key={d.id}>{d.descricao}</TableCell>
                <TableCell key={d.id}>{d.categoria}</TableCell>
                <TableCell key={d.id}>{d.dia}</TableCell>
                <TableCell key={d.id}>{formatNumbers(d.valor)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
