"""
Gera arquivo SQL completo com DELETE + INSERTs
Pronto para executar no Supabase SQL Editor
"""

import pandas as pd
from datetime import datetime, timedelta

def calculate_age(days_birth):
    if pd.isna(days_birth):
        return None
    return int(abs(days_birth) / 365)

def get_age_range(age):
    if age is None:
        return None
    if age < 25: return '<25'
    elif age < 35: return '25-35'
    elif age < 45: return '35-45'
    elif age < 60: return '45-60'
    else: return '>60'

def convert_days_to_date(days):
    if pd.isna(days) or days == 0:
        return None
    try:
        base_date = datetime(2018, 1, 1)
        date = base_date + timedelta(days=int(days))
        return date.strftime('%Y-%m-%d')
    except:
        return None

def safe_sql_value(value):
    """Converte valor para formato SQL"""
    if pd.isna(value) or str(value).strip() == '' or str(value).lower() == 'nan':
        return 'NULL'
    if isinstance(value, str):
        value = value.replace("'", "''")
        return f"'{value}'"
    return str(value)

print("🚀 Gerando arquivo SQL completo\n")

# ========== APPLICATION DATA ==========
print("📊 Processando application_data.csv...")
df_app = pd.read_csv('application_data.csv')
print(f"   Total: {len(df_app)} registros")

sql_lines = []
sql_lines.append("-- =====================================================")
sql_lines.append("-- IMPORTAÇÃO COMPLETA - DADOS REAIS")
sql_lines.append("-- =====================================================")
sql_lines.append("")
sql_lines.append("-- PASSO 1: Limpar dados anteriores")
sql_lines.append("DELETE FROM previous_application;")
sql_lines.append("DELETE FROM application_data;")
sql_lines.append("")
sql_lines.append("-- PASSO 2: Inserir application_data")
sql_lines.append("BEGIN;")
sql_lines.append("")

batch_size = 100  # SQLs em lotes
total_batches = (len(df_app) + batch_size - 1) // batch_size

for batch_idx in range(total_batches):
    start_idx = batch_idx * batch_size
    end_idx = min(start_idx + batch_size, len(df_app))
    batch_df = df_app.iloc[start_idx:end_idx]
    
    sql_lines.append(f"-- Lote {batch_idx + 1}/{total_batches}")
    sql_lines.append("INSERT INTO application_data (")
    sql_lines.append("  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero,")
    sql_lines.append("  possui_carro, possui_imovel, qtd_filhos, renda_total,")
    sql_lines.append("  valor_credito, valor_anuidade, tipo_renda, escolaridade,")
    sql_lines.append("  estado_civil, tipo_moradia, idade_anos, faixa_etaria,")
    sql_lines.append("  data_registro, ext_source_1, ext_source_2, ext_source_3")
    sql_lines.append(") VALUES")
    
    values = []
    for _, row in batch_df.iterrows():
        idade = calculate_age(row.get('DAYS_BIRTH'))
        faixa = get_age_range(idade)
        data_reg = convert_days_to_date(row.get('DAYS_REGISTRATION'))
        
        value_parts = [
            str(int(row['SK_ID_CURR'])),
            safe_sql_value(row['TARGET']),
            safe_sql_value(row['NAME_CONTRACT_TYPE']),
            safe_sql_value(row['CODE_GENDER']),
            safe_sql_value(row['FLAG_OWN_CAR']),
            safe_sql_value(row['FLAG_OWN_REALTY']),
            safe_sql_value(row['CNT_CHILDREN']),
            safe_sql_value(row['AMT_INCOME_TOTAL']),
            safe_sql_value(row['AMT_CREDIT']),
            safe_sql_value(row['AMT_ANNUITY']),
            safe_sql_value(row['NAME_INCOME_TYPE']),
            safe_sql_value(row['NAME_EDUCATION_TYPE']),
            safe_sql_value(row['NAME_FAMILY_STATUS']),
            safe_sql_value(row['NAME_HOUSING_TYPE']),
            safe_sql_value(idade),
            safe_sql_value(faixa),
            safe_sql_value(data_reg),
            safe_sql_value(row.get('EXT_SOURCE_1')),
            safe_sql_value(row.get('EXT_SOURCE_2')),
            safe_sql_value(row.get('EXT_SOURCE_3'))
        ]
        values.append(f"  ({', '.join(value_parts)})")
    
    sql_lines.append(',\n'.join(values))
    sql_lines.append("ON CONFLICT (id_cliente_atual) DO NOTHING;")
    sql_lines.append("")
    
    if (batch_idx + 1) % 10 == 0:
        print(f"   Processados {end_idx}/{len(df_app)} registros")

