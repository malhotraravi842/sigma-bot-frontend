import styled, { css } from 'styled-components';

const DivElement = styled.div`
  width: ${(props) => (props.width ? props.width : '')};
  height: ${(props) => (props.height ? props.height : '')};
  min-height: ${(props) => (props.minHeight ? props.minHeight : '')};
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
  position: ${(props) => (props.position ? props.position : '')};
  display: ${(props) => (props.display ? props.display : '')};
  align-items: ${(props) => (props.alignItems ? props.alignItems : '')};

  ${(props) =>
    props.displayCenter &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `}

  ${(props) =>
    props.displayBtw &&
    css`
      display: flex;
      justify-content: space-between;
    `}

  ${(props) =>
    props.displayBtwCenter &&
    css`
      display: flex;
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.bgBlue &&
    css`
      background-color: #0077b6;
    `}

  ${(props) =>
    props.bgWhite &&
    css`
      background-color: #edf2f4;
    `}

  ${(props) =>
    props.boxShadow &&
    css`
      box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.15);
    `}
`;

export default DivElement;
