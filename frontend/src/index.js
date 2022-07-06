import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const [count, setCount] = React.useState(0)
    const onClick = () => setCount(c=>c +1)

  return ( 
    <dv>
        <h1>The count is {count}</h1>
        <button onClick={onClick}>Cuenta</button>
    </dv>
    
  )
}
// Mount the app to the mount point
const root = document.getElementById('app')
ReactDOM.render(<App />,root)

//export default index