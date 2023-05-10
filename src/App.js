import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Link, animateScroll as scroll } from "react-scroll";
import { withTranslation } from 'react-i18next';
import "../src/styles/style.css"
import background from "./image/backgroud_photo.png"
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator, InputField } from '@chatscope/chat-ui-kit-react';
import logo from "./image/logo.png"
import instagram from "./image/instagram.png"
import whatsapp from "./image/whatsapp.png"
import viber from "./image/viber.png"
import icon1 from "./image/icon_1.png"
import icon2 from "./image/icon_2.png"
import icon3 from "./image/icon_3.png"
import chatBotButton from "./image/chatbot.png"
import formBackground from "./image/form_panel_background.png"
import './18n';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import EuropeMap from './EuropeMap'

const API_KEY = process.env.REACT_APP_SECRET_KEY;
// "Explain things like you would to a 10 year old learning how to code."
const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
    "role": "system", "content": "Explain things like you're talking to a software professional with 2 years of experience."
}





const App = () => {


    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    const buttonRef = useRef(null);

    useEffect(() => {
        buttonRef.current.click();
    }, []);

    const { t, i18n } = useTranslation();

    const changeLanguage = (language) => {

        i18n.changeLanguage(language);
    };
    function refreshPage() {
        window.location.reload(false);
    }
    function Submit(e) {
        const formEle = document.querySelector("form");
        const formDatab = new FormData(formEle);
        fetch(
            "https://script.google.com/macros/s/AKfycbwUdF3diLr0Cjf3cCwCbDXUINcYaqSNzOe12zb--4Q7RNFC7RXYxukGhrQSrALFtt16/exec",
            {
                method: "POST",
                body: formDatab
            }
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });



    }

    const [messages, setMessages] = useState([
        {
            message: "Hello,i am GPT Assistant",
            sentTime: "now",
            sender: "ChatGPT"
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = async (message) => {
        const newMessage = {
            message,
            direction: 'outgoing',
            sender: "user"
        };

        const newMessages = [...messages, newMessage];

        setMessages(newMessages);

        setIsTyping(true);
        await processMessageToChatGPT(newMessages);
    };

    async function processMessageToChatGPT(chatMessages) { // messages is an array of messages

        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";
            if (messageObject.sender === "ChatGPT") {
                role = "assistant";
            } else {
                role = "user";
            }
            return { role: role, content: messageObject.message }
        });

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,
                ...apiMessages
            ]
        }

        await fetch("https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + API_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(apiRequestBody)
            }).then((data) => {
                return data.json();
            }).then((data) => {
                console.log(data);
                setMessages([...chatMessages, {
                    message: data.choices[0].message.content,
                    sender: "ChatGPT"
                }]);
                setIsTyping(false);
            });
    }
    
    const [formDisplay, setFormDisplay] = useState(false);

    const toggleForm = () => {
        setFormDisplay(!formDisplay);
    };
    return (
        <div className='App'>

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
            <link href="https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500;600;700&family=Oswald:wght@200;300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css" />
            <script src="https://cdn.jsdelivr.net/npm/swiper@9/swiper-element-bundle.min.js"></script>
            <header id="section1" style={{ backgroundImage: `url(${background})` }}>
                <nav className={scrolled ? 'scrolled' : ''}>
                    <div className="container_nav">
                        <div className="links">
                            <img onClick={refreshPage} className="logo" src={logo} alt="" />
                            <a className="link" onClick={refreshPage}>
                                <Link
                                    activeClass="active"
                                    to="section1"
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                >{t('Main-page')} </Link>
                            </a>
                            <a className="link">
                                <Link
                                    activeClass="active"
                                    to="section2"
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                >{t('Tours')} </Link>
                            </a>
                            <a className="link">
                                <Link
                                    activeClass="active"
                                    to="section3"
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                > {t('Question')}</Link>
                            </a>
                        </div>
                        <div className="language-switcher">
                            <div id="default_lang" className="language" onClick={() => changeLanguage("kz")} ref={buttonRef}>Kz</div>
                            <div className="language" onClick={() => changeLanguage("ru")}>Ru</div>
                        </div>
                    </div>
                </nav>
                <div className="container_header">
                    <div className="header_main">
                        <h1>GPT tour</h1>
                        <h2>{t('header_slogan')}</h2>
                        <div className="social_media">
                            <a href="https://wa.me/+77006721042" target="_blank"><img src={whatsapp} alt="" /></a>
                            <a href="https://instagram.com/gpt_tour_kz?igshid=NTc4MTIwNjQ2YQ==" target="_blank"><img src={viber} alt="" /></a>
                            <a href="https://instagram.com/gpt_tour_kz?igshid=NTc4MTIwNjQ2YQ==" target="_blank"><img src={instagram} alt="" /></a>
                        </div>

                    </div>
                </div>
            </header>
            <div className="infoBlock">
                <div className="container">
                    <h1 className="title">{t('why')}</h1>
                    <div className="advantages_block">
                        <div className="advantages">
                            <img id="alter_block" src={icon1} alt="" />
                            <h2>{t('advantage-1')}
                            </h2>
                        </div>
                        <div className="advantages">
                            <img src={icon2} alt="" />
                            <h2> {t('advantage-2')}</h2>
                        </div>
                        <div className="advantages">
                            <img src={icon3} alt="" />
                            <h2>{t('advantage-3')}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="slider" id="section2">
                <div className="container">
                    <h1 className="title">{t("Tours")}</h1>
                    <EuropeMap width={800} height={600} />
                </div>
            </div>
            <div className="form_panel" id="section3" style={{backgroundImage:`url(${formBackground})`}}>
                <div className="container">
                    <h1 className="title">{t("form")}</h1>
                    <form className="form" onSubmit={(e) => Submit(e)}>
                        <input id="form_input" className="form_panel_input" placeholder={t("form-input-name")} name="Name" type="text" />
                        <input if="form_input" className="form_panel_input" placeholder={t("form-input-number")} name="Number" type="text" />
                        <input className="form_panel_button" value={t("send")} name="Name" type="submit" />
                    </form>
                </div>
            </div>

            <footer>
                <div className="container">
                    <div className="footer_content">
                        <h1 className="title">GPT tour</h1>
                        <div className="footer_links">
                            <a className="footer_link">{t('Main-page')}</a>
                            <a className="footer_link">{t('Tours')}</a>
                            <a className="footer_link">{t('Question')}</a>
                        </div>
                        <div className="social_media">
                            <a href="https://wa.me/+77006721042" target="_blank"><img src={whatsapp} alt="" /></a>
                            <a href="https://instagram.com/gpt_tour_kz?igshid=NTc4MTIwNjQ2YQ==" target="_blank"><img src={viber} alt="" /></a>
                            <a href="https://instagram.com/gpt_tour_kz?igshid=NTc4MTIwNjQ2YQ==" target="_blank"><img src={instagram} alt="" /></a>
                        </div>
                    </div>
                </div>
            </footer>
            <button
                className="open-button"
                onClick={toggleForm}
                style={{ backgroundImage: `url(${chatBotButton})` }}
            ></button>

            <div className="chat-popup" id="myForm" style={{ display: formDisplay ? "block" : "none" }}>
                <div style={{ position: "relative", height: "600px", width: "500px", borderRadius: "15px" }}>
                    <MainContainer>
                        <ChatContainer >
                            <MessageList
                                scrollBehavior="smooth"
                                typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
                            >
                                {messages.map((message, i) => {
                                    console.log(message)
                                    return <Message key={i} model={message} />
                                })}
                            </MessageList>
                            <MessageInput attachButton="false" placeholder="Type message here" onSend={handleSend} />
                        </ChatContainer>=
                    </MainContainer>
                </div>
            </div>
        </div>
    )

}

export default withTranslation()(App)
