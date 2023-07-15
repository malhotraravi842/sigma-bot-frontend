import { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { DivElement, TextWrapper } from '../Reusable';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
  TypingIndicator,
  Avatar,
} from '@chatscope/chat-ui-kit-react';
import { chatCompletion } from '../../lib/api';
import constants from '../../constants';
import { updateSelectedText } from '../../actions';

const formatMessage = (model) => {
  return {
    message: model.content,
    direction: model.role === 'user' ? 'outgoing' : 'incoming',
  };
};

const ChatBot = ({ parsedText, updateSelectedText }) => {
  const [loader, setLoader] = useState(false);
  const [messageList, setMessageList] = useState('');
  const [parsedDocData, setParsedDocData] = useState('');
  const [isDataFeeded, setIsDataFeeded] = useState(false);

  useEffect(() => {
    if (parsedText) {
      let data = [
        { role: 'user', content: 'Please analyze this report.' },
        { role: 'user', content: parsedText },
      ];

      setParsedDocData(data);
    }
    // eslint-disable-next-line
  }, [parsedText]);

  useEffect(() => {
    if (parsedDocData && !isDataFeeded) {
      pingChatGpt(messageList);
    }
    // eslint-disable-next-line
  }, [parsedDocData]);

  const pingChatGpt = (message) => {
    let messages = [...parsedDocData, ...message];

    setLoader(true);
    let data = {
      model: 'gpt-3.5-turbo',
      messages: messages,
    };
    chatCompletion(data)
      .then((res) => {
        let responseMessage = res?.data?.choices[0]?.message;
        if (isDataFeeded) {
          setMessageList([...message, responseMessage]);
        } else {
          setParsedDocData([...parsedDocData, responseMessage]);
          setIsDataFeeded(true);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    const chatContainer = document.getElementById('chat-box-container');
    chatContainer.addEventListener('mouseup', selectTextHandler);

    return () => {
      chatContainer.removeEventListener('mouseup', selectTextHandler);
    };
  }, []);

  const selectTextHandler = () => {
    const selection = window.getSelection().toString();
    updateSelectedText(selection);
  };

  const sendMessageHandler = (message) => {
    let data = [...messageList];
    data.push({
      role: 'user',
      content: message,
    });
    setMessageList(data);
    pingChatGpt(data);
    updateSelectedText('');
  };

  return (
    <DivElement id="chat-box-container" height="100%" bgWhite boxShadow bRadius="6px">
      <MainContainer responsive style={{ borderRadius: 'inherit' }}>
        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Content>
              <TextWrapper>Ask your queries</TextWrapper>
            </ConversationHeader.Content>
          </ConversationHeader>
          <MessageList typingIndicator={loader ? <TypingIndicator content="typing" /> : null}>
            {isDataFeeded && (
              <Message
                model={formatMessage({
                  role: 'assistant',
                  content:
                    'Congratulations!🥳\n\nYou have successfully uploaded your document. \n\n You can ask your queries now.',
                })}>
                <Avatar src={constants.BOT_PROFILE_PIC_URL} />
              </Message>
            )}

            {messageList &&
              messageList.map((model, index) => (
                <Message id={index} model={formatMessage(model)}>
                  {model.role === 'assistant' && <Avatar src={constants.BOT_PROFILE_PIC_URL} />}
                </Message>
              ))}
          </MessageList>
          <MessageInput
            attachButton={false}
            placeholder="Type message here"
            onSend={sendMessageHandler}
          />
        </ChatContainer>
      </MainContainer>
    </DivElement>
  );
};

const mapStateToProps = (state) => ({
  parsedText: state.ocr.parsedText,
});

const mapDispatchToProps = (dispatch) => ({
  updateSelectedText: (data) => dispatch(updateSelectedText(data)),
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(ChatBot);
