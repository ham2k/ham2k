# QSO Object Notation

A JSON-like object notation for representation of Amateur Radio log data, with an emphasis on legibility and clarity over storage efficiency.

It is inspired by other Amateur Radio formats such as [ADIF](https://www.adif.org/) and [Cabrillo](https://wwrof.org/cabrillo/).

# What is a QSO?

One QSO represents a contact between two stations, as seen by one of them. The term "QSO" comes from standard radio abbreviations, also known as "procodes", and corresponds to the question or assertion of "I can communicate with you".

A QSL is when the other station has confirmed the contact.

```
{
  our: {
    call: "KI2D",
    freq: "14.076",
    band: "20m",
    mode: "SSB",
    grid: "FN21rq",
    report: "59",
    name: "DAN",
    state: "NY"
  },
  their: {
    call: "K2SUL",
    freq: "14.076",
    report: "55",
    name: "JOHN",
    state: "NY"
  },
  start: "2020-01-01T10:31:00Z",
  end: "2020-01-01T10:32:15Z",
  refs: [
    {
      activity: "IOTA",
      ref: "NA-1234",
      role: "hunter"
    },
    {
      activity: "POTA",
      ref: "K-0123"
      role: "activator"
    },
    {
      contest: "NAQPSSB",
      transmitter: 0
    },
    {
      net: "NATA"
    }
  ]
}
```

# Groups of QSOs
