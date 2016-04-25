var markets_list = ["forex","indices","stocks","commodities","volidx"]; var markets_json = {"commodities":{"submarkets":[{"instruments":[{"value":"frxXAUUSD","label":"Gold/USD"},{"value":"frxXPDUSD","label":"Palladium/USD"},{"value":"frxXPTUSD","label":"Platinum/USD"},{"value":"frxXAGUSD","label":"Silver/USD"}],"name":"metals","label":"Metals"},{"instruments":[{"value":"frxBROUSD","label":"Oil/USD"}],"name":"energy","label":"Energy"}],"label":"Commodities"},"volidx":{"submarkets":[{"instruments":[{"value":"R_100","label":"Volatility 100 Index"},{"value":"R_25","label":"Volatility 25 Index"},{"value":"R_50","label":"Volatility 50 Index"},{"value":"R_75","label":"Volatility 75 Index"}],"name":"random_index","label":"Continuous Indices"},{"instruments":[{"value":"RDBEAR","label":"Bear Market Index"},{"value":"RDBULL","label":"Bull Market Index"}],"name":"random_daily","label":"Daily Reset Indices"}],"label":"Volatility Indices"},"forex":{"submarkets":[{"instruments":[{"value":"frxAUDJPY","label":"AUD/JPY"},{"value":"frxAUDUSD","label":"AUD/USD"},{"value":"frxEURAUD","label":"EUR/AUD"},{"value":"frxEURCAD","label":"EUR/CAD"},{"value":"frxEURCHF","label":"EUR/CHF"},{"value":"frxEURGBP","label":"EUR/GBP"},{"value":"frxEURJPY","label":"EUR/JPY"},{"value":"frxEURUSD","label":"EUR/USD"},{"value":"frxGBPAUD","label":"GBP/AUD"},{"value":"frxGBPJPY","label":"GBP/JPY"},{"value":"frxGBPUSD","label":"GBP/USD"},{"value":"frxUSDCAD","label":"USD/CAD"},{"value":"frxUSDCHF","label":"USD/CHF"},{"value":"frxUSDJPY","label":"USD/JPY"}],"name":"major_pairs","label":"Major Pairs"},{"instruments":[{"value":"frxAUDCAD","label":"AUD/CAD"},{"value":"frxAUDCHF","label":"AUD/CHF"},{"value":"frxAUDNZD","label":"AUD/NZD"},{"value":"frxAUDPLN","label":"AUD/PLN"},{"value":"frxEURNZD","label":"EUR/NZD"},{"value":"frxGBPCAD","label":"GBP/CAD"},{"value":"frxGBPCHF","label":"GBP/CHF"},{"value":"frxGBPNOK","label":"GBP/NOK"},{"value":"frxGBPNZD","label":"GBP/NZD"},{"value":"frxGBPPLN","label":"GBP/PLN"},{"value":"frxNZDJPY","label":"NZD/JPY"},{"value":"frxNZDUSD","label":"NZD/USD"},{"value":"frxUSDMXN","label":"USD/MXN"},{"value":"frxUSDNOK","label":"USD/NOK"},{"value":"frxUSDPLN","label":"USD/PLN"},{"value":"frxUSDSEK","label":"USD/SEK"}],"name":"minor_pairs","label":"Minor Pairs"},{"instruments":[{"value":"WLDAUD","label":"AUD Index"},{"value":"WLDEUR","label":"EUR Index"},{"value":"WLDGBP","label":"GBP Index"},{"value":"WLDUSD","label":"USD Index"}],"name":"smart_fx","label":"Smart FX"}],"label":"Forex"},"stocks":{"submarkets":[{"instruments":[{"value":"BBABI","label":"AB Inbev"},{"value":"BBBELG","label":"Belgacom"},{"value":"BBGBLB","label":"Groupe Bruxelles Lambert"},{"value":"BBKBC","label":"KBC Groep"},{"value":"BBUCB","label":"UCB"}],"name":"belgium","label":"Belgian Stocks"},{"instruments":[{"value":"NAASML","label":"ASML Holding"},{"value":"NAHEIA","label":"Heineken"},{"value":"NAINGA","label":"ING"},{"value":"NARDSA","label":"Royal Dutch Shell"},{"value":"NAUNA","label":"Unilever"}],"name":"amsterdam","label":"Dutch Stocks"},{"instruments":[{"value":"FPCS","label":"AXA"},{"value":"FPAI","label":"Air Liquide"},{"value":"FPAIR","label":"Airbus Group"},{"value":"FPBNP","label":"BNP Paribas"},{"value":"FPCA","label":"Carrefour"},{"value":"FPSGO","label":"Cie de Saint-Gobain"},{"value":"FPACA","label":"Credit Agricole"},{"value":"FPBN","label":"Danone"},{"value":"FPEDF","label":"Electricite de France"},{"value":"FPEI","label":"Essilor International"},{"value":"FPGSZ","label":"GDF Suez"},{"value":"FPKER","label":"Kering"},{"value":"FPOR","label":"L'Oreal"},{"value":"FPMC","label":"Moet Hennessy Louis Vuitton"},{"value":"FPORA","label":"Orange"},{"value":"FPRI","label":"Pernod Ricard"},{"value":"FPRNO","label":"Renault"},{"value":"FPSAN","label":"SANOFI"},{"value":"FPSAF","label":"Safran"},{"value":"FPSU","label":"Schneider Electric"},{"value":"FPGLE","label":"Societe Generale"},{"value":"FPFP","label":"TOTAL"},{"value":"FPDG","label":"Vinci"},{"value":"FPVIV","label":"Vivendi"}],"name":"france","label":"French Stocks"}],"label":"Stocks"},"indices":{"submarkets":[{"instruments":[{"value":"AS51","label":"Australian Index"},{"value":"BSESENSEX30","label":"Bombay Index"},{"value":"HSI","label":"Hong Kong Index"},{"value":"JCI","label":"Jakarta Index"},{"value":"N225","label":"Japanese Index"},{"value":"STI","label":"Singapore Index"}],"name":"asia_oceania","label":"Asia/Oceania"},{"instruments":[{"value":"BFX","label":"Belgian Index"},{"value":"AEX","label":"Dutch Index"},{"value":"FCHI","label":"French Index"},{"value":"GDAXI","label":"German Index"},{"value":"ISEQ","label":"Irish Index"},{"value":"OBX","label":"Norwegian Index"},{"value":"TOP40","label":"South African Index"},{"value":"SSMI","label":"Swiss Index"}],"name":"europe_africa","label":"Europe/Africa"},{"instruments":[{"value":"SPC","label":"US Index"},{"value":"DJI","label":"Wall Street Index"}],"name":"americas","label":"Americas"},{"instruments":[],"name":"smart_index","label":"Smart Indices"},{"instruments":[{"value":"DFMGI","label":"Dubai Index"}],"name":"middle_east","label":"Middle East"}],"label":"Indices"}};