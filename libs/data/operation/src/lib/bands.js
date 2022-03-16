const BANDS = [
  "2200m",
  "630m",
  "160m",
  "80m",
  "60m",
  "40m",
  "30m",
  "20m",
  "17m",
  "15m",
  "12m",
  "10m",
  "6m",
  "4m",
  "2m",
  "125cm",
  "70cm",
  "33cm",
  "23cm",
  "13cm",
  "other",
]

const HF_BANDS = ["160m", "80m", "60m", "40m", "30m", "20m", "17m", "15m", "12m", "10m"]
const COMMON_BANDS = ["160m", "80m", "60m", "40m", "30m", "20m", "17m", "15m", "12m", "10m", "6m", "2m", "70cm"]
const CONTEST_BANDS = ["160m", "80m", "40m", "20m", "15m", "10m"]

function bandForFrequency(freq) {
  if (freq >= 130 && freq <= 140) return "2200m"
  else if (freq >= 450 && freq <= 500) return "630m"
  else if (freq >= 1700 && freq <= 2100) return "160m"
  else if (freq >= 3400 && freq <= 4100) return "80m"
  else if (freq >= 5300 && freq <= 5500) return "60m"
  else if (freq >= 6900 && freq <= 7400) return "40m"
  else if (freq >= 10000 && freq <= 10200) return "30m"
  else if (freq >= 13900 && freq <= 14400) return "20m"
  else if (freq >= 18000 && freq <= 18200) return "17m"
  else if (freq >= 20900 && freq <= 21600) return "15m"
  else if (freq >= 24500 && freq <= 25200) return "12m"
  else if (freq >= 27900 && freq <= 30000) return "10m"
  else if (freq >= 50000 && freq <= 54000) return "6m"
  else if (freq >= 70000 && freq <= 71000) return "4m"
  else if (freq >= 140000 && freq <= 150000) return "2m"
  else if (freq >= 219000 && freq <= 230000) return "125cm"
  else if (freq >= 400000 && freq <= 460000) return "70cm"
  else if (freq >= 900000 && freq <= 930000) return "33cm"
  else if (freq >= 1200000 && freq <= 1400000) return "23cm"
  else if (freq >= 2300000 && freq <= 2400000) return "13cm"
  else return "other"
}

module.exports = {
  BANDS,
  HF_BANDS,
  COMMON_BANDS,
  CONTEST_BANDS,
  bandForFrequency,
}
