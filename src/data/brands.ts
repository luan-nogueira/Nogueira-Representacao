/**
 * Brands represented by Nogueira Representações. Product names, versions and
 * sizes are transcribed from each manufacturer's official catalog — do not
 * add items that are not in the catalogs.
 */
export type Product = { name: string; img: string; detail?: string }
export type Line = { id: string; title: string; detail?: string; products: Product[] }
export type Brand = {
  id: string
  name: string
  logo: string
  logoAlt: string
  eyebrow: string
  title: [string, string]
  about: string
  facts: { value: string; label: string }[]
  family?: { logo: string; alt: string }[]
  lines: Line[]
}

const t = (f: string) => `/assets/tangara/${f}.webp`
const p = (f: string) => `/assets/petyan/${f}.webp`

export const TANGARA: Brand = {
  id: 'tangara',
  name: 'Tangará Química',
  logo: '/assets/brands/tangara.webp',
  logoAlt: 'Logotipo Tangará Química',
  eyebrow: 'Limpeza e álcool · Linha Flop´s',
  title: ['Tangará Química.', 'Força e confiança na limpeza.'],
  about:
    'Há mais de duas décadas no mercado nacional, a Tangará Química tem como carro-chefe o envase de álcool etílico e uma linha completa de produtos de limpeza com a marca Flop´s.',
  facts: [
    { value: '+20 anos', label: 'no mercado nacional' },
    { value: '+100 mil L', label: 'de álcool envasados por dia' },
    { value: '11 linhas', label: 'de produtos Flop´s' },
  ],
  lines: [
    {
      id: 'alcool',
      title: 'Álcool',
      detail: '46° INPM, 46,2° INPM bactericida, 70° INPM, 92,8° INPM e Álcool + Bicarbonato · 500 ml, 1 L e 5 L',
      products: [
        { name: 'Álcool 46° INPM', img: t('alcool-46'), detail: '500 ml e 1 L' },
        { name: 'Álcool 70° INPM', img: t('alcool-70'), detail: '500 ml e 1 L' },
        { name: 'Álcool 46,2° Bactericida', img: t('alcool-bactericida'), detail: '1 L' },
        { name: 'Álcool + Bicarbonato', img: t('alcool-bicarbonato'), detail: 'Tradicional · 1 L' },
        { name: 'Álcool 70° INPM', img: t('alcool-70-5l'), detail: '5 L' },
      ],
    },
    {
      id: 'perfumado',
      title: 'Álcool Perfumado',
      detail: 'Citronela, Eucalipto e Lavanda 46,2° INPM; Álcool + Bicarbonato Eucalipto e Lavanda · 1 L',
      products: [
        { name: 'Citronela', img: t('perf-citronela'), detail: '46,2° INPM · 1 L' },
        { name: 'Eucalipto', img: t('perf-eucalipto'), detail: '46,2° INPM · 1 L' },
        { name: 'Lavanda', img: t('perf-lavanda'), detail: '46,2° INPM · 1 L' },
      ],
    },
    {
      id: 'gel',
      title: 'Álcool em Gel',
      detail: 'Cristal, Citronela, Eucalipto e Lavanda 65° INPM; Cristal Bactericida 70° INPM · 440 g, 500 g, 4,4 kg e 5 L',
      products: [
        { name: 'Cristal', img: t('gel-cristal'), detail: '65° INPM · 500 g' },
        { name: 'Citronela', img: t('gel-citronela'), detail: '65° INPM · 500 g' },
        { name: 'Lavanda', img: t('gel-lavanda'), detail: '65° INPM · 500 g' },
        { name: 'Eucalipto', img: t('gel-eucalipto'), detail: '65° INPM · 500 g' },
        { name: 'Cristal Bactericida', img: t('gel-440'), detail: '70° INPM · 440 g' },
        { name: 'Cristal', img: t('gel-5l'), detail: '65° INPM · 5 L' },
      ],
    },
    {
      id: 'queima',
      title: 'Álcool Gel para Queima',
      detail: '80° INPM · 500 g, 880 g, 4,3 kg e barricas de 10 kg e 13 kg',
      products: [
        { name: 'Gel para Queima', img: t('queima-500'), detail: '500 g' },
        { name: 'Gel para Queima', img: t('queima-880'), detail: '880 g' },
        { name: 'Gel para Queima', img: t('queima-43'), detail: '4,3 kg' },
        { name: 'Gel para Queima', img: t('queima-barrica'), detail: 'Barrica 10 kg e 13 kg' },
      ],
    },
    {
      id: 'desinfetante',
      title: 'Desinfetante',
      detail: 'Eucalipto, Pinho, Floral e Lavanda · 500 ml, 2 L e 5 L',
      products: [
        { name: 'Pinho', img: t('desinf-pinho'), detail: '500 ml, 2 L e 5 L' },
        { name: 'Floral', img: t('desinf-floral'), detail: '500 ml, 2 L e 5 L' },
        { name: 'Lavanda', img: t('desinf-lavanda'), detail: '500 ml, 2 L e 5 L' },
        { name: 'Desinfetante', img: t('desinf-5l'), detail: '5 L' },
      ],
    },
    {
      id: 'limpeza',
      title: 'Limpeza da casa',
      detail: 'Água Sanitária 1 L, 2 L e 5 L · Multiuso Tradicional 500 ml e 5 L',
      products: [
        { name: 'Água Sanitária', img: t('sanitaria-2l'), detail: '1 L, 2 L e 5 L' },
        { name: 'Água Sanitária', img: t('sanitaria-5l'), detail: '5 L' },
        { name: 'Multiuso Tradicional', img: t('multiuso-5l'), detail: '500 ml e 5 L' },
      ],
    },
    {
      id: 'detergente',
      title: 'Detergente',
      detail: 'Neutro, Clear, Maçã e Limão 500 ml · Neutro 5 L',
      products: [
        { name: 'Neutro', img: t('deterg-neutro'), detail: '500 ml' },
        { name: 'Clear', img: t('deterg-clear'), detail: '500 ml' },
        { name: 'Maçã', img: t('deterg-maca'), detail: '500 ml' },
        { name: 'Limão', img: t('deterg-limao'), detail: '500 ml' },
        { name: 'Neutro', img: t('deterg-5l'), detail: '5 L' },
      ],
    },
    {
      id: 'amaciante',
      title: 'Amaciante',
      detail: 'Soft Life, Soft Baby e Floral · 2 L',
      products: [
        { name: 'Soft Life', img: t('amaciante-life'), detail: '2 L' },
        { name: 'Soft Baby', img: t('amaciante-baby'), detail: '2 L' },
        { name: 'Floral', img: t('amaciante-floral'), detail: '2 L' },
      ],
    },
    {
      id: 'querosene',
      title: 'Querosene e Removedor',
      detail: 'Querosene Uso Geral, Floral, Lavanda e Eucalipto · Removedor Uso Geral · 500 ml e 900 ml',
      products: [
        { name: 'Querosene', img: t('querosene-1'), detail: '500 ml e 900 ml' },
        { name: 'Querosene', img: t('querosene-2'), detail: '500 ml e 900 ml' },
        { name: 'Querosene', img: t('querosene-3'), detail: '900 ml' },
        { name: 'Removedor', img: t('removedor-1'), detail: '500 ml e 900 ml' },
      ],
    },
  ],
}

