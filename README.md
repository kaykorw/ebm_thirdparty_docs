# Kayko VSDC API Documentation

Official Mintlify documentation for the Rwanda Revenue Authority (RRA) VSDC API (v1.0.5).

## Project structure

```
documentation/
├── docs.json              # Mintlify configuration
├── openapi.json           # API Playground specification
├── introduction.mdx       # Landing page
├── table-of-contents.mdx  # Full documentation map
├── api/                   # Endpoint reference
├── calculations/          # VAT and amount formulas
├── concepts/              # Architecture and policies
├── workflows/             # Step-by-step business flows
├── reference/             # Field specs, enums, code tables
├── playground/            # Live API testing guide
├── data/                  # Country, currency, and unit code JSON
├── images/                # Logos
└── logo/                  # Navbar branding
```

## Local preview

```bash
npm i -g mint
cd documentation
mint dev
```

Open the local Mintlify preview URL shown in the terminal.

## Authentication (Kayko)

Integrators authenticate with a business API key from the Kayko dashboard:

1. **Settings → Enable EBM**
2. **Generate API key**
3. Send `Authorization: Bearer sk_…` (or `x-api-key`) on every request

See `concepts/api-keys.mdx`.

## Deploy

Connect this repository to [Mintlify](https://mintlify.com) with `docs.json` at the project root, or run:

```bash
mint deploy
```

## Documentation highlights

| Feature | Details |
|---------|---------|
| **21 API endpoints** | Full VSDC coverage with interactive playground |
| **Code examples** | cURL, JavaScript, and PHP on every endpoint |
| **Workflows** | Sales, purchases, and stock step-by-step guides |
| **Calculations** | VAT formulas, discounts, and invoice totals |
| **Reference tables** | Fields, enumerations, countries, currencies |
