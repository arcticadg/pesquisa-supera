/**
 * CONFIGURAÇÃO SUPERA IPATINGA
 * ─────────────────────────────────────────────────────────────────
 * Troque USE_TEST para false quando quiser ir para produção.
 */
const SUPERA_CONFIG = {
  USE_TEST: false,

  // Webhook de ENVIO (POST) — formulário → N8N → banco
  WEBHOOK_TEST: 'https://flow.labpro.digital/webhook-test/13ebe511-277e-4654-a734-b01b8dcf23e6',
  WEBHOOK_PROD: 'https://whook.labpro.digital/webhook/13ebe511-277e-4654-a734-b01b8dcf23e6',

  // Webhook de LEITURA (GET) — admin busca as respostas do banco
  // Crie um segundo nó Webhook no N8N para isso (método GET)
  WEBHOOK_GET_TEST: '',
  WEBHOOK_GET_PROD: '',

  // Senha do admin
  ADMIN_SENHA: 'supera@2026',

  // Helpers
  get webhookEnvio() {
    return this.USE_TEST ? this.WEBHOOK_TEST : this.WEBHOOK_PROD;
  },
  get webhookLeitura() {
    return this.USE_TEST ? this.WEBHOOK_GET_TEST : this.WEBHOOK_GET_PROD;
  },
};