export const PETYAN: Brand = {
  id: 'petyan',
  name: 'Petyan',
  logo: '/assets/brands/petyan.webp',
  logoAlt: 'Logotipo Petyan',
  eyebrow: 'Biscoitos e massas · Desde 1988',
  title: ['Petyan.', 'Tradição que vira sabor.'],
  about:
    'Nascida de uma panificadora familiar, a Petyan produz biscoitos e massas com um mix amplo e diversificado, com as marcas Petyan, Supradely e Spaguetto.',
  facts: [
    { value: '1988', label: 'desde' },
    { value: '3 marcas', label: 'Petyan, Supradely e Spaguetto' },
    { value: 'Biscoitos', label: 'e massas' },
  ],
  family: [
    { logo: '/assets/brands/supradely.webp', alt: 'Logotipo Supradely' },
    { logo: '/assets/brands/spaguetto.webp', alt: 'Logotipo Spaguetto' },
  ],
  lines: [
    {
      id: 'rosquinhas',
      title: 'Rosquinhas',
      products: [
        { name: 'Rosquinhas Chocolate', img: p('rosq-choc') },
        { name: 'Rosquinhas Coco', img: p('rosq-coco') },
        { name: 'Rosquinhas Leite', img: p('rosq-leite') },
        { name: 'Rosquinhas Milho Verde', img: p('rosq-milho') },
        { name: 'Rosquinhas Banana e Canela', img: p('rosq-banana') },
        { name: 'Rosquinhas Amendoim', img: p('rosq-amendoim') },
      ],
    },
    {
      id: 'laminados',
      title: 'Biscoitos laminados',
      products: [
        { name: 'Biscoito Premium', img: p('lam-premium') },
        { name: 'Cream Cracker Tost', img: p('lam-tost') },
        { name: 'Cream Cracker Tradicional', img: p('lam-cream') },
        { name: 'Cream Cracker Amanteigado', img: p('lam-amanteigado') },
        { name: 'Cream Cracker Água e Sal', img: p('lam-agua-sal') },
        { name: 'Cream Cracker Integral', img: p('lam-integral') },
        { name: 'Cream Cracker Água e Gergelim', img: p('lam-gergelim') },
        { name: 'Maisena Tradicional', img: p('lam-maisena') },
        { name: 'Maria Tradicional', img: p('lam-maria') },
        { name: 'Maisena Chocolate', img: p('lam-maisena-choc') },
        { name: 'Maria Chocolate', img: p('lam-maria-choc') },
        { name: 'Biscoito Coco 3x1', img: p('lam-coco') },
        { name: 'Biscoito Leite 3x1', img: p('lam-leite') },
      ],
    },
    {
      id: 'mini',
      title: 'Biscoitos Mini',
      products: [
        { name: 'Mini Maria Tradicional', img: p('mini-maria') },
        { name: 'Mini Maria Chocolate', img: p('mini-maria-choc') },
        { name: 'Mini Maisena', img: p('mini-maisena') },
      ],
    },
    {
      id: 'massas',
      title: 'Massas Petyan',
      products: [
        { name: 'Ninho Sêmola', img: p('cort-ninho') },
        { name: 'Ave Maria Sêmola', img: p('cort-avemaria') },
        { name: 'Parafuso Sêmola', img: p('cort-parafuso') },
        { name: 'Penne Sêmola', img: p('cort-penne') },
        { name: 'Padre Nosso Sêmola', img: p('cort-padrenosso') },
        { name: 'Ave Maria com Ovos', img: p('ovos-avemaria') },
        { name: 'Ninho com Ovos', img: p('ovos-ninho') },
        { name: 'Parafuso com Ovos', img: p('ovos-parafuso') },
        { name: 'Penne com Ovos', img: p('ovos-penne') },
        { name: 'Parafuso Integral', img: p('int-parafuso') },
        { name: 'Penne Integral', img: p('int-penne') },
        { name: 'Macarrão Integral', img: p('mas-integral-longa') },
        { name: 'Macarrão Comum Furadinho', img: p('mas-furadinho') },
      ],
    },
    {
      id: 'supradely',
      title: 'Família Supradely',
      products: [
        { name: 'Biscoito Coco', img: p('sup-coco') },
        { name: 'Biscoito Doce', img: p('sup-doce') },
        { name: 'Mini Maria Tradicional', img: p('sup-minimaria') },
        { name: 'Mini Maria Chocolate', img: p('sup-minimaria-choc') },
        { name: 'Rosquinha Leite', img: p('sup-rosq-leite') },
        { name: 'Rosquinha Coco', img: p('sup-rosq-coco') },
        { name: 'Rosquinha Chocolate', img: p('sup-rosq-choc') },
        { name: 'Cracker Tradicional', img: p('sup-cracker') },
        { name: 'Maisena Tradicional', img: p('sup-maisena') },
        { name: 'Maria Tradicional', img: p('sup-maria') },
        { name: 'Macarrão Comum', img: p('sup-macarrao') },
        { name: 'Parafuso Comum', img: p('sup-parafuso') },
        { name: 'Penne Comum', img: p('sup-penne') },
      ],
    },
    {
      id: 'spaguetto',
      title: 'Família Spaguetto',
      products: [
        { name: 'Macarrão Comum', img: p('spa-comum') },
        { name: 'Macarrão com Ovos', img: p('spa-ovos') },
        { name: 'Parafuso Comum', img: p('spa-parafuso') },
        { name: 'Penne Comum', img: p('spa-penne') },
        { name: 'Padre Nosso Comum', img: p('spa-padrenosso') },
        { name: 'Ave Maria Comum', img: p('spa-avemaria') },
        { name: 'Argola Comum', img: p('spa-argola') },
        { name: 'Sopinha Comum', img: p('spa-sopinha') },
      ],
    },
  ],
}
