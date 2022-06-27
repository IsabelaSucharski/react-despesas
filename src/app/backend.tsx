// criar interfac
// criar os metodos puxando do back
// exportar pro front
// pegar dado fixo de um mex e ano pra aparecer de primeiro na tela


export interface IDespesas {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: string;
}

export function getDespesas(): Promise<IDespesas> {
  return fetch("http://localhost:3001/despesas").then((resp) => {
    return resp.json();
  });
}

export function getDespesasMes(mes: string) {
  console.log(mes);

  return fetch(`http://localhost:3001/despesas?mes=${mes}&_sort=dia`).then((resp) => {
    return resp.json();
  });
}