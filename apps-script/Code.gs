// ═══════════════════════════════════════════════════════════
//  SUPERA IPATINGA — Google Apps Script
//  Salva as respostas da pesquisa numa planilha Google Sheets
// ═══════════════════════════════════════════════════════════

var SHEET_NAME = 'Respostas';

var HEADERS = [
  'Data/Hora',
  'Satisfação Geral (0-10)',
  'Indicaria?',
  'Percebe Evolução?',
  'Professor',
  'Atendimento',
  'Ambiente',
  'Valor / Metodologia',
  'Sugestões de Melhoria'
];

// ── Recebe uma nova resposta (POST) ──────────────────────────
function doPost(e) {
  try {
    var sheet = obterPlanilha();
    var data  = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.data_hora          || new Date().toLocaleString('pt-BR'),
      data.satisfacao_geral   || '',
      data.indicaria          || '',
      data.evolucao           || '',
      data.professor          || '',
      data.atendimento        || '',
      data.ambiente           || '',
      data.valor              || '',
      data.melhorias          || ''
    ]);

    return resposta({ success: true });

  } catch (err) {
    return resposta({ success: false, error: err.toString() });
  }
}

// ── Retorna todas as respostas (GET) — usado pelo admin ──────
function doGet(e) {
  try {
    var sheet = obterPlanilha();
    var total = sheet.getLastRow();

    if (total <= 1) {
      return resposta([]);
    }

    var valores = sheet.getRange(2, 1, total - 1, HEADERS.length).getValues();
    var linhas  = valores.map(function(row) {
      return {
        data_hora:        String(row[0]),
        satisfacao_geral: String(row[1]),
        indicaria:        String(row[2]),
        evolucao:         String(row[3]),
        professor:        String(row[4]),
        atendimento:      String(row[5]),
        ambiente:         String(row[6]),
        valor:            String(row[7]),
        melhorias:        String(row[8])
      };
    }).reverse(); // mais recentes primeiro

    return resposta(linhas);

  } catch (err) {
    return resposta({ error: err.toString() });
  }
}

// ── Helpers ──────────────────────────────────────────────────
function obterPlanilha() {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);

    // Cabeçalho em negrito
    var cabecalho = sheet.getRange(1, 1, 1, HEADERS.length);
    cabecalho.setValues([HEADERS]);
    cabecalho.setFontWeight('bold');
    cabecalho.setBackground('#f47920');
    cabecalho.setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function resposta(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
