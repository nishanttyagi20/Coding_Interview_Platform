import React, { useContext, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { SocketContext } from '../../Context'
import exa from '../../ExApp.module.css';
import './Options.css'

import CallIcon from './call.svg'
import CopyIcon from './copy.svg'
import EndCallIcon from './cut.svg'

const Options = ({ children }) => {
  const {
    me,
    name,
    setName,
    callAccepted,
    leaveCall,
    callUser,
    callEnded
  } = useContext(SocketContext)

  const [idToCall, setIdToCall] = useState('')
  
  return (
    <div className='optionsContainer'>
        <div>
            <input className={exa.input} type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name'/>
            <CopyToClipboard text={me}>
              <button className={exa.button}>
                <img src={CopyIcon} alt='Copy ID'/>
              </button>
            </CopyToClipboard>
        </div>
        <div>
            <input className={exa.input} type='text' value={idToCall} onChange={(e) => setIdToCall(e.target.value)} placeholder='ID to Call'/>
          { callAccepted && !callEnded ? (
            <button className={exa.button}
              onClick={leaveCall}
            >
              <img src={EndCallIcon} alt='Hang Up'/>
            </button>
            ) : (
            <button className={exa.button}
              onClick={() => callUser(idToCall)}
            >
              <img src={CallIcon} alt='Call'/>
            </button>
          )}
        </div>
      {children}
    </div>
  )
}

export default Options