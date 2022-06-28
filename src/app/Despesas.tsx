/* eslint-disable react-hooks/exhaustive-deps */
import { getDespesasMes } from "./backend";
import { Box, Container } from "@material-ui/core";
import { formatNumbers } from "../helpers";
import { useEffect, useState } from "react";
import { TableDespesas } from "./TableDespesas";
import { useParams, useHistory } from "react-router-dom";
import { SelectedAnoMes } from "./SelectAnoMes";

export function Despesas() {
  const { anoMes } = useParams<{ anoMes: string }>();
  let campos = anoMes.split("-");

  let history = useHistory();

  // const [selectedAno, setSelectedAno] = useState(campos[0]);
  // const [selectedMes, setSelectedMes] = useState(campos[1].split("0")[1]);
  const [despesaTotal, setDespesaTotal] = useState(0);
  const [despesasMes, setDespesasMes] = useState<any[]>([]);

  useEffect(() => {
    getDespesasMes(anoMes).then(setDespesasMes);
  }, []);

  const toggleMes = (e: any) => {
    setDespesasMes([]);
    setDespesaTotal(0);

    e.target.value > 9
      ? history.push(`${campos[0] + "-" + e.target.value}`)
      : history.push(`${campos[0] + "-0" + e.target.value}`);
    handleDespesasMes(campos[0], e.target.value);
  };

  const handleDespesasMes = async (ano: string, mes: any) => {
    mes > 9 ? (mes = `${mes}`) : (mes = `0${mes}`);

    const mesano = `${ano}-${mes}`;
    const despesas = await getDespesasMes(mesano);
    setDespesasMes(despesas);
    handleDespesasTotal();
  };

  const handleDespesasTotal = () => {
    let soma = 0;
    despesasMes.filter(({ valor }) => {
      soma += valor;
    });

    setDespesaTotal(soma);
  };

  useEffect(() => {
    handleDespesasTotal();
  }, [handleDespesasMes]);

  return (
    <Container>
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Box>
            <SelectedAnoMes anoMes={anoMes} toggleMes={toggleMes} />
          </Box>
          <Box alignSelf="center">
            <span>Despesas total: {formatNumbers(despesaTotal)}</span>
          </Box>
        </Box>
        <Box>
          <TableDespesas despesas={despesasMes} />
        </Box>
      </Box>
    </Container>
  );
}
