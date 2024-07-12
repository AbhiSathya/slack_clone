import './App.css'
import Messages from './components/Messages/Messages.component'
import SideBar from './components/SideBar/SideBar.component'

function App() {
  
  return (
    <>
      <SideBar />
      <div style = {{ paddingLeft : '275px' }} >
        <Messages />
      </div>
    </>
  )
}

export default App
