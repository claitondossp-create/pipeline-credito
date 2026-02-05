"""
Gera arquivo CSV otimizado para COPY direto no PostgreSQL/Supabase
Muito mais rápido que INSERTs individuais!
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
    if age < 25:
        return '<25'
    elif age < 35:
        return '25-35'
    elif age < 45:
        return '35-45'
    elif age < 60:
        return '45-60'
    else:
        return '>60'

def convert_days_to_date(days):
    if pd.isna(days) or days == 0:
        return None
    try:
        base_date = datetime(2018, 1, 1)
        date = base_date + timedelta(days=int(days))
        return date.strftime('%Y-%m-%d')
    except:
        return None

print("Gerando CSV formatado para COPY do PostgreSQL\n")

# Processar application_data
print("Processando application_data.csv...")
df_app = pd.read_csv('application_data.csv')

# Criar colunas calculadas
df_app['idade_anos'] = df_app['DAYS_BIRTH'].apply(calculate_age)
df_app['faixa_etaria'] = df_app['idade_anos'].apply(get_age_range)
df_app['data_registro'] = df_app['DAYS_REGISTRATION'].apply(convert_days_to_date)

# Mapear para estrutura do banco
df_output = pd.DataFrame({
    'id_cliente_atual': df_app['SK_ID_CURR'],
    'alvo_inadimplencia': df_app['TARGET'],
    'tipo_contrato': df_app['NAME_CONTRACT_TYPE'],
    'genero': df_app['CODE_GENDER'],
    'possui_carro': df_app['FLAG_OWN_CAR'],
    'possui_imovel': df_app['FLAG_OWN_REALTY'],
    'qtd_filhos': df_app['CNT_CHILDREN'],
    'renda_total': df_app['AMT_INCOME_TOTAL'],
    'valor_credito': df_app['AMT_CREDIT'],
    'valor_anuidade': df_app['AMT_ANNUITY'],
    'tipo_renda': df_app['NAME_INCOME_TYPE'],
    'escolaridade': df_app['NAME_EDUCATION_TYPE'],
    'estado_civil': df_app['NAME_FAMILY_STATUS'],
    'tipo_moradia': df_app['NAME_HOUSING_TYPE'],
    'idade_anos': df_app['idade_anos'],
    'faixa_etaria': df_app['faixa_etaria'],
    'data_registro': df_app['data_registro'],
    'ext_source_1': df_app['EXT_SOURCE_1'],
    'ext_source_2': df_app['EXT_SOURCE_2'],
    'ext_source_3': df_app['EXT_SOURCE_3'],
})

# Salvar CSV formatado
df_output.to_csv('scripts/application_data_formatted.csv', index=False, encoding='utf-8')
print(f"OK Gerado: application_data_formatted.csv ({len(df_output)} registros)\n")

# Processar previous_application
print("Processando previous_application.csv...")
df_prev = pd.read_csv('previous_application.csv')

df_prev['data_decisao'] = df_prev['DAYS_DECISION'].apply(convert_days_to_date)

df_prev_output = pd.DataFrame({
    'id_cliente_anterior': df_prev['SK_ID_PREV'],
    'id_cliente_atual': df_prev['SK_ID_CURR'],
    'tipo_contrato': df_prev['NAME_CONTRACT_TYPE'],
    'valor_solicitado': df_prev['AMT_APPLICATION'],
    'valor_credito': df_prev['AMT_CREDIT'],
    'valor_anuidade': df_prev.get('AMT_ANNUITY'),
    'status_contrato': df_prev.get('NAME_CONTRACT_STATUS'),
    'data_decisao': df_prev['data_decisao'],
    'tipo_pagamento': df_prev.get('NAME_PAYMENT_TYPE'),
    'motivo_rejeicao': df_prev.get('CODE_REJECT_REASON'),
    'canal_venda': df_prev.get('NAME_SELLER_INDUSTRY'),
    'tipo_cliente': df_prev.get('NAME_CLIENT_TYPE'),
})

df_prev_output.to_csv('scripts/previous_application_formatted.csv', index=False, encoding='utf-8')
print(f"OK Gerado: previous_application_formatted.csv ({len(df_prev_output)} registros)\n")

# Gerar comandos SQL COPY
print("=" * 60)
print("📝 Comandos SQL para executar no Supabase:\n")

sql_commands = f"""
-- PASSO 1: Importar application_data (RÁPIDO!)
\\copy application_data(id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade, tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3) FROM 'application_data_formatted.csv' WITH (FORMAT CSV, HEADER true, NULL '');

-- PASSO 2: Importar previous_application
\\copy previous_application(id_cliente_anterior, id_cliente_atual, tipo_contrato, valor_solicitado, valor_credito, valor_anuidade, status_contrato, data_decisao, tipo_pagamento, motivo_rejeicao, canal_venda, tipo_cliente) FROM 'previous_application_formatted.csv' WITH (FORMAT CSV, HEADER true, NULL '');

-- PASSO 3: Verificar
SELECT COUNT(*) FROM application_data;
SELECT COUNT(*) FROM previous_application;
"""

with open('scripts/COMANDOS_COPY.sql', 'w', encoding='utf-8') as f:
    f.write(sql_commands)

print(sql_commands)
print("\n✅ Arquivo gerado: scripts/COMANDOS_COPY.sql")
print("\n" + "=" * 60)
print("⚠️  IMPORTANTE:")
print("   O comando \\copy funciona no psql local.")
print("   No Supabase Web UI, use o CSV Upload na interface!")
print("\n📋 Instruções:")
print("   1. Supabase Dashboard → Table Editor")
print("   2. Selecione 'application_data' → Insert → Import CSV")
print("   3. Upload: scripts/application_data_formatted.csv")
print("   4. Repita para 'previous_application'")
print("   5. Importação em segundos! ⚡")
