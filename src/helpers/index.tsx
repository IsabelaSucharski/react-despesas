export const meses = [
  {
    mes: "janeiro",
    id: 1,
  },
  {
    mes: "fevereiro",
    id: 2,
  },
  {
    mes: "março",
    id: 3,
  },
  {
    mes: "abril",
    id: 4,
  },
  {
    mes: "maio",
    id: 5,
  },
  {
    mes: "junho",
    id: 6,
  },
  {
    mes: "julho",
    id: 7,
  },
  {
    mes: "agosto",
    id: 8,
  },
  {
    mes: "setembro",
    id: 9,
  },
  {
    mes: "outubro",
    id: 10,
  },
  {
    mes: "novembro",
    id: 11,
  },
  {
    mes: "dezembro",
    id: 12,
  },
];

export const ano = [
  {
    ano: "2020",
    id: 1,
  },
  {
    ano: "2021",
    id: 2,
  },
];

export function formatNumbers(num: any) {
  const type = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return type.format(num);
}
