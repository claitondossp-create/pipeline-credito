"""
Script para importar dados dos CSVs para o Supabase
Processa application_data_ptbr.csv e previous_application_ptbr.csv
"""

import pandas as pd
import os
from datetime import datetime
from supabase import create_client, Client

# Configuração do Supabase
SUPABASE_URL = "https://tmmlkfqedqsvgxxjcgxl.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtbWxrZnFlZHFzdmd4eGpjZ3hsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyMzQ0MDUsImV4cCI6MjA4NTgxMDQwNX0.NSR4weo4ehhLNNwkq8qJhj2a6Uo2Enc9C_zL3W8TUeA"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def convert_date_br_to_iso(date_str):
    """Converte data DD/MM/YYYY para YYYY-MM-DD"""
    if pd.isna(date_str) or date_str == '':
        return None
    try:
        dt = datetime.strptime(str(date_str), '%d/%m/%Y')
        return dt.strftime('%Y-%m-%d')
    except:
        return None

def clean_numeric(value):
    """Limpa valores numéricos, convertendo NaN para None"""
    if pd.isna(value):
        return None
    try:
        return float(value)
    except:
        return None

def import_application_data():
    """Importa dados de application_data_ptbr.csv"""
    print("📊 Importando application_data...")
    
    # Ler CSV
    df = pd.read_csv('application_data_ptbr.csv')
    print(f"   Lidos {len(df)} registros do CSV")
    
    # Selecionar e mapear colunas relevantes
    records = []
    for _, row in df.iterrows():
        record = {
            'id_cliente_atual': int(row['ID_CLIENTE_ATUAL']),
            'alvo_inadimplencia': int(row['ALVO_INADIMPLENCIA']) if not pd.isna(row['ALVO_INADIMPLENCIA']) else None,
            'tipo_contrato': str(row['TIPO_CONTRATO']) if not pd.isna(row['TIPO_CONTRATO']) else None,
            'genero': str(row['GENERO']) if not pd.isna(row['GENERO']) else None,
            'possui_carro': str(row['POSSUI_CARRO']) if not pd.isna(row['POSSUI_CARRO']) else None,
            'possui_imovel': str(row['POSSUI_IMOVEL']) if not pd.isna(row['POSSUI_IMOVEL']) else None,
            'qtd_filhos': int(row['QTD_FILHOS']) if not pd.isna(row['QTD_FILHOS']) else None,
            'renda_total': clean_numeric(row['RENDA_TOTAL']),
            'valor_credito': clean_numeric(row['VALOR_CREDITO']),
            'valor_anuidade': clean_numeric(row['VALOR_ANUIDADE']),
            'tipo_renda': str(row['TIPO_RENDA']) if not pd.isna(row['TIPO_RENDA']) else None,
            'escolaridade': str(row['ESCOLARIDADE']) if not pd.isna(row['ESCOLARIDADE']) else None,
            'estado_civil': str(row['ESTADO_CIVIL']) if not pd.isna(row['ESTADO_CIVIL']) else None,
            'tipo_moradia': str(row['TIPO_MORADIA']) if not pd.isna(row['TIPO_MORADIA']) else None,
            'idade_anos': int(row['IDADE_ANOS']) if not pd.isna(row['IDADE_ANOS']) else None,
            'faixa_etaria': str(row['FAIXA_ETARIA']) if not pd.isna(row['FAIXA_ETARIA']) else None,
            'data_registro': convert_date_br_to_iso(row['DATA_REGISTRO_PTBR']),
            'ext_source_1': clean_numeric(row['EXT_SOURCE_1']),
            'ext_source_2': clean_numeric(row['EXT_SOURCE_2']),
            'ext_source_3': clean_numeric(row['EXT_SOURCE_3']),
        }
        records.append(record)
    
    # Inserir em lotes de 100
    batch_size = 100
    total_inserted = 0
    
    for i in range(0, len(records), batch_size):
        batch = records[i:i+batch_size]
        try:
            result = supabase.table('application_data').insert(batch).execute()
            total_inserted += len(batch)
            print(f"   ✅ Inseridos {total_inserted}/{len(records)} registros")
        except Exception as e:
            print(f"   ❌ Erro ao inserir lote: {e}")
            # Tentar inserir individualmente para identificar problema
            for record in batch:
                try:
                    supabase.table('application_data').insert(record).execute()
                    total_inserted += 1
                except Exception as e2:
                    print(f"   ⚠️  Erro no registro {record['id_cliente_atual']}: {e2}")
    
    print(f"✅ application_data importado: {total_inserted} registros")
    return total_inserted

