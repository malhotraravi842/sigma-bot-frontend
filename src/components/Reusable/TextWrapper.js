import styled, { css } from 'styled-components';

const TextWrapper = styled.div`
  width: ${(props) => (props.width ? props.width : '')};
  height: ${(props) => (props.height ? props.height : '')};
  font-size: ${(props) => (props.fontSize ? props.fontSize : 'inherit')};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 'inherit')};
  padding: ${(props) => (props.padding ? props.padding : '')};
  padding-top: ${(props) => (props.paddingTop ? props.paddingTop : '')};
  padding-right: ${(props) => (props.paddingRight ? props.paddingRight : '')};
  padding-bottom: ${(props) => (props.paddingBottom ? props.paddingBottom : '')};
  padding-left: ${(props) => (props.paddingLeft ? props.paddingLeft : '')};
  margin: ${(props) => (props.margin ? props.margin : '')};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '')};
  margin-right: ${(props) => (props.marginRight ? props.marginRight : '')};
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '')};
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '')};

  ${(props) =>
    props.primary &&
    css`
      color: #caf0f8;
    `}
`;

export default TextWrapper;
