import React, {useContext, useState} from 'react';
import './Sidebar.css';
import {assets} from '../../../assets/assets.js';
import {Context} from '../../../context/Context.jsx';
import { RiMenuFold4Line } from "react-icons/ri";
import { LuHash } from "react-icons/lu";

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const {onSent, prevPrompts, setRecentPrompt, newChat} = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)
        await onSent(prompt)
    }
    return (
        <aside className={`sidebar ${extended ? 'extended' : 'collapsed'}`}>
            <div className={`top  ${extended ? '' : 'centered'}`}>
                <div className="menu" onClick={() => setExtended(prev => !prev)}>
                {extended ? <RiMenuFold4Line className='rotate-180'/> : <RiMenuFold4Line/>}
                </div>
                <div onClick={() => newChat()} className="new-chat">
                    <img src={assets.plus_icon} alt="Plus Icon"/>
                    <p className={`${extended ? 'block' : 'none'}`}>New Chat</p>
                </div>
                {extended ?
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompts.map((item, index) => {
                            return (
                                <div onClick={() => loadPrompt(item)} className="recent-entry">
                                    <LuHash />
                                    <p className="recent-entry-p">{item.slice(0, 18)} ...</p>
                                </div>
                            )
                        })}

                    </div>
                    : null
                }
            </div>
        </aside>
    );
}

export default Sidebar;
