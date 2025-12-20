import React from 'react'
import {useParams} from 'react-router-dom'
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'

function RoomPage() {
    const {roomId} = useParams();

    const myMeeting = async (element) => {
        const appID = 939359354;
        const serverSecret = "62ed8fb53f364933e26a75097afc80dc";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, Date.now().toString(), "Your Name:");
        // Date.now is userId, Ali is name
        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: "Copy Link",
                    url: `http://localhost:3000/room/${roomId}`
                }
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            showScreenSharingButton: true,
        });
    }
  return (
    <div>
      <div ref={myMeeting}/>
    </div>
  )
}

export default RoomPage