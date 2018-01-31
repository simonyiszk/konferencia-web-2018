// eslint-disable-next-line import/prefer-default-export
export const gap = value => `
  margin: ${value
    .trim()
    .split(/\s+/)
    .map(amount => `-${amount}`)
    .join(' ')};

  > * {
    padding: ${value};
  }
`;
