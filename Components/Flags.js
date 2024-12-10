// currencyFlags.js
export const currencyToCountryMap = {
    // Existing mappings
    'USD': 'US',
    'EUR': 'EU',
    'GBP': 'GB',
    'JPY': 'JP',
    'AUD': 'AU',
    'CAD': 'CA',
    'CHF': 'CH',
    'CNY': 'CN',
    'HKD': 'HK',
    'SGD': 'SG',
    'NZD': 'NZ',
    'INR': 'IN',
    'BRL': 'BR',
    'RUB': 'RU',
    'KRW': 'KR',
    'ZAR': 'ZA',
    'MXN': 'MX',
    'AED': 'AE',
    'SAR': 'SA',
    'TRY': 'TR',
    'SEK': 'SE',
    'NOK': 'NO',
    'DKK': 'DK',
    'PLN': 'PL',
    'ILS': 'IL',
    'PHP': 'PH',
    'IDR': 'ID',
    'THB': 'TH',
    'MYR': 'MY',
    'VND': 'VN',

    // African Countries
    'NGN': 'NG', // Nigeria
    'KES': 'KE', // Kenya
    'EGP': 'EG', // Egypt
    'MAD': 'MA', // Morocco
    'GHS': 'GH', // Ghana
    'XAF': 'CM', // Central African CFA franc (Cameroon as representative)
    'XOF': 'SN', // West African CFA franc (Senegal as representative)

    // More Asian Countries
    'PKR': 'PK', // Pakistan
    'BDT': 'BD', // Bangladesh
    'LKR': 'LK', // Sri Lanka
    'AZN': 'AZ', // Azerbaijan
    'KZT': 'KZ', // Kazakhstan
    'UZS': 'UZ', // Uzbekistan

    // South American Countries
    'ARS': 'AR', // Argentina
    'CLP': 'CL', // Chile
    'COP': 'CO', // Colombia
    'PEN': 'PE', // Peru
    'PYG': 'PY', // Paraguay
    'UYU': 'UY', // Uruguay

    // Middle Eastern Countries
    'QAR': 'QA', // Qatar
    'BHD': 'BH', // Bahrain
    'KWD': 'KW', // Kuwait
    'OMR': 'OM', // Oman

    // More European Countries
    'HUF': 'HU', // Hungary
    'CZK': 'CZ', // Czech Republic
    'RON': 'RO', // Romania
    'UAH': 'UA', // Ukraine
    'BYN': 'BY', // Belarus
};

export const getCountryCodeForCurrency = (currencyCode) => {
    return currencyToCountryMap[currencyCode] || null;
};

export const getFlagUrl = (currencyCode) => {
    const countryCode = getCountryCodeForCurrency(currencyCode);
    return countryCode
        ? `https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`
        : null;
};

// Optional: Function to get full country name for a currency code
export const getCountryNameForCurrency = (currencyCode) => {
    const countryMap = {
        'NG': 'Nigeria',
        'US': 'United States',
        'GB': 'United Kingdom',
        // Add more country names as needed
    };
    const countryCode = currencyToCountryMap[currencyCode];
    return countryCode ? countryMap[countryCode] : null;
};