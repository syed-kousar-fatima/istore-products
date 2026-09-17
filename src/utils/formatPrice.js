const formatPrice = (value, currency = "USD", locale = "en-US") => {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(0);
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatCompactPrice = (value) => {
  const amount = Number(value) || 0;

  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }

  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1)}K`;
  }

  return `$${amount}`;
};

const formatNumber = (value) => {
  return new Intl.NumberFormat("en-US").format(Number(value) || 0);
};

export {
  formatPrice,
  formatCompactPrice,
  formatNumber,
};

export default formatPrice;