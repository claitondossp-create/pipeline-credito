"""
Divide previous_application em partes < 100MB
"""
import pandas as pd
import os

print("Dividindo previous_application_formatted.csv em partes menores...\n")

# Ler arquivo
df = pd.read_csv('scripts/previous_application_formatted.csv')
print(f"Total de registros: {len(df):,}")

# Dividir em partes de 200k registros (~40-50MB cada)
chunk_size = 200000
num_chunks = (len(df) + chunk_size - 1) // chunk_size

print(f"Dividindo em {num_chunks} partes\n")

for i in range(num_chunks):
    start = i * chunk_size
    end = min((i + 1) * chunk_size, len(df))
    
    chunk = df.iloc[start:end]
    filename = f'scripts/previous_application_parte{i+1:02d}.csv'
    
    chunk.to_csv(filename, index=False, encoding='utf-8')
    size_mb = os.path.getsize(filename) / (1024 * 1024)
    
    print(f"OK {filename}")
    print(f"   Registros: {len(chunk):,}")
    print(f"   Tamanho: {size_mb:.1f} MB\n")

print("="*60)
print(f"PRONTO! {num_chunks} arquivos criados em scripts/")
print("\nComo importar:")
print("1. Abra: https://supabase.com/dashboard/project/tmmlkfqedqsvgxxjcgxl/editor/29414")
print("2. Insert → Import CSV")
print("3. Importe previous_application_parte01.csv")
print("4. Repita para parte02, parte03, etc.")
print("\nIMPORTANTE: Os dados sao CUMULATIVOS!")
print("Nao delete entre as importacoes - eles vao se somando.")
