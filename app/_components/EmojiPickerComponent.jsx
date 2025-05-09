import EmojiPicker from 'emoji-picker-react'
import React from 'react'
import { useState } from 'react'

function EmojiPickerComponent({children, setEmojiIcon}) {
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  return (
    <div>
        <div onClick={()=> setOpenEmojiPicker(true)}>
            {children}
        </div>
        {openEmojiPicker && 
        <div className='absolute z-50'>
             <EmojiPicker 
             emojiStyle='google'
             onEmojiClick={(e)=>{
                setEmojiIcon(e.emoji) 
                setOpenEmojiPicker(false)
             }}
             />
        </div>
}
     
    </div>
  )
}

export default EmojiPickerComponent
