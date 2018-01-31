import { css } from 'emotion';

export const breakpoints = {
  small: 576,
  medium: 768,
  large: 992,
  xLarge: 1200,
};

export const mediaQueries = Object.keys(breakpoints).reduce(
  (accumulator, label) => {
    // eslint-disable-next-line no-param-reassign
    accumulator[label] = cls =>
      css`
        @media (min-width: ${breakpoints[label]}px) {
          ${cls};
        }
      `;
    return accumulator;
  },
  {},
);
