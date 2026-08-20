# Kayko EBM Third-Party API Documentation

Official Mintlify documentation for the **Kayko EBM API**, the gateway integrators use to connect ERP/POS systems to Rwanda Revenue Authority (RRA) EBM 2.1.

## Authentication

Integrators authenticate with a business API key from the Kayko dashboard:

1. **Settings → Enable EBM**
2. **Generate API key**
3. Send `Authorization: Bearer sk_…` (or `x-api-key`) on every request

## Documentation highlights

| Feature | Details |
|---------|---------|
| **Kayko EBM gateway** | `/initialize/*`, `/customers/*`, `/constants/*`, plus sales, items, stock, and more |
| **Code examples** | cURL, JavaScript, and PHP on every endpoint |
| **Integration checklist** | Recommended order of API calls |
| **Calculations** | VAT formulas, discounts, and invoice totals |
| **Lookup tables** | Fields, enumerations, countries, currencies |
