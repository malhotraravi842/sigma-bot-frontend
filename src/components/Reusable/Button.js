import styled, { css } from 'styled-components';

const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  outline: none;
  width: ${(props) => (props.width ? props.width : 'fit-content')};
  height: ${(props) => (props.height ? props.height : '44px')};
  padding: ${(props) => (props.padding ? props.padding : '0 40px')};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '16px')};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : '5px')};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 500)};
  margin: ${(props) => (props.margin ? props.margin : '')};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '')};
  margin-right: ${(props) => (props.marginRight ? props.marginRight : '')};
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '')};
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '')};

  &:active,
  &:focus {
    outline: none;
  }

  @media (max-width: 1023.5px) {
    width: ${(props) => (props.widthMd ? props.widthMd : '')};
    height: ${(props) => (props.heightMd ? props.heightMd : '')};
    padding: ${(props) => (props.paddingMd ? props.paddingMd : '')};
    margin: ${(props) => (props.marginMd ? props.marginMd : '')};
    margin-top: ${(props) => (props.marginTopMd ? props.marginTopMd : '')};
    margin-right: ${(props) => (props.marginRightMd ? props.marginRightMd : '')};
    margin-bottom: ${(props) => (props.marginBottomMd ? props.marginBottomMd : '')};
    margin-left: ${(props) => (props.marginLeftMd ? props.marginLeftMd : '')};
    font-size: ${(props) => (props.fontSizeMd ? props.fontSizeMd : '')};
  }

  @media (max-width: 767.5px) {
    width: ${(props) => (props.widthSm ? props.widthSm : '')};
    height: ${(props) => (props.heightSm ? props.heightSm : '')};
    padding: ${(props) => (props.paddingSm ? props.paddingSm : '')};
    margin: ${(props) => (props.marginSm ? props.marginSm : '')};
    margin-top: ${(props) => (props.marginTopSm ? props.marginTopSm : '')};
    margin-right: ${(props) => (props.marginRightSm ? props.marginRightSm : '')};
    margin-bottom: ${(props) => (props.marginBottomSm ? props.marginBottomSm : '')};
    margin-left: ${(props) => (props.marginLeftSm ? props.marginLeftSm : '')};
    font-size: ${(props) => (props.fontSizeSm ? props.fontSizeSm : '')};
  }

  /* Primary Blue Button */
  ${(props) =>
    props.primaryBlue &&
    css`
      background-color: #0470e1;
      color: #fff;
    `}

  ${(props) =>
    props.primaryRed &&
    css`
      background-color: #e65252;
      color: #fff;
    `}

  ${(props) =>
    props.disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.6;
    `}
`;

const Button = (props) => {
  return <Btn {...props}></Btn>;
};

export default Button;