def import_previous_application():
    """Importa dados de previous_application_ptbr.csv"""
    print("\n📊 Importando previous_application...")
    
    # Ler CSV
    df = pd.read_csv('previous_application_ptbr.csv')
    print(f"   Lidos {len(df)} registros do CSV")
    
    # Selecionar e mapear colunas relevantes
    records = []
    for _, row in df.iterrows():
        record = {
            'id_cliente_anterior': int(row['ID_CLIENTE_ANTERIOR']),
            'id_cliente_atual': int(row['ID_CLIENTE_ATUAL']),
            'tipo_contrato': str(row['TIPO_CONTRATO']) if not pd.isna(row['TIPO_CONTRATO']) else None,
            'valor_solicitado': clean_numeric(row['VALOR_SOLICITADO']),
            'valor_credito': clean_numeric(row['VALOR_CREDITO']),
            'valor_anuidade': clean_numeric(row['VALOR_ANUIDADE']),
            'status_contrato': str(row['STATUS_CONTRATO']) if not pd.isna(row['STATUS_CONTRATO']) else None,
            'data_decisao': convert_date_br_to_iso(row['DATA_DECISAO_PTBR']),
            'tipo_pagamento': str(row['TIPO_PAGAMENTO']) if not pd.isna(row['TIPO_PAGAMENTO']) else None,
            'motivo_rejeicao': str(row['MOTIVO_REJEICAO']) if not pd.isna(row['MOTIVO_REJEICAO']) else None,
            'canal_venda': str(row['CANAL_VENDA']) if not pd.isna(row['CANAL_VENDA']) else None,
            'tipo_cliente': str(row['TIPO_CLIENTE']) if not pd.isna(row['TIPO_CLIENTE']) else None,
        }
        records.append(record)
    
    # Inserir em lotes de 100
    batch_size = 100
    total_inserted = 0
    
    for i in range(0, len(records), batch_size):
        batch = records[i:i+batch_size]
        try:
            result = supabase.table('previous_application').insert(batch).execute()
            total_inserted += len(batch)
            print(f"   ✅ Inseridos {total_inserted}/{len(records)} registros")
        except Exception as e:
            print(f"   ❌ Erro ao inserir lote: {e}")
            # Tentar inserir individualmente
            for record in batch:
                try:
                    supabase.table('previous_application').insert(record).execute()
                    total_inserted += 1
                except Exception as e2:
                    print(f"   ⚠️  Erro no registro {record['id_cliente_anterior']}: {e2}")
    
    print(f"✅ previous_application importado: {total_inserted} registros")
    return total_inserted

def verify_import():
    """Verifica os dados importados"""
    print("\n🔍 Verificando dados importados...")
    
    # Verificar application_data
    app_count = supabase.table('application_data').select('id', count='exact').execute()
    print(f"   application_data: {len(app_count.data)} registros")
    
    # Verificar previous_application
    prev_count = supabase.table('previous_application').select('id', count='exact').execute()
    print(f"   previous_application: {len(prev_count.data)} registros")
    
    # Estatísticas rápidas
    print("\n📈 Estatísticas:")
    
    # Por tipo de contrato
    tipos = supabase.table('application_data').select('tipo_contrato').execute()
    tipos_count = {}
    for item in tipos.data:
        tipo = item['tipo_contrato']
        tipos_count[tipo] = tipos_count.get(tipo, 0) + 1
    print(f"   Tipos de contrato: {tipos_count}")
    
    # Por gênero
    generos = supabase.table('application_data').select('genero').execute()
    generos_count = {}
    for item in generos.data:
        genero = item['genero']
        generos_count[genero] = generos_count.get(genero, 0) + 1
    print(f"   Por gênero: {generos_count}")

if __name__ == '__main__':
    print("🚀 Iniciando importação de dados para Supabase\n")
    print("=" * 60)
    
    try:
        # Importar application_data
        app_total = import_application_data()
        
        # Importar previous_application
        prev_total = import_previous_application()
        
        # Verificar
        verify_import()
        
        print("\n" + "=" * 60)
        print("✅ Importação concluída com sucesso!")
        print(f"   Total: {app_total} aplicações + {prev_total} históricos")
        
    except Exception as e:
        print(f"\n❌ Erro durante importação: {e}")
        import traceback
        traceback.print_exc()
