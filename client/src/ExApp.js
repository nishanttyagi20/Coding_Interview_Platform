import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import Notifications from './components/Notification/Notifications';
import Options from './components/Options/Options';
import Compiler from './components/Compiler/Compiler';
import Modal from 'react-modal';
import { ContextProvider } from './Context';
import ex from './ExApp.module.css';

function ExApp() {
   return (
    <div className={ex.body}>
    <ContextProvider >
    <div className={ex.main}>
      <div className={ex.left}>
        <VideoPlayer />
        <Options className={ex.button}>
          <Notifications  />
        </Options>
      </div>
      <div className={ex.right}> 
      {/* <Qu />    */}
        <Compiler />
       </div>
    </div>
    </ContextProvider>
       </div>
  );
  }
export default ExApp;
