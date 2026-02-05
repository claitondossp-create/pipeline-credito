"""
Importa dados dos CSVs ORIGINAIS (application_data.csv e previous_application.csv)
Mantém MESMA ESTRUTURA das tabelas já criadas (application_data_ptbr format)
"""

import pandas as pd
import requests
from datetime import datetime

# Configuração
SUPABASE_URL = "https://tmmlkfqedqsvgxxjcgxl.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtbWxrZnFlZHFzdmd4eGpjZ3hsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyMzQ0MDUsImV4cCI6MjA4NTgxMDQwNX0.NSR4weo4ehhLNNwkq8qJhj2a6Uo2Enc9C_zL3W8TUeA"

headers = {
    "apikey": SUPABASE_ANON_KEY,
    "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=minimal"
}

def clean_value(value):
    """Limpa valor para JSON"""
    if pd.isna(value) or str(value).strip() == '' or str(value).lower() == 'nan':
        return None
    if isinstance(value, (int, float)):
        return value
    return str(value).strip()

def calculate_age(days_birth):
    """Calcula idade em anos a partir de DAYS_BIRTH (negativo)"""
    if pd.isna(days_birth):
        return None
    return int(abs(days_birth) / 365)

def get_age_range(age):
    """Retorna faixa etária"""
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
    """Converte DAYS_XXX para data (dias negativos a partir de hoje)"""
    if pd.isna(days) or days == 0:
        return None
    try:
        from datetime import timedelta
        base_date = datetime(2018, 1, 1)  # Data de referência aproximada
        date = base_date + timedelta(days=int(days))
        return date.strftime('%Y-%m-%d')
    except:
        return None

def import_application_data():
    """Importa application_data.csv (FORMATO ORIGINAL EM INGLÊS)"""
    print("\n📊 Importando application_data.csv...")
    
    df = pd.read_csv('application_data.csv')
    print(f"   Total de registros: {len(df)}")
    
    batch_size = 50
    total_success = 0
    total_errors = 0
    
    for i in range(0, len(df), batch_size):
        batch_df = df.iloc[i:i+batch_size]
        records = []
        
        for _, row in batch_df.iterrows():
            # Calcular idade
            age = calculate_age(row.get('DAYS_BIRTH'))
            age_range = get_age_range(age)
            
            # Mapear colunas do CSV original para estrutura do banco
            record = {
                'id_cliente_atual': int(row['SK_ID_CURR']),
                'alvo_inadimplencia': clean_value(row['TARGET']),
                'tipo_contrato': clean_value(row['NAME_CONTRACT_TYPE']),
                'genero': clean_value(row['CODE_GENDER']),
                'possui_carro': clean_value(row['FLAG_OWN_CAR']),
                'possui_imovel': clean_value(row['FLAG_OWN_REALTY']),
                'qtd_filhos': clean_value(row['CNT_CHILDREN']),
                'renda_total': clean_value(row['AMT_INCOME_TOTAL']),
                'valor_credito': clean_value(row['AMT_CREDIT']),
                'valor_anuidade': clean_value(row['AMT_ANNUITY']),
                'tipo_renda': clean_value(row['NAME_INCOME_TYPE']),
                'escolaridade': clean_value(row['NAME_EDUCATION_TYPE']),
                'estado_civil': clean_value(row['NAME_FAMILY_STATUS']),
                'tipo_moradia': clean_value(row['NAME_HOUSING_TYPE']),
                'idade_anos': age,
                'faixa_etaria': age_range,
                'data_registro': convert_days_to_date(row.get('DAYS_REGISTRATION')),
                'ext_source_1': clean_value(row.get('EXT_SOURCE_1')),
                'ext_source_2': clean_value(row.get('EXT_SOURCE_2')),
                'ext_source_3': clean_value(row.get('EXT_SOURCE_3')),
            }
            records.append(record)
        
        # Enviar batch
        url = f"{SUPABASE_URL}/rest/v1/application_data"
        try:
            response = requests.post(url, headers=headers, json=records)
            if response.status_code in [200, 201]:
                total_success += len(records)
                print(f"   ✅ Lote {i//batch_size + 1}: {total_success}/{len(df)} registros")
            else:
                print(f"   ❌ Erro no lote {i//batch_size + 1}: {response.status_code}")
                print(f"      {response.text[:300]}")
                total_errors += len(records)
        except Exception as e:
            print(f"   ❌ Exceção: {e}")
            total_errors += len(records)
    
    print(f"\n✅ application_data: {total_success} sucesso, {total_errors} erros")
    return total_success

