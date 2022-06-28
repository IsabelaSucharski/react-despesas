import { Box, FormControl, InputLabel, NativeSelect } from "@material-ui/core";
import { useEffect, useState } from "react";
import { meses, ano } from "../helpers";

interface IAno {
  ano: string;
  id: number;
}

interface IMes {
  mes: string;
  id: number;
}

interface ISelectedAnoMes {
  anoMes: string;
  toggleMes(e: any): void;
}

export function SelectedAnoMes(props: ISelectedAnoMes) {
  let campos = props.anoMes.split("-");

  const [listAno, setListAno] = useState<IAno[]>([]);
  const [listMes, setListMes] = useState<IMes[]>([]);

  useEffect(() => {
    setListAno(ano);
    setListMes(meses);
  }, []);

  return (
    <>
      <FormControl margin="normal">
        <Box>
          <InputLabel id="select-ano">Ano</InputLabel>
          <NativeSelect
            id="select-ano"
            value={campos[0]}
            onChange={(e) => e.target.value}
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
            value={campos[1].split("0")[1]}
            onChange={(e) => props.toggleMes(e)}
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
    </>
  );
}
