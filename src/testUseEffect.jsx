import { useEffect, useRef, useState } from "react"


const TestUseEffect = () => {

  const [myName, setMyName] = useState(0)
  const myRefName = useRef(4)

  console.log('render');

  function changeName() {
    setMyName(preMyName => preMyName + 1 ) 
  }

  useEffect(() => {
    myRefName.current = myRefName.current + 1
  })

  // useEffect(() => {
  //   setMyName(preMyName => preMyName + 1 ) 
  // })

  return (
    <div>
      <button onClick={() => {setMyName(preMyName => preMyName + 1 )}}>{ myRefName.current }</button>
    </div>
  )
}

export default TestUseEffect