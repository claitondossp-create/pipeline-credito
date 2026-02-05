-- Importação de application_data
BEGIN;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100002, 1, 'CASH LOANS', 'M', 'N',
  'Y', 0, 202500.0, 406597.5, 24700.5,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'SINGLE / NOT MARRIED', 'HOUSE / APARTMENT', 25,
  '<25', '2016-02-09', 0.0830369673913225, 0.2629485927471776, 0.1393757800997895
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100003, 0, 'CASH LOANS', 'F', 'N',
  'N', 0, 270000.0, 1293502.5, 35698.5,
  'STATE SERVANT', 'HIGHER EDUCATION', 'MARRIED', 'HOUSE / APARTMENT', 45,
  '35-45', '2022-11-06', 0.3112673113812225, 0.6222457752555098, NULL
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100004, 0, 'REVOLVING LOANS', 'M', 'Y',
  'Y', 0, 67500.0, 135000.0, 6750.0,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'SINGLE / NOT MARRIED', 'HOUSE / APARTMENT', 52,
  '45-60', '2014-06-07', NULL, 0.5559120833904428, 0.7295666907060153
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100006, 0, 'CASH LOANS', 'F', 'N',
  'Y', 0, 135000.0, 312682.5, 29686.5,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'CIVIL MARRIAGE', 'HOUSE / APARTMENT', 52,
  '45-60', '1999-03-05', NULL, 0.6504416904014653, NULL
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100007, 0, 'CASH LOANS', 'M', 'N',
  'Y', 0, 121500.0, 513000.0, 21865.5,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'SINGLE / NOT MARRIED', 'HOUSE / APARTMENT', 54,
  '45-60', '2014-04-17', NULL, 0.3227382869704046, NULL
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100008, 0, 'CASH LOANS', 'M', 'N',
  'Y', 0, 99000.0, 490495.5, 27517.5,
  'STATE SERVANT', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 46,
  '45-60', '2012-06-27', NULL, 0.3542247319929012, 0.6212263380626669
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100009, 0, 'CASH LOANS', 'F', 'Y',
  'Y', 1, 171000.0, 1560726.0, 41301.0,
  'COMMERCIAL ASSOCIATE', 'HIGHER EDUCATION', 'MARRIED', 'HOUSE / APARTMENT', 37,
  '35-45', '2022-10-10', 0.7747614130547695, 0.7239998516953141, 0.4920600938649263
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100010, 0, 'CASH LOANS', 'M', 'Y',
  'Y', 0, 360000.0, 1530000.0, 42075.0,
  'STATE SERVANT', 'HIGHER EDUCATION', 'MARRIED', 'HOUSE / APARTMENT', 51,
  '45-60', '2013-07-05', NULL, 0.7142792864482229, 0.5406544504453575
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100011, 0, 'CASH LOANS', 'F', 'N',
  'Y', 0, 112500.0, 1019610.0, 33826.5,
  'PENSIONER', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 55,
  '45-60', '2005-10-05', 0.5873340468730377, 0.2057472880073281, 0.7517237147741489
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100012, 0, 'REVOLVING LOANS', 'M', 'N',
  'Y', 0, 135000.0, 405000.0, 20250.0,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'SINGLE / NOT MARRIED', 'HOUSE / APARTMENT', 39,
  '35-45', '1986-07-27', NULL, 0.7466436294590924, NULL
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100014, 0, 'CASH LOANS', 'F', 'N',
  'Y', 1, 112500.0, 652500.0, 21177.0,
  'WORKING', 'HIGHER EDUCATION', 'MARRIED', 'HOUSE / APARTMENT', 27,
  '25-35', '2013-12-22', 0.3197601716755032, 0.6518623334244781, 0.363945238612397
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100015, 0, 'CASH LOANS', 'F', 'N',
  'Y', 0, 38419.155, 148365.0, 10678.5,
  'PENSIONER', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 55,
  '45-60', '2011-09-25', 0.7220444501416448, 0.5551831615131809, 0.6528965519806539
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100016, 0, 'CASH LOANS', 'F', 'N',
  'Y', 0, 67500.0, 80865.0, 5881.5,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 36,
  '35-45', '2025-03-30', 0.4648311169632833, 0.7150418188660659, 0.1766525794312139
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100017, 0, 'CASH LOANS', 'M', 'Y',
  'N', 1, 225000.0, 918468.0, 28966.5,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 38,
  '35-45', '2024-05-02', NULL, 0.5669066132460429, 0.7700870700124128
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100018, 0, 'CASH LOANS', 'F', 'N',
  'Y', 0, 189000.0, 773680.5, 32778.0,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 39,
  '35-45', '2024-05-30', 0.7219397686622343, 0.6426562048311103, NULL
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100019, 0, 'CASH LOANS', 'M', 'Y',
  'Y', 0, 157500.0, 299772.0, 20160.0,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'SINGLE / NOT MARRIED', 'RENTED APARTMENT', 23,
  '<25', '2016-07-12', 0.1156343372622997, 0.34663398139668, 0.6785676886853644
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100020, 0, 'CASH LOANS', 'M', 'N',
  'N', 0, 108000.0, 509602.5, 26149.5,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 35,
  '25-35', '2008-08-05', NULL, 0.2363778398884225, 0.0621030378372968
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100021, 0, 'REVOLVING LOANS', 'F', 'N',
  'Y', 1, 81000.0, 270000.0, 13500.0,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 26,
  '25-35', '2014-10-02', NULL, 0.6835133461914255, NULL
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100022, 0, 'REVOLVING LOANS', 'F', 'N',
  'Y', 0, 112500.0, 157500.0, 7875.0,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'WIDOW', 'HOUSE / APARTMENT', 48,
  '45-60', '2002-02-19', NULL, 0.7064284028871654, 0.5567274263630174
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100023, 0, 'CASH LOANS', 'F', 'N',
  'Y', 1, 90000.0, 544491.0, 17563.5,
  'STATE SERVANT', 'HIGHER EDUCATION', 'SINGLE / NOT MARRIED', 'HOUSE / APARTMENT', 31,
  '25-35', '2023-04-20', NULL, 0.5866171400119664, 0.4776491548517548
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100024, 0, 'REVOLVING LOANS', 'M', 'Y',
  'Y', 0, 135000.0, 427500.0, 21375.0,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 50,
  '45-60', '2025-04-12', 0.5656548824667073, 0.113374512719927, NULL
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100025, 0, 'CASH LOANS', 'F', 'Y',
  'Y', 1, 202500.0, 1132573.5, 37561.5,
  'COMMERCIAL ASSOCIATE', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 40,
  '35-45', '2019-10-20', 0.4377090198475417, 0.2337669575081463, 0.5424451438613613
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100026, 0, 'CASH LOANS', 'F', 'N',
  'N', 1, 450000.0, 497520.0, 32521.5,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'RENTED APARTMENT', 30,
  '25-35', '2025-10-13', NULL, 0.457142971588935, 0.3589512285783967
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100027, 0, 'CASH LOANS', 'F', 'N',
  'Y', 0, 83250.0, 239850.0, 23850.0,
  'PENSIONER', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 68,
  '60+', '2001-06-03', NULL, 0.6243047373592765, 0.6690566947824041
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100029, 0, 'CASH LOANS', 'M', 'Y',
  'N', 2, 135000.0, 247500.0, 12703.5,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 30,
  '25-35', '2025-10-19', NULL, 0.7861793090532118, 0.5656079814115492
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100030, 0, 'CASH LOANS', 'F', 'N',
  'Y', 0, 90000.0, 225000.0, 11074.5,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 52,
  '45-60', '2019-06-22', 0.5619484093041138, 0.6514056365297631, 0.4614823912998385
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100031, 1, 'CASH LOANS', 'F', 'N',
  'Y', 0, 112500.0, 979992.0, 27076.5,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'WIDOW', 'HOUSE / APARTMENT', 51,
  '45-60', '2008-02-06', NULL, 0.5484771599678789, 0.190705947811054
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100032, 0, 'CASH LOANS', 'M', 'N',
  'Y', 1, 112500.0, 327024.0, 23827.5,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 43,
  '35-45', '2010-04-07', NULL, 0.5411237022695412, 0.6594055320683344
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100033, 0, 'CASH LOANS', 'M', 'Y',
  'Y', 0, 270000.0, 790830.0, 57676.5,
  'STATE SERVANT', 'HIGHER EDUCATION', 'SINGLE / NOT MARRIED', 'HOUSE / APARTMENT', 27,
  '25-35', '2013-04-25', 0.6003959050009468, 0.6850109901296888, 0.524496446363472
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100034, 0, 'REVOLVING LOANS', 'M', 'N',
  'Y', 0, 90000.0, 180000.0, 9000.0,
  'WORKING', 'HIGHER EDUCATION', 'SINGLE / NOT MARRIED', 'WITH PARENTS', 28,
  '25-35', '2012-12-15', 0.2979135090150507, 0.5027790378786304, NULL
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100035, 0, 'CASH LOANS', 'F', 'N',
  'Y', 0, 292500.0, 665892.0, 24592.5,
  'COMMERCIAL ASSOCIATE', 'SECONDARY / SECONDARY SPECIAL', 'CIVIL MARRIAGE', 'HOUSE / APARTMENT', 41,
  '35-45', '2011-09-05', NULL, 0.479987342189869, 0.4101025731788671
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100036, 0, 'CASH LOANS', 'F', 'N',
  'Y', 0, 112500.0, 512064.0, 25033.5,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'CIVIL MARRIAGE', 'HOUSE / APARTMENT', 30,
  '25-35', '2004-08-12', 0.2744223724911185, 0.6273004007953609, NULL
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100037, 0, 'CASH LOANS', 'F', 'N',
  'N', 0, 90000.0, 199008.0, 20893.5,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'CIVIL MARRIAGE', 'HOUSE / APARTMENT', 35,
  '25-35', '2006-08-05', NULL, 0.5594667916353414, 0.7981372313187245
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100039, 0, 'CASH LOANS', 'M', 'Y',
  'N', 1, 360000.0, 733315.5, 39069.0,
  'COMMERCIAL ASSOCIATE', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 32,
  '25-35', '2016-05-10', NULL, 0.3217448956617718, 0.4118485559242397
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100040, 0, 'CASH LOANS', 'F', 'N',
  'Y', 0, 135000.0, 1125000.0, 32895.0,
  'STATE SERVANT', 'HIGHER EDUCATION', 'MARRIED', 'HOUSE / APARTMENT', 43,
  '35-45', '2010-05-24', NULL, 0.1724975081477771, NULL
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100041, 0, 'CASH LOANS', 'F', 'N',
  'N', 0, 112500.0, 450000.0, 44509.5,
  'WORKING', 'HIGHER EDUCATION', 'MARRIED', 'HOUSE / APARTMENT', 33,
  '25-35', '2008-12-10', NULL, 0.6631580756296298, 0.6785676886853644
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100043, 0, 'CASH LOANS', 'F', 'N',
  'Y', 2, 198000.0, 641173.5, 23157.0,
  'COMMERCIAL ASSOCIATE', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 47,
  '45-60', '2025-12-03', 0.8427634659543568, 0.6816988025574287, 0.7544061731797895
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100044, 0, 'CASH LOANS', 'M', 'N',
  'Y', 0, 121500.0, 454500.0, 15151.5,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 57,
  '45-60', '2011-02-09', 0.8045861213121414, 0.7197985370372056, 0.722392890081304
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100045, 0, 'CASH LOANS', 'F', 'N',
  'Y', 0, 99000.0, 247275.0, 17338.5,
  'PENSIONER', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 65,
  '60+', '1999-03-21', NULL, 0.6507647995068742, 0.7517237147741489
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100046, 0, 'REVOLVING LOANS', 'M', 'Y',
  'Y', 0, 180000.0, 540000.0, 27000.0,
  'WORKING', 'HIGHER EDUCATION', 'MARRIED', 'HOUSE / APARTMENT', 44,
  '35-45', '2003-07-19', NULL, 0.7380532835697358, 0.6058362647264226
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100047, 1, 'CASH LOANS', 'M', 'N',
  'Y', 0, 202500.0, 1193580.0, 35028.0,
  'COMMERCIAL ASSOCIATE', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 47,
  '45-60', '2022-11-10', NULL, 0.306840586048305, 0.3201633668633456
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100048, 0, 'CASH LOANS', 'F', 'N',
  'Y', 0, 202500.0, 604152.0, 29196.0,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 46,
  '45-60', '2017-06-23', NULL, 0.0373152355612163, NULL
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100049, 1, 'CASH LOANS', 'F', 'N',
  'N', 0, 135000.0, 288873.0, 16258.5,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'CIVIL MARRIAGE', 'HOUSE / APARTMENT', 36,
  '35-45', '2025-12-21', 0.4682080567974757, 0.6742032101473874, 0.3996756156233169
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100050, 0, 'CASH LOANS', 'F', 'N',
  'Y', 0, 108000.0, 746280.0, 42970.5,
  'PENSIONER', 'HIGHER EDUCATION', 'SINGLE / NOT MARRIED', 'HOUSE / APARTMENT', 64,
  '60+', '2010-05-14', NULL, 0.7661378050275851, 0.6848276586890367
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100051, 0, 'CASH LOANS', 'M', 'N',
  'Y', 0, 202500.0, 661702.5, 48280.5,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'CIVIL MARRIAGE', 'HOUSE / APARTMENT', 26,
  '25-35', '2014-09-09', NULL, 0.6315186311742824, NULL
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100052, 0, 'REVOLVING LOANS', 'F', 'N',
  'Y', 1, 90000.0, 180000.0, 9000.0,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'CIVIL MARRIAGE', 'HOUSE / APARTMENT', 21,
  '<25', '2008-01-19', NULL, 0.535542260363498, NULL
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100053, 0, 'CASH LOANS', 'F', 'N',
  'Y', 0, 202500.0, 305221.5, 17649.0,
  'PENSIONER', 'SECONDARY / SECONDARY SPECIAL', 'SINGLE / NOT MARRIED', 'HOUSE / APARTMENT', 55,
  '45-60', '2004-11-06', NULL, 0.2476647173356162, 0.475849908720221
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100054, 0, 'CASH LOANS', 'F', 'N',
  'Y', 0, 99000.0, 260640.0, 26838.0,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 55,
  '45-60', '2000-11-30', NULL, 0.0892406534424171, 0.7281412993111438
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100055, 0, 'CASH LOANS', 'F', 'N',
  'N', 0, 130500.0, 1350000.0, 37255.5,
  'STATE SERVANT', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 54,
  '45-60', '2009-01-19', 0.7104273289168539, 0.5891866296961207, 0.4668640059537032
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100056, 0, 'CASH LOANS', 'M', 'Y',
  'Y', 0, 360000.0, 1506816.0, 49927.5,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 50,
  '45-60', '2011-01-10', NULL, 0.5239340474953537, NULL
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100058, 0, 'REVOLVING LOANS', 'F', 'N',
  'Y', 0, 54000.0, 135000.0, 6750.0,
  'STATE SERVANT', 'HIGHER EDUCATION', 'MARRIED', 'HOUSE / APARTMENT', 33,
  '25-35', '2022-12-13', 0.6562248044601879, 0.4508497225560816, 0.4794489811780563
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100059, 0, 'CASH LOANS', 'M', 'Y',
  'Y', 1, 540000.0, 675000.0, 34596.0,
  'COMMERCIAL ASSOCIATE', 'HIGHER EDUCATION', 'MARRIED', 'HOUSE / APARTMENT', 51,
  '45-60', '2015-05-29', 0.3115099249880457, 0.7133545848531052, 0.3092753558842053
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100060, 0, 'CASH LOANS', 'M', 'Y',
  'N', 0, 76500.0, 454500.0, 14661.0,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 33,
  '25-35', '2021-02-06', 0.2445616325354615, 0.705947456699447, 0.7992967832109371
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100061, 0, 'CASH LOANS', 'F', 'N',
  'Y', 2, 225000.0, 314055.0, 16164.0,
  'COMMERCIAL ASSOCIATE', 'HIGHER EDUCATION', 'MARRIED', 'HOUSE / APARTMENT', 28,
  '25-35', '2020-07-20', 0.1895957995501827, 0.7029791046049891, 0.7016957740576931
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100062, 0, 'CASH LOANS', 'M', 'Y',
  'N', 0, 81000.0, 675000.0, 32472.0,
  'PENSIONER', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 50,
  '45-60', '2007-02-08', NULL, 0.6628649268152181, 0.7380196196295241
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100063, 0, 'CASH LOANS', 'F', 'N',
  'Y', 0, 180000.0, 837427.5, 45558.0,
  'WORKING', 'HIGHER EDUCATION', 'MARRIED', 'HOUSE / APARTMENT', 35,
  '25-35', '2006-10-13', 0.5527719020519871, 0.6166372926426479, 0.0701088438273582
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100064, 0, 'CASH LOANS', 'F', 'N',
  'N', 0, 67500.0, 298728.0, 15381.0,
  'PENSIONER', 'SECONDARY / SECONDARY SPECIAL', 'SINGLE / NOT MARRIED', 'MUNICIPAL APARTMENT', 59,
  '45-60', '2020-07-26', NULL, 0.6227082733555896, 0.1694287272664794
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100068, 0, 'REVOLVING LOANS', 'M', 'N',
  'Y', 0, 81000.0, 247500.0, 12375.0,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 49,
  '45-60', '2014-02-12', 0.2377197192577024, 0.6091352920795285, 0.5136937663039473
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100069, 0, 'CASH LOANS', 'M', 'Y',
  'Y', 1, 360000.0, 640458.0, 27265.5,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'SEPARATED', 'HOUSE / APARTMENT', 38,
  '35-45', '2020-04-08', NULL, 0.2567370429595146, 0.7076993447402619
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100070, 0, 'CASH LOANS', 'M', 'Y',
  'Y', 0, 540000.0, 1227901.5, 46899.0,
  'WORKING', 'HIGHER EDUCATION', 'WIDOW', 'HOUSE / APARTMENT', 56,
  '45-60', '2007-05-09', NULL, 0.6535972121081295, 0.3392876999089139
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100071, 0, 'CASH LOANS', 'F', 'N',
  'Y', 0, 180000.0, 1663987.5, 86989.5,
  'COMMERCIAL ASSOCIATE', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 55,
  '45-60', '2007-08-08', NULL, 0.5706663563799912, 0.6971469077844458
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100072, 0, 'CASH LOANS', 'M', 'N',
  'N', 0, 180000.0, 1080000.0, 44118.0,
  'WORKING', 'INCOMPLETE HIGHER', 'SINGLE / NOT MARRIED', 'WITH PARENTS', 21,
  '<25', '2013-08-14', NULL, 0.0265407750366898, 0.434733248750173
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100073, 0, 'CASH LOANS', 'M', 'Y',
  'Y', 0, 324000.0, 1130760.0, 40189.5,
  'PENSIONER', 'HIGHER EDUCATION', 'CIVIL MARRIAGE', 'HOUSE / APARTMENT', 62,
  '60+', '2023-03-30', NULL, 0.7330511930996613, 0.2340151665320674
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100075, 0, 'CASH LOANS', 'F', 'N',
  'N', 0, 112500.0, 95940.0, 10462.5,
  'WORKING', 'HIGHER EDUCATION', 'SINGLE / NOT MARRIED', 'HOUSE / APARTMENT', 33,
  '25-35', '2011-09-25', 0.2996061411205129, 0.6645439411246608, 0.4920600938649263
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100076, 0, 'CASH LOANS', 'M', 'Y',
  'N', 0, 180000.0, 315000.0, 9679.5,
  'COMMERCIAL ASSOCIATE', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 37,
  '35-45', '2011-03-07', NULL, 0.5848873555356944, 0.0950703958413326
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100077, 0, 'CASH LOANS', 'M', 'N',
  'Y', 0, 180000.0, 1256400.0, 40657.5,
  'COMMERCIAL ASSOCIATE', 'SECONDARY / SECONDARY SPECIAL', 'SINGLE / NOT MARRIED', 'HOUSE / APARTMENT', 33,
  '25-35', '2009-05-19', 0.2867830789116058, 0.6473478219828046, 0.5620604831738043
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100078, 0, 'CASH LOANS', 'F', 'Y',
  'Y', 0, 180000.0, 1035000.0, 43983.0,
  'STATE SERVANT', 'HIGHER EDUCATION', 'MARRIED', 'HOUSE / APARTMENT', 53,
  '45-60', '2007-05-19', 0.7961611232881004, 0.5172704004425673, 0.4294236843421945
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100079, 0, 'REVOLVING LOANS', 'M', 'N',
  'Y', 0, 225000.0, 270000.0, 13500.0,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'SEPARATED', 'MUNICIPAL APARTMENT', 42,
  '35-45', '2012-03-13', 0.202477374074608, 0.5619229565929612, 0.4135967602644276
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100080, 0, 'REVOLVING LOANS', 'F', 'N',
  'N', 1, 157500.0, 450000.0, 22500.0,
  'COMMERCIAL ASSOCIATE', 'SECONDARY / SECONDARY SPECIAL', 'CIVIL MARRIAGE', 'HOUSE / APARTMENT', 32,
  '25-35', '2003-11-14', 0.4115064104251909, 0.1238882922844139, 0.8327850252992314
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100081, 0, 'CASH LOANS', 'M', 'Y',
  'N', 0, 180000.0, 450000.0, 21109.5,
  'COMMERCIAL ASSOCIATE', 'SECONDARY / SECONDARY SPECIAL', 'CIVIL MARRIAGE', 'HOUSE / APARTMENT', 29,
  '25-35', '2012-12-05', NULL, 0.6454384930609306, NULL
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100082, 0, 'CASH LOANS', 'M', 'N',
  'N', 2, 180000.0, 450000.0, 21109.5,
  'COMMERCIAL ASSOCIATE', 'HIGHER EDUCATION', 'MARRIED', 'HOUSE / APARTMENT', 32,
  '25-35', '2022-04-29', 0.3577065472620613, 0.6865047975453018, 0.3944954053123993
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100083, 0, 'CASH LOANS', 'M', 'Y',
  'Y', 0, 103500.0, 573628.5, 24435.0,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 42,
  '35-45', '2025-02-28', 0.2707661633733818, 0.7071263161734994, 0.5971924268337128
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100084, 0, 'CASH LOANS', 'M', 'N',
  'Y', 2, 225000.0, 495351.0, 26140.5,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'SEPARATED', 'HOUSE / APARTMENT', 40,
  '35-45', '2026-01-12', NULL, 0.5705270507243844, 0.6940926425266661
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100085, 0, 'CASH LOANS', 'M', 'N',
  'Y', 1, 157500.0, 755190.0, 28894.5,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 30,
  '25-35', '2017-03-10', NULL, 0.3687189849837431, 0.3589512285783967
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100086, 0, 'CASH LOANS', 'F', 'N',
  'Y', 1, 135000.0, 675000.0, 21775.5,
  'COMMERCIAL ASSOCIATE', 'HIGHER EDUCATION', 'WIDOW', 'HOUSE / APARTMENT', 39,
  '35-45', '2014-04-01', NULL, 0.5698732368655826, 0.1986200451074864
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100087, 0, 'CASH LOANS', 'F', 'N',
  'Y', 1, 202500.0, 1288350.0, 37800.0,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 48,
  '45-60', '2021-11-28', NULL, 0.5720641471414096, 0.191821602413606
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100088, 0, 'REVOLVING LOANS', 'F', 'N',
  'N', 0, 112500.0, 135000.0, 6750.0,
  'COMMERCIAL ASSOCIATE', 'HIGHER EDUCATION', 'MARRIED', 'HOUSE / APARTMENT', 53,
  '45-60', '2013-06-09', NULL, 0.5851740300889305, 0.4083588531230431
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100089, 0, 'CASH LOANS', 'M', 'N',
  'Y', 0, 135000.0, 337761.0, 15781.5,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'CIVIL MARRIAGE', 'HOUSE / APARTMENT', 26,
  '25-35', '2013-12-12', NULL, 0.5500579930157645, 0.5352762504724826
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100093, 0, 'CASH LOANS', 'F', 'N',
  'Y', 1, 94500.0, 585000.0, 28273.5,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 50,
  '45-60', '2021-06-09', 0.5927009939219194, 0.4885999153777029, NULL
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100094, 0, 'CASH LOANS', 'F', 'N',
  'Y', 0, 108000.0, 113760.0, 5301.0,
  'PENSIONER', 'HIGHER EDUCATION', 'SINGLE / NOT MARRIED', 'HOUSE / APARTMENT', 62,
  '60+', '1991-07-15', NULL, 0.5827354769124312, 0.4525335592581747
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100095, 0, 'REVOLVING LOANS', 'F', 'N',
  'Y', 2, 67500.0, 135000.0, 6750.0,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 51,
  '45-60', '1998-01-07', 0.5866975916234531, 0.3045061145430549, NULL
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100096, 1, 'CASH LOANS', 'F', 'N',
  'Y', 0, 81000.0, 252000.0, 14593.5,
  'PENSIONER', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 67,
  '60+', '2011-05-03', NULL, 0.0239523667712844, 0.7209441499436497
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100097, 0, 'CASH LOANS', 'M', 'Y',
  'Y', 0, 157500.0, 760225.5, 30280.5,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 48,
  '45-60', '2016-07-06', NULL, 0.3573422337147276, 0.6446794549585961
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100098, 0, 'REVOLVING LOANS', 'M', 'Y',
  'N', 0, 225000.0, 270000.0, 13500.0,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'CIVIL MARRIAGE', 'HOUSE / APARTMENT', 47,
  '45-60', '2006-05-09', NULL, 0.5970811533321667, NULL
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100099, 0, 'CASH LOANS', 'F', 'N',
  'Y', 0, 360000.0, 733315.5, 41076.0,
  'PENSIONER', 'SECONDARY / SECONDARY SPECIAL', 'SEPARATED', 'HOUSE / APARTMENT', 63,
  '60+', '2000-01-26', NULL, 0.6605789818593445, 0.3425288720742255
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100100, 0, 'CASH LOANS', 'M', 'Y',
  'Y', 2, 202500.0, 796396.5, 38443.5,
  'WORKING', 'HIGHER EDUCATION', 'MARRIED', 'HOUSE / APARTMENT', 43,
  '35-45', '2017-07-07', 0.4476751393608083, 0.495765140717496, 0.8245949709919925
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100101, 0, 'CASH LOANS', 'F', 'Y',
  'Y', 0, 202500.0, 343377.0, 22072.5,
  'STATE SERVANT', 'HIGHER EDUCATION', 'SINGLE / NOT MARRIED', 'HOUSE / APARTMENT', 49,
  '45-60', '2005-10-11', NULL, 0.7162122102538987, NULL
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100102, 0, 'CASH LOANS', 'F', 'N',
  'N', 1, 126000.0, 327024.0, 10264.5,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'SINGLE / NOT MARRIED', 'HOUSE / APARTMENT', 39,
  '35-45', '2007-03-03', 0.4147940693543055, 0.6611083077510267, 0.4776491548517548
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100103, 0, 'CASH LOANS', 'F', 'N',
  'Y', 0, 72000.0, 450000.0, 16965.0,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 57,
  '45-60', '2009-07-06', NULL, 0.7180575365896832, 0.511891801533151
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100104, 0, 'CASH LOANS', 'F', 'N',
  'Y', 0, 90000.0, 547344.0, 30690.0,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 50,
  '45-60', '2007-07-25', 0.7631370618175837, 0.6446273721560554, NULL
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100105, 0, 'CASH LOANS', 'F', 'N',
  'Y', 0, 193500.0, 225000.0, 23755.5,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 54,
  '45-60', '2013-10-17', 0.765153942091246, 0.2547599571469118, 0.4118485559242397
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100108, 0, 'CASH LOANS', 'F', 'N',
  'Y', 3, 171000.0, 545040.0, 31288.5,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 35,
  '25-35', '2012-01-03', NULL, 0.7566679797246073, 0.6413682574954046
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100110, 0, 'CASH LOANS', 'M', 'Y',
  'Y', 3, 135000.0, 373140.0, 25065.0,
  'COMMERCIAL ASSOCIATE', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 29,
  '25-35', '2024-11-19', NULL, 0.6405493008893001, 0.3280631605201915
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100111, 0, 'CASH LOANS', 'F', 'Y',
  'N', 1, 112500.0, 862560.0, 27954.0,
  'COMMERCIAL ASSOCIATE', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'WITH PARENTS', 28,
  '25-35', '2013-06-04', 0.5633231337420023, 0.608604105963283, 0.228883416700673
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100112, 1, 'CASH LOANS', 'M', 'Y',
  'Y', 0, 315000.0, 953460.0, 64107.0,
  'COMMERCIAL ASSOCIATE', 'INCOMPLETE HIGHER', 'SINGLE / NOT MARRIED', 'WITH PARENTS', 27,
  '25-35', '2012-12-12', NULL, 0.4323402118056743, 0.0774985464900651
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100113, 0, 'CASH LOANS', 'M', 'Y',
  'N', 0, 76500.0, 135000.0, 6696.0,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'SINGLE / NOT MARRIED', 'HOUSE / APARTMENT', 41,
  '35-45', '2000-12-21', 0.4757617930038634, 0.5930185238421518, 0.7898803468924867
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100114, 0, 'CASH LOANS', 'F', 'N',
  'Y', 0, 135000.0, 284400.0, 22599.0,
  'COMMERCIAL ASSOCIATE', 'HIGHER EDUCATION', 'SINGLE / NOT MARRIED', 'HOUSE / APARTMENT', 29,
  '25-35', '2004-06-06', 0.3957242668511344, 0.1549370735653434, 0.2650494299443805
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100115, 0, 'CASH LOANS', 'F', 'N',
  'N', 0, 90000.0, 315000.0, 14683.5,
  'WORKING', 'SECONDARY / SECONDARY SPECIAL', 'MARRIED', 'HOUSE / APARTMENT', 42,
  '35-45', '2017-09-08', NULL, 0.3343001962973505, NULL
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100116, 0, 'CASH LOANS', 'F', 'N',
  'Y', 0, 243000.0, 900000.0, 32017.5,
  'WORKING', 'HIGHER EDUCATION', 'MARRIED', 'HOUSE / APARTMENT', 40,
  '35-45', '2016-10-24', 0.6712718925800566, 0.7002735745029195, 0.0710551246687366
) ON CONFLICT (id_cliente_atual) DO NOTHING;
INSERT INTO application_data (
  id_cliente_atual, alvo_inadimplencia, tipo_contrato, genero, possui_carro, 
  possui_imovel, qtd_filhos, renda_total, valor_credito, valor_anuidade,
  tipo_renda, escolaridade, estado_civil, tipo_moradia, idade_anos, 
  faixa_etaria, data_registro, ext_source_1, ext_source_2, ext_source_3
) VALUES (
  100118, 0, 'CASH LOANS', 'F', 'N',
  'Y', 0, 90000.0, 675000.0, 26541.0,
  'PENSIONER', 'SECONDARY / SECONDARY SPECIAL', 'WIDOW', 'HOUSE / APARTMENT', 61,
  '60+', '2025-07-02', NULL, 0.6263029188866104, NULL
) ON CONFLICT (id_cliente_atual) DO NOTHING;
COMMIT;