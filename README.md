# Nogueira Representações — site institucional

Site one-page da Nogueira Representações (representação comercial Piracanjuba em Campos dos Goytacazes e região — RJ).

**Stack:** React 18 · Vite · TypeScript · Tailwind CSS · Three.js / React Three Fiber / Drei · GSAP + ScrollTrigger · Framer Motion · Lenis · Lucide.

## Rodar localmente

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera a pasta dist/ pronta para publicar
npm run preview  # testa o build
```

## Publicar

A pasta `dist/` é um site estático. Qualquer uma destas opções funciona:

- **Netlify (mais simples):** acesse https://app.netlify.com/drop e arraste a pasta `dist/`.
- **Vercel:** importe este projeto em https://vercel.com/new (framework: Vite, build `npm run build`, saída `dist`).
- **Hospedagem própria / cPanel:** envie o conteúdo de `dist/` para a pasta pública (`public_html`).

Depois de ter o domínio definitivo, troque `/og-image.jpg` por `https://SEU-DOMINIO/og-image.jpg`
nas tags `og:image` e `twitter:image` do `index.html` (alguns apps exigem URL absoluta para a prévia de link).

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Telefone, WhatsApp, e-mail, Instagram | `src/lib/contact.ts` |
| Textos das seções | `src/components/*.tsx` |
| Cena 3D do topo | `src/three/HeroScene.tsx` e `src/three/Elements.tsx` |
| Cores e fontes | `tailwind.config.js` |
| SEO / Open Graph | `index.html` |

## Imagens

- `public/assets/nr-*.webp` e `pira-*.webp`: recortes do logotipo enviado (versão original e versão branca para fundo escuro).
- `public/assets/jars.webp`, `jar-choc.webp`, `jar-milk.webp`: recortes da imagem oficial do Whey Protein Piracanjuba, sem alterações na embalagem.
- `public/assets/art-*.webp`: ilustrações 3D originais (leite, respingos, chocolate), sem marcas, geradas a partir das próprias cenas do site
  (`render.html` + `tools/render.tsx`, só para desenvolvimento).

Para melhor nitidez, substitua as imagens do Whey e o logotipo por arquivos oficiais em alta resolução mantendo os mesmos nomes.

## Desempenho e acessibilidade

- 3D carregado sob demanda (lazy), pausado fora da tela, versão leve automática em celulares (menos objetos, sem refração).
- Fallback com imagem estática se o navegador não suportar WebGL.
- Respeita `prefers-reduced-motion`, navegação por teclado, link "Pular para o conteúdo", textos alternativos.
