import { getDespesas, getDespesasMes, IDespesas } from "./backend";
import {
  Select,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@material-ui/core";
import { meses, ano, formatNumbers } from "../helpers";
import { useEffect, useState } from "react";
import { TableDespesas } from "./TableDespesas";

interface IAno {
  ano: string;
  id: number;
}

interface IMes {
  mes: string;
  id: number;
}

export function Despesas() {
  const [selectedAno, setSelectedAno] = useState("2021");
  const [selectedMes, setSelectedMes] = useState("3");
  const [despesaTotal, setDespesaTotal] = useState(0);
  const [listAno, setListAno] = useState<IAno[]>([]);
  const [listMes, setListMes] = useState<IMes[]>([]);
  const [despesasMes, setDespesasMes] = useState<any[]>([]);

  useEffect(() => {
    setListAno(ano);
    setListMes(meses);
  }, []);

  const toggleAno = (e: any) => {
    setSelectedAno(e.target.value);
  };

  const toggleMes = (e: any) => {
    setSelectedMes(e.target.value);
    setDespesasMes([]);
    setDespesaTotal(0);
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
    despesasMes.map((d) => {
      for (let i in d) {
        soma += d.valor;
      }
      return soma;
    });

    setDespesaTotal(soma);
  };

  useEffect(() => {
    handleDespesasMes(selectedAno, selectedMes);
  }, []);

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
