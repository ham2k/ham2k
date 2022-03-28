https://www.country-files.com/

http://www.dxatlas.com/Dev/

From https://ham.stackexchange.com/questions/1352/how-can-i-tell-if-a-call-sign-is-valid

> > > If you check out the resources provided by Alex Shovkoplyas, VE3NEA in http://www.dxatlas.com/Dev/ you will find a variety of examples of callsign parsing. His prefix list contains REGEX matches for each country, but be aware that he uses HIS OWN syntax for callsign matching:

> > > The 'Mask' field in PREFIX.LST is used for callsign resolution. The following meta symbols are used in the mask:

> > > '@' - any letter '#' - any digit '?' - any character (letter or digit) [AC] - A or C [A-C] - A, B, or C. [AC-E] - A, C, D, or E. '.' - no characters are allowed after this simbol. Example: '??#@@.' matches all calls with 2-letter suffixes.

> > > His symbols MUST be substituted for other types, to use the mask with other languages:Javascript, VB.Net, PHP, etc.
