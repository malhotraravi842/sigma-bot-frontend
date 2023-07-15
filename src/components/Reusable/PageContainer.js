import DivElement from './DivElements';
import styled from 'styled-components';

const Container = styled(DivElement)`
  max-width: 1124px;
  margin: 0 auto;
  min-height: calc(100vh - 24px);
  height: calc(100vh - 24px);
  max-height: fit-content;
  padding: 32px 0;
`;

const PageContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

export default PageContainer;
