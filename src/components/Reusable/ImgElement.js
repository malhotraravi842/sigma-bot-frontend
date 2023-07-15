import styled from 'styled-components';

const ImgElement = styled.img`
  width: ${(props) => (props.width ? props.width : '')};
  height: ${(props) => (props.height ? props.height : '')};
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
  border-radius: ${(props) => (props.bRadius ? props.bRadius : '')};
  visibility: ${(props) => (props.visibility ? props.visibility : '')};
`;

export default ImgElement;
