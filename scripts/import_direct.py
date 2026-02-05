"""
Importa TODOS os dados diretamente para o Supabase via requests
Não precisa de biblioteca supabase-py
"""

import pandas as pd
import requests
import json
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

def convert_date_br_to_iso(date_str):
    """Converte DD/MM/YYYY para YYYY-MM-DD"""
    if pd.isna(date_str) or str(date_str).strip() == '':
        return None
    try:
        dt = datetime.strptime(str(date_str).strip(), '%d/%m/%Y')
        return dt.strftime('%Y-%m-%d')
    except:
        print(f"⚠️  Data inválida: {date_str}")
        return None

def clean_value(value):
    """Limpa valor para JSON"""
    if pd.isna(value) or str(value).strip() == '' or str(value).lower() == 'nan':
        return None
    if isinstance(value, (int, float)):
        return value
    return str(value).strip()

def import_application_data():
    """Importa application_data"""
    print("\n📊 Importando application_data...")
    
    df = pd.read_csv('application_data_ptbr.csv')
    print(f"   Total de registros: {len(df)}")
    
    batch_size = 10  # Supabase tem limite de ~1000 por request
    total_success = 0
    total_errors = 0
    
    for i in range(0, len(df), batch_size):
        batch_df = df.iloc[i:i+batch_size]
        records = []
        
        for _, row in batch_df.iterrows():
            record = {
                'id_cliente_atual': int(row['ID_CLIENTE_ATUAL']),
                'alvo_inadimplencia': clean_value(row['ALVO_INADIMPLENCIA']),
                'tipo_contrato': clean_value(row['TIPO_CONTRATO']),
                'genero': clean_value(row['GENERO']),
                'possui_carro': clean_value(row['POSSUI_CARRO']),
                'possui_imovel': clean_value(row['POSSUI_IMOVEL']),
                'qtd_filhos': clean_value(row['QTD_FILHOS']),
                'renda_total': clean_value(row['RENDA_TOTAL']),
                'valor_credito': clean_value(row['VALOR_CREDITO']),
                'valor_anuidade': clean_value(row['VALOR_ANUIDADE']),
                'tipo_renda': clean_value(row['TIPO_RENDA']),
                'escolaridade': clean_value(row['ESCOLARIDADE']),
                'estado_civil': clean_value(row['ESTADO_CIVIL']),
                'tipo_moradia': clean_value(row['TIPO_MORADIA']),
                'idade_anos': clean_value(row['IDADE_ANOS']),
                'faixa_etaria': clean_value(row['FAIXA_ETARIA']),
                'data_registro': convert_date_br_to_iso(row['DATA_REGISTRO_PTBR']),
                'ext_source_1': clean_value(row['EXT_SOURCE_1']),
                'ext_source_2': clean_value(row['EXT_SOURCE_2']),
                'ext_source_3': clean_value(row['EXT_SOURCE_3']),
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
                print(f"      {response.text[:200]}")
                total_errors += len(records)
        except Exception as e:
            print(f"   ❌ Exceção: {e}")
            total_errors += len(records)
    
    print(f"\n✅ application_data: {total_success} sucesso, {total_errors} erros")
    return total_success

def import_previous_application():
    """Importa previous_application"""
    print("\n📊 Importando previous_application...")
    
    df = pd.read_csv('previous_application_ptbr.csv')
    print(f"   Total de registros: {len(df)}")
    
    batch_size = 10
    total_success = 0
    total_errors = 0
    
    for i in range(0, len(df), batch_size):
        batch_df = df.iloc[i:i+batch_size]
        records = []
        
        for _, row in batch_df.iterrows():
            record = {
                'id_cliente_anterior': int(row['ID_CLIENTE_ANTERIOR']),
                'id_cliente_atual': int(row['ID_CLIENTE_ATUAL']),
                'tipo_contrato': clean_value(row['TIPO_CONTRATO']),
                'valor_solicitado': clean_value(row['VALOR_SOLICITADO']),
                'valor_credito': clean_value(row['VALOR_CREDITO']),
                'valor_anuidade': clean_value(row['VALOR_ANUIDADE']),
                'status_contrato': clean_value(row['STATUS_CONTRATO']),
                'data_decisao': convert_date_br_to_iso(row['DATA_DECISAO_PTBR']),
                'tipo_pagamento': clean_value(row['TIPO_PAGAMENTO']),
                'motivo_rejeicao': clean_value(row['MOTIVO_REJEICAO']),
                'canal_venda': clean_value(row['CANAL_VENDA']),
                'tipo_cliente': clean_value(row['TIPO_CLIENTE']),
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
                print(f"      {response.text[:200]}")
                total_errors += len(records)
        except Exception as e:
            print(f"   ❌ Exceção: {e}")
            total_errors += len(records)
    
    print(f"\n✅ previous_application: {total_success} sucesso, {total_errors} erros")
    return total_success

def verify_data():
    """Verifica dados importados"""
    print("\n🔍 Verificando dados...")
    
    # Count application_data
    url = f"{SUPABASE_URL}/rest/v1/application_data?select=count"
    headers_count = {**headers, "Prefer": "count=exact"}
    
    response = requests.get(url, headers=headers_count)
    if response.status_code == 200:
        count = response.headers.get('Content-Range', '0').split('/')[-1]
        print(f"   application_data: {count} registros")
    
    # Count previous_application
    url = f"{SUPABASE_URL}/rest/v1/previous_application?select=count"
    response = requests.get(url, headers=headers_count)
    if response.status_code == 200:
        count = response.headers.get('Content-Range', '0').split('/')[-1]
        print(f"   previous_application: {count} registros")

if __name__ == '__main__':
    print("🚀 Iniciando importação COMPLETA para Supabase")
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
