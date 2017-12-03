import styled from 'react-emotion';
import { mediaQueries } from '../utils/media-queries';

const Container = styled.div`
  width: 100%;
  padding: 0 1rem;
  margin: 0 auto;

  ${mediaQueries.small`
    max-width: 540px;
  `};

  ${mediaQueries.medium`
    max-width: 720px;
  `};

  ${mediaQueries.large`
    max-width: 960px;
  `};

  ${mediaQueries.xLarge`
    max-width: 1140px;
  `};
`;

export default Container;
