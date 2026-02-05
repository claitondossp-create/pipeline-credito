"""
Divide CSVs grandes em partes menores (< 500MB cada)
Para importação via interface do Supabase
"""

import pandas as pd
import os

def split_csv_file(input_file, output_prefix, max_rows_per_file=50000):
    """Divide CSV em múltiplos arquivos menores"""
    print(f"\nProcessando: {input_file}")
    
    # Ler CSV
    df = pd.read_csv(input_file)
    total_rows = len(df)
    print(f"Total de registros: {total_rows:,}")
    
    # Calcular número de arquivos necessários
    num_files = (total_rows + max_rows_per_file - 1) // max_rows_per_file
    print(f"Sera dividido em {num_files} arquivos\n")
    
    # Dividir e salvar
    for i in range(num_files):
        start_idx = i * max_rows_per_file
        end_idx = min((i + 1) * max_rows_per_file, total_rows)
        
        chunk_df = df.iloc[start_idx:end_idx]
        output_file = f"scripts/{output_prefix}_parte_{i+1:02d}_de_{num_files:02d}.csv"
        
        chunk_df.to_csv(output_file, index=False, encoding='utf-8')
        file_size = os.path.getsize(output_file) / (1024 * 1024)
        
        print(f"OK {output_file}")
        print(f"   Registros: {len(chunk_df):,} (linha {start_idx+1} a {end_idx})")
        print(f"   Tamanho: {file_size:.2f} MB\n")
    
    return num_files

print("="*60)
print("DIVIDINDO CSVs EM PARTES MENORES")
print("="*60)

# Dividir application_data
num_app = split_csv_file(
    'scripts/application_data_formatted.csv',
    'application_data',
    max_rows_per_file=50000  # ~50-100MB por arquivo
)

# Dividir previous_application  
num_prev = split_csv_file(
    'scripts/previous_application_formatted.csv',
    'previous_application',
    max_rows_per_file=50000
)

print("="*60)
print("PRONTO! Como importar:")
print("="*60)
print(f"\n1. application_data: {num_app} arquivos")
print("   - Importe cada arquivo na MESMA tabela 'application_data'")
print("   - Ordem: parte_01, parte_02, parte_03...")
print(f"\n2. previous_application: {num_prev} arquivos")
print("   - Importe cada arquivo na MESMA tabela 'previous_application'")
print("   - Ordem: parte_01, parte_02, parte_03...")
print("\nTodos os arquivos estao em: scripts/")
print("\nIMPORTANTE: Nao delete entre importacoes!")
print("Os dados sao CUMULATIVOS (vao sendo adicionados)")
