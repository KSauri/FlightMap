import airports from './airports';


const drawAirports = () => {

  var canvas = document.getElementById('canvas');
  canvas.width = 800;
  canvas.height = 500;
  var ctx = canvas.getContext('2d');


  for (var airport in airports) {
    ctx.beginPath();
    ctx.arc(airports[airport].pos.x, airports[airport].pos.y, 5, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }
};

export default drawAirports;


['"ATL"','"LAX"','"ORD"','"DFW"','"JFK"','"DEN"','"SFO"','"CLT"','"LAS"','"PHX"','"MIA"','"IAH"','"SEA"','"MCO"','"EWR"','"MSP"','"BOS"','"DTW"','"PHL"','"LGA"','"FLL"','"BWI"','"DCA"','"MDW"','"SLC"','"IAD"','"SAN"','"HNL"','"TPA"','"PDX"','"DAL"','"STL"','"HOU"','"AUS"','"BNA"','"OAK"','"MSY"','"MCI"','"RDU"','"SNA"','"SJC"','"SMF"','"SJU"','"RSW"',"SAT"'"CLE"','"PIT"','"IND"','"CMH"','"MKE"','"OGG"','"PBI"','"CVG"','"BDL"','"JAX"','"ANC"','"BUF"','"ABQ"','"ONT"','"OMA"','"BUR"','"MEM"','"OKC"','"PVD"','"RIC"','"CHS"','"RNO"','"SDF"','"TUS"','"GEG"','"ORF"','"LIH"','"BOI"','"KOA"','"GUM"','"ELP"','"TUL"','"BHM"','"GRR"','"ALB"','"LGB"','"SFB"','"ROC"','"DSM"','"DAY"','"MHT"','"SYR"','"SAV"','"LIT"','"GSP"','"PSP"','"MYR"','"PWM"','"TYS"','"GSO"','"MSN"','"PIE"','"PNS"','"ICT"','"CAK"','"HPN"','"STT"','"FAT"','"IWA"','"XNA"','"ITO"','"SRQ"','"LEX"','"ISP"','"COS"','"ACY"','"MDT"','"BTV"','"CID"','"CAE"','"HSV"','"MAF"','"BZN"','"JAN"','"FSD"','"FAI"','"GSN"','"SGF"','"EUG"','"BLI"','"LBB"','"FAR"','"ECP"','"PGD"','"BIL"','"FNT"','"JNU"','"CHA"','"AVL"','"MFE"','"TTN"','"ILM"','"VPS"','"MFR"','"MLI"','"BTR"','"EYW"','"FWA"','"MSO"','"PSC"','"AMA"','"CRP"','"TLH"','"GCN"','"ABE"','"PIA"','"GPT"','"SBA"','"SBN"','"JAC"','"DAB"','"ROA"','"SHV"','"GRB"','"RDM"','"MOB"','"CHO"','"BGR"','"AGS"','"RAP"','"BIS"','"HRL"','"ATW"','"LFT"','"GPI"','"BVU"','"ASE"','"CRW"','"MLB"','"FAY"','"AVP"','"TRI"','"GJT"','"GNV"','"TVC"','"EVV"','"BQN"','"PHF"','"DRO"','"BMI"','"GTF"','"MOT"','"LBE"','"LAN"','"MRY"','"GRK"','"STX"','"MGM"','"LNK"','"AEX"','"BET"','"EGE"','"ACK"','"ELM"','"OAJ"','"IDA"','"GFK"','"SBP"','"BRO"','"SWF"','"UNV"','"PBG"','"DLH"','"STS"','"CWA"','"KTN"','"AZO"','"IAG"','"BFL"','"MBS"','"RST"','"MLU"','"LRD"','"EWN"','"IFP"','"RFD"','"CPR"','"MTJ"','"ISN"','"HTS"','"HLN"','"PSE"','"ENA"','"LSE"','"TOL"','"HDN"','"SPI"','"MKK"','"CLL"','"CMI"','"ERI"','"ITH"','"ABI"','"FSM"','"LCK"','"ADQ"','"SIT"','"SCK"','"NYL"','"BGM"','"SCC"','"LYH"','"SAF"','"JQF"','"TYR"','"VQS"','"SGU"','"LCH"','"SUN"','"FLG"','"LWS"','"OTZ"','"YNG"','"MHK"','"PPG"','"HYA"','"PVU"','"COU"','"GRI"','"SJT"','"YKM"','"ACT"','"EAT"','"SBY"','"OME"','"ORH"','"ACV"','"PGV"','"HND"','"FLO"','"LAW"','"CSG"','"PUW"','"MVY"','"BRW"','"TNI"','"DHN"','"PSM"','"SPS"','"SMX"','"RVR"','"SAW"','"DIK"','"ALW"','"HOM"','"LNY"','"VLD"','"GTR"','"HXD"','"DBQ"','"AKN"','"ROW"','"TXK"']
