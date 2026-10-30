/**
 * Piracanjuba lines and items, transcribed from the official catalogs
 * "Linha Seca" and "Refrigerados". Do not add items that are not in them.
 */
export type PiraLine = { id: string; title: string; img: string; items: string[] }
export type PiraGroup = { id: string; label: string; lines: PiraLine[] }

const img = (f: string) => `/assets/pira/${f}.webp`

export const PIRA_GROUPS: PiraGroup[] = [
  {
    id: 'seca',
    label: 'Linha seca',
    lines: [
      {
        id: 'uht',
        title: 'Leite UHT',
        img: img('uht'),
        items: ['Integral 1 L', 'Semidesnatado 1 L', 'Desnatado 1 L', 'Desnatado + Cálcio 1 L'],
      },
      {
        id: 'a2',
        title: 'Leite A2',
        img: img('a2'),
        items: ['UHT Semidesnatado A2 1 L', 'UHT Semidesnatado Zero Lactose A2 1 L', 'Em pó A2 380 g e 700 g (lata)'],
      },
      {
        id: 'zero-lactose',
        title: 'Zero Lactose',
        img: img('zero-lactose'),
        items: [
          'Leite UHT Integral, Semidesnatado e Desnatado 1 L',
          'Leite Condensado 395 g',
          'Creme de Leite Leve 200 g',
          'Doce de Leite (pote) 350 g',
          'Composto Lácteo 380 g e 700 g (lata)',
          'Pirakids Chocolate 200 ml',
        ],
      },
      {
        id: 'pirakids',
        title: 'Pirakids',
        img: img('pirakids'),
        items: ['Bebida láctea Chocolate 200 ml', 'Bebida láctea Chocolate 1 L', 'Zero Lactose Chocolate 200 ml'],
      },
      {
        id: 'po-sache',
        title: 'Leite em pó sachê',
        img: img('po-sache'),
        items: ['Integral 200 g, 400 g e 1 kg', 'Integral Instantâneo 200 g, 400 g e 1 kg', 'Desnatado Instantâneo 200 g e 400 g', 'Integral e Desnatado 25 kg'],
      },
      {
        id: 'po-pouch',
        title: 'Leite em pó pouch',
        img: img('po-pouch'),
        items: ['Integral 700 g', 'Integral Instantâneo 700 g', 'Desnatado Instantâneo 500 g'],
      },
      {
        id: 'po-lata',
        title: 'Leite em pó lata',
        img: img('po-lata'),
        items: ['Integral 380 g', 'Integral Instantâneo 380 g', 'Desnatado Instantâneo 300 g', 'A2 380 g e 700 g', 'Composto Lácteo Zero Lactose 380 g e 700 g'],
      },
      {
        id: 'composto',
        title: 'Composto lácteo Ótimo',
        img: img('composto'),
        items: ['200 g', '400 g', '1 kg', '25 kg'],
      },
      {
        id: 'creme',
        title: 'Creme de leite',
        img: img('creme'),
        items: ['Creme de Leite Leve 200 g', 'Creme de Leite Zero Lactose 200 g'],
      },
      {
        id: 'condensado',
        title: 'Leite condensado',
        img: img('condensado'),
        items: ['Tradicional 395 g e 270 g', 'Light 405 g', 'Zero Lactose 395 g'],
      },
      {
        id: 'food-seca',
        title: 'Food service',
        img: img('food-seca'),
        items: ['Leite Condensado Bag 2,5 kg e 5 kg', 'Creme de Leite 1,030 kg', 'Creme de Leite 20% 1,030 kg', 'Soro de leite em pó 25 kg'],
      },
    ],
  },
  {
    id: 'refrigerados',
    label: 'Refrigerados',
    lines: [
      {
        id: 'manteiga',
        title: 'Manteiga',
        img: img('manteiga'),
        items: ['Com sal pote 200 g e 500 g', 'Sem sal pote 200 g e 500 g', 'Flor de Sal 200 g'],
      },
      {
        id: 'manteiga-zl',
        title: 'Manteiga Zero Lactose',
        img: img('manteiga-zl'),
        items: ['Com sal 200 g'],
      },
      {
        id: 'coalho',
        title: 'Queijo coalho',
        img: img('coalho'),
        items: ['Espetinho ±340 g e ±400 g', 'Pequeno ±500 g e ±680 g', 'Fatiado 150 g', 'Peça ±2 kg e ±3 kg'],
      },
      {
        id: 'minas',
        title: 'Queijo minas padrão',
        img: img('minas'),
        items: ['Pequeno 430 g', 'Pedaço 200 g'],
      },
      {
        id: 'mussarela',
        title: 'Queijo mussarela',
        img: img('mussarela'),
        items: ['Fatiado 150 g, 300 g e 500 g', 'Bolinha 420 g', 'Palito 350 g', 'Trança 400 g', 'Pedaço 200 g', 'Pequeno 430 g', 'Peça 4 kg'],
      },
      {
        id: 'parmesao',
        title: 'Queijo parmesão',
        img: img('parmesao'),
        items: ['Ralado 50 g e 100 g', 'Cilindro 180 g', 'Fracionado ±250 g', 'Peça 5 kg', 'Ralado 25 kg'],
      },
      {
        id: 'prato',
        title: 'Queijo prato',
        img: img('prato'),
        items: ['Fatiado 150 g', 'Pedaço 200 g', 'Lanche pequeno 450 g', 'Lanche 3 kg'],
      },
      {
        id: 'reino',
        title: 'Queijo do reino',
        img: img('reino'),
        items: ['Fatiado 150 g', 'Pedaço 200 g', 'Fracionado ±350 g', 'Meia lata 500 g', 'Lata ±1 kg'],
      },
      {
        id: 'requeijao',
        title: 'Requeijão culinário',
        img: img('requeijao'),
        items: ['Mistura de requeijão com amido 400 g', 'Sabor Cheddar 400 g'],
      },
      {
        id: 'food-refr',
        title: 'Food service',
        img: img('food-refr'),
        items: ['Manteiga com sal balde 3,5 kg e 12 kg', 'Manteiga sem sal bloco 5 kg e 25 kg', 'Requeijão com amido 1,8 kg', 'Requeijão sabor Cheddar 1,5 kg'],
      },
    ],
  },
]
