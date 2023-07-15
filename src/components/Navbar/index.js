import { DivElement, TextWrapper } from '../Reusable';

const Navbar = () => {
  return (
    <DivElement width="100%" height="24px" padding="0 50px" bgBlue displayBtwCenter>
      <DivElement>
        <TextWrapper primary fontSize="18px">
          SigmaBot
        </TextWrapper>
      </DivElement>
    </DivElement>
  );
};

export default Navbar;
