# Como conectar ao Google Sheets — Passo a Passo

## 1. Criar a planilha

1. Acesse [sheets.new](https://sheets.new) (cria uma nova planilha Google)
2. Dê o nome **"Supera Ipatinga – Pesquisa"** na planilha

---

## 2. Criar o Apps Script

1. No menu da planilha: **Extensões → Apps Script**
2. Apague todo o código que aparecer na tela
3. Copie e cole o conteúdo do arquivo **`Code.gs`** (que está nesta pasta)
4. Clique em **💾 Salvar** (ícone de disquete) ou `Ctrl+S`
5. Dê o nome **"Supera Pesquisa"** ao projeto (canto superior esquerdo)

---

## 3. Fazer o Deploy (publicar)

1. Clique em **"Implantar"** (botão azul, canto superior direito) → **"Nova implantação"**
2. Clique no ⚙️ ao lado de "Tipo" → escolha **"App da Web"**
3. Configure assim:
   - **Descrição:** Pesquisa Supera
   - **Executar como:** Eu (seu e-mail)
   - **Quem tem acesso:** Qualquer pessoa
4. Clique em **"Implantar"**
5. Autorize o acesso quando solicitado (clique em "Autorizar" e siga os passos)
6. **Copie a URL** que aparece — ela será algo como:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

---

## 4. Configurar o site

1. Abra o arquivo **`config.js`** na pasta do site
2. Cole a URL dentro das aspas:
   ```js
   SHEET_URL: 'https://script.google.com/macros/s/AKfycb.../exec',
   ```
3. Salve o arquivo

Pronto! A partir de agora, cada resposta enviada na pesquisa é salva automaticamente na planilha Google Sheets.

---

## Observações

- **Se precisar alterar o script**, faça uma **nova implantação** após salvar (a URL pode mudar)
- O admin continua funcionando normalmente — ele busca as respostas direto da planilha
- A planilha também pode ser compartilhada com outras pessoas da equipe
