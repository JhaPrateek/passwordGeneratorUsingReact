import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed,setNumberAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false);
  const [password,setPassword]=useState("");

  const passwordGenerator=useCallback(()=>{
      let pass="";
      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      
      if(numberAllowed) str+="0123456789"
      if(charAllowed) str+="!@#$%&*(){}[]~+=_-"

      for(let i=1;i<=length;i++){
        let char=Math.floor(Math.random()*str.length+1);
        pass+=str.charAt(char)
      } 
      setPassword(pass); 
  },
  [length,numberAllowed,charAllowed,setPassword]);

  useEffect(()=>{
      passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])

  const passwordRef=useRef(null);

  const copyPasswordToclipboard=useCallback(()=>{
    passwordRef.current?.setSelectionRange(0,100)
      passwordRef.current?.select();  
      window.navigator.clipboard.writeText(password)
  },[password])

  return (
   <>
        <div className='w-full max-w-md mx-auto shadow-mdrounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
            <h1 className='text-white text-center'>Password Generator</h1>
            <div className='flex shadow rounded-lg overflow-hidden mb-4'>
              <input
                type='text'
                value={password}
                className='outline-none w-full py-1 px-3'
                placeholder='Password'
                ref={passwordRef}
              />
              <button 
              onClick={copyPasswordToclipboard}
              className='bg-orange-500 text-white p-2 hover:bg-orange-600 active:bg-orange-700'>Copy</button>
            </div>
            <div className='flex text-sm gap-x-2'>
              <div className='flex items-center gap-x-1'>
                <input
                type='range'
                min={6}
                max={100}
                value={length}
                onChange={(e)=>{
                  setLength(e.target.value)
                }}
                />
                <label>Length: {length}</label>
              </div>
              <div className='flex items-center gap-x-1'>
                  <input
                    type='checkbox'
                    defaultChecked={numberAllowed}
                    id='numberInput'
                    onChange={()=>{
                      setNumberAllowed((prev)=>!prev)
                    }}
                  />
                  <label htmlFor='numberInput'>Numbers</label>
              </div>
              <div className='flex items-center gap-x-1'>
                  <input
                    type='checkbox'
                    defaultChecked={charAllowed}
                    id='charInput'
                    onChange={()=>{
                      setCharAllowed((prev)=>!prev)
                    }}
                  />
                  <label htmlFor='charInput'>Character</label>
              </div>
            </div>
        </div>
   </>
  )
}

export default App
