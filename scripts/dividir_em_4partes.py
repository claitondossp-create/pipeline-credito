"""
Divide previous_application em APENAS 4 PARTES (~43MB cada)
"""
import pandas as pd
import os

print("Dividindo previous_application em 4 partes otimizadas\n")

# Ler arquivo
df = pd.read_csv('scripts/previous_application_formatted.csv')
total = len(df)
print(f"Total: {total:,} registros")
print(f"Tamanho original: 173.65 MB\n")

# Dividir em 4 partes iguais
num_partes = 4
registros_por_parte = total // num_partes

for i in range(num_partes):
    # Calcular índices
    start = i * registros_por_parte
    if i == num_partes - 1:  # Última parte leva o resto
        end = total
    else:
        end = (i + 1) * registros_por_parte
    
    # Criar chunk
    chunk = df.iloc[start:end]
    filename = f'scripts/previous_application_PARTE{i+1}.csv'
    
    # Salvar
    chunk.to_csv(filename, index=False, encoding='utf-8')
    size_mb = os.path.getsize(filename) / (1024 * 1024)
    
    print(f"OK {filename}")
    print(f"  Registros: {len(chunk):,}")
    print(f"  Tamanho: {size_mb:.1f} MB")
    print()

print("="*60)
print("PRONTO! 4 arquivos criados")
print("\nImportar na ordem:")
print("1. previous_application_PARTE1.csv")
print("2. previous_application_PARTE2.csv") 
print("3. previous_application_PARTE3.csv")
print("4. previous_application_PARTE4.csv")
print("\nTodos vao para a MESMA tabela 'previous_application'")
print("Os dados sao CUMULATIVOS!")
