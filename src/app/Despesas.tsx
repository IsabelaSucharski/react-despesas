/* eslint-disable react-hooks/exhaustive-deps */
import { getDespesasMes } from "./backend";
import { Box, FormControl, InputLabel, NativeSelect } from "@material-ui/core";
import { meses, ano, formatNumbers } from "../helpers";
import { useEffect, useState } from "react";
import { TableDespesas } from "./TableDespesas";
import { useParams, useHistory } from "react-router-dom";

interface IAno {
  ano: string;
  id: number;
}

interface IMes {
  mes: string;
  id: number;
}

export function Despesas() {
  const { mes } = useParams<{ mes: string }>();
  let campos = mes.split("-");

  let history = useHistory();

  const [selectedAno, setSelectedAno] = useState(campos[0]);
  const [selectedMes, setSelectedMes] = useState(campos[1].split("0")[1]);
  const [despesaTotal, setDespesaTotal] = useState(0);
  const [listAno, setListAno] = useState<IAno[]>([]);
  const [listMes, setListMes] = useState<IMes[]>([]);
  const [despesasMes, setDespesasMes] = useState<any[]>([]);

  useEffect(() => {
    setListAno(ano);
    setListMes(meses);

    getDespesasMes(mes).then((res) => {
      setDespesasMes(res);
    });
  }, []);

  const toggleAno = (e: any) => {
    setSelectedAno(e.target.value);
  };

  const toggleMes = (e: any) => {
    setSelectedMes(e.target.value);
    setDespesasMes([]);
    setDespesaTotal(0);
    history.push(`${selectedAno + "-0" + e.target.value}`);
    handleDespesasMes(selectedAno, e.target.value);
  };

  const handleDespesasMes = async (ano: string, mes: string) => {
    const mesano = `${ano}-0${mes}`;
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
    <>
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Box>
            <FormControl margin="normal">
              <Box>
                <InputLabel id="select-ano">Ano</InputLabel>
                <NativeSelect
                  id="select-ano"
                  value={selectedAno}
                  onChange={(e) => toggleAno(e)}
                >
                  {listAno.map((a) => {
                    return (
                      <option key={a.id} value={a.ano}>
                        {a.ano}
                      </option>
                    );
                  })}
                </NativeSelect>
              </Box>
            </FormControl>
            <FormControl margin="normal">
              <Box>
                <InputLabel id="select-mes">Mes</InputLabel>
                <NativeSelect
                  id="select-mes"
                  value={selectedMes}
                  onChange={(e) => toggleMes(e)}
                >
                  {listMes.map((m) => {
                    return (
                      <option key={m.id} value={m.id}>
                        {m.mes}
                      </option>
                    );
                  })}
                </NativeSelect>
              </Box>
            </FormControl>
          </Box>
          <Box alignSelf="center">
            <span>Despesas total: {formatNumbers(despesaTotal)}</span>
          </Box>
        </Box>
        <Box>
          <TableDespesas despesas={despesasMes} />
        </Box>
      </Box>
    </>
  );
}