sql_lines.append("COMMIT;")
sql_lines.append("")

print(f"✅ application_data processado\n")

# ========== PREVIOUS APPLICATION ==========
print("📊 Processando previous_application.csv...")
df_prev = pd.read_csv('previous_application.csv')
print(f"   Total: {len(df_prev)} registros")

sql_lines.append("-- PASSO 3: Inserir previous_application")
sql_lines.append("BEGIN;")
sql_lines.append("")

total_batches_prev = (len(df_prev) + batch_size - 1) // batch_size

for batch_idx in range(total_batches_prev):
    start_idx = batch_idx * batch_size
    end_idx = min(start_idx + batch_size, len(df_prev))
    batch_df = df_prev.iloc[start_idx:end_idx]
    
    sql_lines.append(f"-- Lote {batch_idx + 1}/{total_batches_prev}")
    sql_lines.append("INSERT INTO previous_application (")
    sql_lines.append("  id_cliente_anterior, id_cliente_atual, tipo_contrato,")
    sql_lines.append("  valor_solicitado, valor_credito, valor_anuidade,")
    sql_lines.append("  status_contrato, data_decisao, tipo_pagamento,")
    sql_lines.append("  motivo_rejeicao, canal_venda, tipo_cliente")
    sql_lines.append(") VALUES")
    
    values = []
    for _, row in batch_df.iterrows():
        data_dec = convert_days_to_date(row.get('DAYS_DECISION'))
        
        value_parts = [
            str(int(row['SK_ID_PREV'])),
            str(int(row['SK_ID_CURR'])),
            safe_sql_value(row['NAME_CONTRACT_TYPE']),
            safe_sql_value(row['AMT_APPLICATION']),
            safe_sql_value(row['AMT_CREDIT']),
            safe_sql_value(row.get('AMT_ANNUITY')),
            safe_sql_value(row.get('NAME_CONTRACT_STATUS')),
            safe_sql_value(data_dec),
            safe_sql_value(row.get('NAME_PAYMENT_TYPE')),
            safe_sql_value(row.get('CODE_REJECT_REASON')),
            safe_sql_value(row.get('NAME_SELLER_INDUSTRY')),
            safe_sql_value(row.get('NAME_CLIENT_TYPE'))
        ]
        values.append(f"  ({', '.join(value_parts)})")
    
    sql_lines.append(',\n'.join(values))
    sql_lines.append(";")
    sql_lines.append("")
    
    if (batch_idx + 1) % 10 == 0:
        print(f"   Processados {end_idx}/{len(df_prev)} registros")

sql_lines.append("COMMIT;")
sql_lines.append("")
sql_lines.append("-- PASSO 4: Verificar")
sql_lines.append("SELECT COUNT(*) as total FROM application_data;")
sql_lines.append("SELECT COUNT(*) as total FROM previous_application;")

# Salvar arquivo
output_file = 'scripts/IMPORT_COMPLETO.sql'
with open(output_file, 'w', encoding='utf-8') as f:
    f.write('\n'.join(sql_lines))

print(f"\n✅ Arquivo gerado: {output_file}")
print(f"   Tamanho: ~{len('\n'.join(sql_lines)) / 1024 / 1024:.1f} MB")
print(f"\n📋 Para importar:")
print(f"   1. Abra: https://supabase.com/dashboard/project/tmmlkfqedqsvgxxjcgxl/sql/new")
print(f"   2. Copie e cole TODO o conteúdo de {output_file}")
print(f"   3. Clique em RUN")
print(f"   4. Aguarde ~1-2 minutos")
print(f"   5. ✅ Pronto!")
