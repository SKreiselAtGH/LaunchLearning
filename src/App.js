import React from 'react';

function App() {
  return (
    <>
    
      <h1>My Electron/React App</h1>
      <button
        onClick={_ =>
          electron
            .notificationApi
            .sendNotification('Hi there!')}>g</button>
    </>
  )
}
export default App;