import { useState,useCallback ,useEffect,useRef} from 'react'


function App() {
 const [length, setLength] = useState(8)
 const [numberAllowed , setNumberAllowed] = useState(false)
 const [charAllowed , setCharAllowed] = useState(false)
 const [password , setPassword] = useState("")

 const passwordRef = useRef(null)

   const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"
     
    for (let i = 1; i <= length; i++){
       let char = Math.floor(Math.random()* str.length + 1)
      pass += str.charAt(char)
    }
     setPassword(pass)   
   
    }
    

   , [length,numberAllowed,charAllowed])  

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,8)
    window.navigator.clipboard.writeText(password)
  } , [password])

   useEffect(() => {
    passwordGenerator()
  
   } , [length,charAllowed,numberAllowed,passwordGenerator])

   let handlePassChange = ()=>{
      passwordGenerator();
   }

  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-6 py-6 my-8 text-orange-500 bg-slate-500'>
      <h1 className='text-white text-center py-1  my-3 text-xl'>Password generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text"
         value={password}
         className='outline-none w-full py-3 px-3'
         placeholder='Password'
         readOnly
         ref={passwordRef}
         
        />
        <button onClick={copyPasswordToClipboard} className='outline-none hover:bg-sky-700 bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
      </div>
       <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" 
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(q) => {setLength(q.target.value)}} />
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={numberAllowed}
          id='numberInput'
          onChange={() => {
            setNumberAllowed((prev) => !prev)
          }} />
           <label htmlFor='numberInput'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={numberAllowed}
          id='cahrInput'
          onChange={() => {
            setCharAllowed((prev) => !prev)
          }} />
           <label htmlFor='charInput'>Characters</label>
        </div>
       </div>
       <div className="genpass text-center mx-28 py-2 my-10 text-slate-700 bg-orange-400 hover:bg-red-300">
       <button onClick={handlePassChange}>New Password</button>
       </div>
     </div>
    </>
  )
}

export default App
