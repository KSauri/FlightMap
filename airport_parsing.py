import pandas as pd
import urllib

url = 'https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat'
fh = urllib.urlopen(url)
airport_table = pd.read_table(fh)
airport_df = pd.DataFrame(airport_table)
airport_separated_df = airport_df['all_data'].str.split(',', expand=True)
airport_separated_df.columns = ["idx", "airportname", "city", "country", "threeLetterName", "to_delete_name", "lat", "lng", "to_delete1", "to_delete2", "to_delete3", "to_delete4", "to_delete5", "to_delete6", "to_delete7"]

airports = airport_separated_df["idx", "city", "threeLetterName","lat","lng"]
us_airports = airports.loc[airports['country'] == '"United States"']

largest_airport_codes = ['"ATL"','"LAX"','"ORD"','"DFW"','"JFK"','"DEN"','"SFO"','"CLT"','"LAS"','"PHX"','"MIA"','"IAH"','"SEA"','"MCO"','"EWR"','"MSP"','"BOS"','"DTW"','"PHL"','"LGA"','"FLL"','"BWI"','"DCA"','"MDW"','"SLC"','"IAD"','"SAN"','"HNL"','"TPA"','"PDX"','"DAL"','"STL"','"HOU"','"AUS"','"BNA"','"OAK"','"MSY"','"MCI"','"RDU"','"SNA"','"SJC"','"SMF"','"SJU"','"RSW"',"SAT"'"CLE"','"PIT"','"IND"','"CMH"','"MKE"','"OGG"','"PBI"','"CVG"','"BDL"','"JAX"','"ANC"','"BUF"','"ABQ"','"ONT"','"OMA"','"BUR"','"MEM"','"OKC"','"PVD"','"RIC"','"CHS"','"RNO"','"SDF"','"TUS"','"GEG"','"ORF"','"LIH"','"BOI"','"KOA"','"GUM"','"ELP"','"TUL"','"BHM"','"GRR"','"ALB"','"LGB"','"SFB"','"ROC"','"DSM"','"DAY"','"MHT"','"SYR"','"SAV"','"LIT"','"GSP"','"PSP"','"MYR"','"PWM"','"TYS"','"GSO"','"MSN"','"PIE"','"PNS"','"ICT"','"CAK"','"HPN"','"STT"','"FAT"','"IWA"','"XNA"','"ITO"','"SRQ"','"LEX"','"ISP"','"COS"','"ACY"','"MDT"','"BTV"','"CID"','"CAE"','"HSV"','"MAF"','"BZN"','"JAN"','"FSD"','"FAI"','"GSN"','"SGF"','"EUG"','"BLI"','"LBB"','"FAR"','"ECP"','"PGD"','"BIL"','"FNT"','"JNU"','"CHA"','"AVL"','"MFE"','"TTN"','"ILM"','"VPS"','"MFR"','"MLI"','"BTR"','"EYW"','"FWA"','"MSO"','"PSC"','"AMA"','"CRP"','"TLH"','"GCN"','"ABE"','"PIA"','"GPT"','"SBA"','"SBN"','"JAC"','"DAB"','"ROA"','"SHV"','"GRB"','"RDM"','"MOB"','"CHO"','"BGR"','"AGS"','"RAP"','"BIS"','"HRL"','"ATW"','"LFT"','"GPI"','"BVU"','"ASE"','"CRW"','"MLB"','"FAY"','"AVP"','"TRI"','"GJT"','"GNV"','"TVC"','"EVV"','"BQN"','"PHF"','"DRO"','"BMI"','"GTF"','"MOT"','"LBE"','"LAN"','"MRY"','"GRK"','"STX"','"MGM"','"LNK"','"AEX"','"BET"','"EGE"','"ACK"','"ELM"','"OAJ"','"IDA"','"GFK"','"SBP"','"BRO"','"SWF"','"UNV"','"PBG"','"DLH"','"STS"','"CWA"','"KTN"','"AZO"','"IAG"','"BFL"','"MBS"','"RST"','"MLU"','"LRD"','"EWN"','"IFP"','"RFD"','"CPR"','"MTJ"','"ISN"','"HTS"','"HLN"','"PSE"','"ENA"','"LSE"','"TOL"','"HDN"','"SPI"','"MKK"','"CLL"','"CMI"','"ERI"','"ITH"','"ABI"','"FSM"','"LCK"','"ADQ"','"SIT"','"SCK"','"NYL"','"BGM"','"SCC"','"LYH"','"SAF"','"JQF"','"TYR"','"VQS"','"SGU"','"LCH"','"SUN"','"FLG"','"LWS"','"OTZ"','"YNG"','"MHK"','"PPG"','"HYA"','"PVU"','"COU"','"GRI"','"SJT"','"YKM"','"ACT"','"EAT"','"SBY"','"OME"','"ORH"','"ACV"','"PGV"','"HND"','"FLO"','"LAW"','"CSG"','"PUW"','"MVY"','"BRW"','"TNI"','"DHN"','"PSM"','"SPS"','"SMX"','"RVR"','"SAW"','"DIK"','"ALW"','"HOM"','"LNY"','"VLD"','"GTR"','"HXD"','"DBQ"','"AKN"','"ROW"','"TXK"']

largest_airports = us_airports[us_airports['threeLetterName'].isin(largest_airport_codes)]

largest_airports = largest_airports.reset_index(drop=True)

largest_airports = largest_airports.to_json