def import_previous_application():
    """Importa previous_application.csv (FORMATO ORIGINAL EM INGLÊS)"""
    print("\n📊 Importando previous_application.csv...")
    
    df = pd.read_csv('previous_application.csv')
    print(f"   Total de registros: {len(df)}")
    
    batch_size = 50
    total_success = 0
    total_errors = 0
    
    for i in range(0, len(df), batch_size):
        batch_df = df.iloc[i:i+batch_size]
        records = []
        
        for _, row in batch_df.iterrows():
            record = {
                'id_cliente_anterior': int(row['SK_ID_PREV']),
                'id_cliente_atual': int(row['SK_ID_CURR']),
                'tipo_contrato': clean_value(row['NAME_CONTRACT_TYPE']),
                'valor_solicitado': clean_value(row['AMT_APPLICATION']),
                'valor_credito': clean_value(row['AMT_CREDIT']),
                'valor_anuidade': clean_value(row.get('AMT_ANNUITY')),
                'status_contrato': clean_value(row.get('NAME_CONTRACT_STATUS')),
                'data_decisao': convert_days_to_date(row.get('DAYS_DECISION')),
                'tipo_pagamento': clean_value(row.get('NAME_PAYMENT_TYPE')),
                'motivo_rejeicao': clean_value(row.get('CODE_REJECT_REASON')),
                'canal_venda': clean_value(row.get('NAME_SELLER_INDUSTRY')),
                'tipo_cliente': clean_value(row.get('NAME_CLIENT_TYPE')),
            }
            records.append(record)
        
        # Enviar batch
        url = f"{SUPABASE_URL}/rest/v1/previous_application"
        try:
            response = requests.post(url, headers=headers, json=records)
            if response.status_code in [200, 201]:
                total_success += len(records)
                print(f"   ✅ Lote {i//batch_size + 1}: {total_success}/{len(df)} registros")
            else:
                print(f"   ❌ Erro no lote {i//batch_size + 1}: {response.status_code}")
                print(f"      {response.text[:300]}")
                total_errors += len(records)
        except Exception as e:
            print(f"   ❌ Exceção: {e}")
            total_errors += len(records)
    
    print(f"\n✅ previous_application: {total_success} sucesso, {total_errors} erros")
    return total_success

def verify_data():
    """Verifica dados importados"""
    print("\n🔍 Verificando dados...")
    
    url = f"{SUPABASE_URL}/rest/v1/application_data?select=count"
    headers_count = {**headers, "Prefer": "count=exact"}
    
    response = requests.get(url, headers=headers_count)
    if response.status_code == 200:
        count = response.headers.get('Content-Range', '0').split('/')[-1]
        print(f"   application_data: {count} registros")
    
    url = f"{SUPABASE_URL}/rest/v1/previous_application?select=count"
    response = requests.get(url, headers=headers_count)
    if response.status_code == 200:
        count = response.headers.get('Content-Range', '0').split('/')[-1]
        print(f"   previous_application: {count} registros")

if __name__ == '__main__':
    print("🚀 Importando dados COMPLETOS dos CSVs originais")
    print("=" * 60)
    
    try:
        app_total = import_application_data()
        prev_total = import_previous_application()
        verify_data()
        
        print("\n" + "=" * 60)
        print("✅ Importação concluída!")
        print(f"   Total: {app_total} aplicações + {prev_total} históricos")
        
    except Exception as e:
        print(f"\n❌ Erro: {e}")
        import traceback
        traceback.print_exc()
