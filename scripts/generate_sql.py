"""
Script alternativo: Gera SQL INSERT statements a partir dos CSVs
"""
import pandas as pd
from datetime import datetime

def convert_date_br_to_iso(date_str):
    """Converte data DD/MM/YYYY para YYYY-MM-DD"""
    if pd.isna(date_str) or date_str == '':
        return None
    try:
        dt = datetime.strptime(str(date_str), '%d/%m/%Y')
        return dt.strftime('%Y-%m-%d')
    except:
        return None

def safe_sql_value(value):
    """Converte valor Python para valor SQL seguro"""
    if pd.isna(value) or value == '' or value == 'nan':
        return 'NULL'
    if isinstance(value, str):
        # Escapar aspas simples
        value = value.replace("'", "''")
        return f"'{value}'"
    if isinstance(value, (int, float)):
        return str(value)
    return 'NULL'

def generate_application_data_sql():
    """Gera SQL INSERTs para application_data"""
    print("Gerando SQL para application_data...")
    
    df = pd.read_csv('application_data_ptbr.csv')
    
    sql_statements = []
    sql_statements.append("-- Importação de application_data")
    sql_statements.append("BEGIN;")
    
    for idx, row in df.iterrows():
        id_cliente = int(row['ID_CLIENTE_ATUAL'])
        alvo = safe_sql_value(row['ALVO_INADIMPLENCIA'])
        tipo_contrato = safe_sql_value(row['TIPO_CONTRATO'])
        genero = safe_sql_value(row['GENERO'])
        possui_carro = safe_sql_value(row['POSSUI_CARRO'])
        possui_imovel = safe_sql_value(row['POSSUI_IMOVEL'])
        qtd_filhos = safe_sql_value(row['QTD_FILHOS'])
        renda_total = safe_sql_value(row['RENDA_TOTAL'])
        valor_credito = safe_sql_value(row['VALOR_CREDITO'])
        valor_anuidade = safe_sql_value(row['VALOR_ANUIDADE'])
        tipo_renda = safe_sql_value(row['TIPO_RENDA'])
        escolaridade = safe_sql_value(row['ESCOLARIDADE'])
        estado_civil = safe_sql_value(row['ESTADO_CIVIL'])
        tipo_moradia = safe_sql_value(row['TIPO_MORADIA'])
        idade_anos = safe_sql_value(row['IDADE_ANOS'])
        faixa_etaria = safe_sql_value(row['FAIXA_ETARIA'])
        
        data_registro = convert_date_br_to_iso(row['DATA_REGISTRO_PTBR'])
        data_registro_sql = f"'{data_registro}'" if data_registro else 'NULL'
        
        ext1 = safe_sql_value(row['EXT_SOURCE_1'])
        ext2 = safe_sql_value(row['EXT_SOURCE_2'])
        ext3 = safe_sql_value(row['EXT_SOURCE_3'])
        
        insert_sql = f"""INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  {id_cliente}, {alvo}, {tipo_contrato}, {genero}, {possui_carro},
  {possui_imovel}, {qtd_filhos}, {renda_total}, {valor_credito}, {valor_anuidade},
  {tipo_renda}, {escolaridade}, {estado_civil}, {tipo_moradia}, {idade_anos},
  {faixa_etaria}, {data_registro_sql}, {ext1}, {ext2}, {ext3}
) ON CONFLICT (id_cliente_atual) DO NOTHING;"""
        
        sql_statements.append(insert_sql)
        
        if (idx + 1) % 10 == 0:
            print(f"  Processados {idx + 1}/{len(df)} registros")
    
    sql_statements.append("COMMIT;")
    
    with open('import_application_data.sql', 'w', encoding='utf-8') as f:
        f.write('\n'.join(sql_statements))
    
    print(f"✅ Gerado import_application_data.sql com {len(df)} registros")
    return len(df)

def generate_previous_application_sql():
    """Gera SQL INSERTs para previous_application"""
    print("\nGerando SQL para previous_application...")
    
    df = pd.read_csv('previous_application_ptbr.csv')
    
    sql_statements = []
    sql_statements.append("-- Importação de previous_application")
    sql_statements.append("BEGIN;")
    
    for idx, row in df.iterrows():
        id_anterior = int(row['ID_CLIENTE_ANTERIOR'])
        id_atual = int(row['ID_CLIENTE_ATUAL'])
        tipo_contrato = safe_sql_value(row['TIPO_CONTRATO'])
        valor_solicitado = safe_sql_value(row['VALOR_SOLICITADO'])
        valor_credito = safe_sql_value(row['VALOR_CREDITO'])
        valor_anuidade = safe_sql_value(row['VALOR_ANUIDADE'])
        status = safe_sql_value(row['STATUS_CONTRATO'])
        
        data_decisao = convert_date_br_to_iso(row['DATA_DECISAO_PTBR'])
        data_decisao_sql = f"'{data_decisao}'" if data_decisao else 'NULL'
        
        tipo_pagamento =  safe_sql_value(row['TIPO_PAGAMENTO'])
        motivo_rejeicao = safe_sql_value(row['MOTIVO_REJEICAO'])
        canal_venda = safe_sql_value(row['CANAL_VENDA'])
        tipo_cliente = safe_sql_value(row['TIPO_CLIENTE'])
        
        insert_sql = f"""INSERT INTO previous_application (
  id_cliente_anterior, id_cliente_atual, tipo_contrato, valor_solicitado,
  valor_credito, valor_anuidade, status_contrato, data_decisao,
  tipo_pagamento, motivo_rejeicao, canal_venda, tipo_cliente
) VALUES (
  {id_anterior}, {id_atual}, {tipo_contrato}, {valor_solicitado},
  {valor_credito}, {valor_anuidade}, {status}, {data_decisao_sql},
  {tipo_pagamento}, {motivo_rejeicao}, {canal_venda}, {tipo_cliente}
);"""
        
        sql_statements.append(insert_sql)
        
        if (idx + 1) % 10 == 0:
            print(f"  Processados {idx + 1}/{len(df)} registros")
    
    sql_statements.append("COMMIT;")
    
    with open('import_previous_application.sql', 'w', encoding='utf-8') as f:
        f.write('\n'.join(sql_statements))
    
    print(f"✅ Gerado import_previous_application.sql com {len(df)} registros")
    return len(df)

if __name__ == '__main__':
    print("🚀 Gerando arquivos SQL para importação\n")
    print("=" * 60)
    
    try:
        app_count = generate_application_data_sql()
        prev_count = generate_previous_application_sql()
        
        print("\n" + "=" * 60)
        print("✅ Arquivos SQL gerados com sucesso!")
        print(f"\nPróximos passos:")
        print(f"1. Abra o Supabase SQL Editor")
        print(f"2. Execute o arquivo: import_application_data.sql ({app_count} registros)")
        print(f"3. Execute o arquivo: import_previous_application.sql ({prev_count} registros)")
        
    except Exception as e:
        print(f"\n❌ Erro: {e}")
        import traceback
        traceback.print_exc()
