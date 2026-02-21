# 🏥 Doctor-Patient Chat Integration Guide

## Overview

This guide explains how to enable real-time chat and video calling between **doctors** (well-spring-admin) and **patients** (paper-starter-kit) using a shared WebSocket server.

## 🎯 Architecture

```
┌─────────────────────────┐         ┌─────────────────────────┐
│   well-spring-admin     │         │   paper-starter-kit     │
│   (Doctor Portal)       │         │   (Patient Portal)      │
│                         │         │                         │
│  - DoctorChat.tsx       │         │  - RealtimeChat.tsx     │
│  - socketService.ts     │         │  - socketService.ts     │
│  - webRTCService.ts     │         │  - webRTCService.ts     │
└───────────┬─────────────┘         └───────────┬─────────────┘
            │                                   │
            │         WebSocket (Socket.io)     │
            └────────────┬──────────────────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │  WebSocket Server      │
            │  (paper-starter-kit/   │
            │   server/server.js)    │
            │  Port: 3001            │
            └────────────────────────┘
```

## 📁 Files Created in well-spring-admin

```
well-spring-admin/
├── src/
│   ├── services/
│   │   ├── socketService.ts      # WebSocket client (with role support)
│   │   └── webRTCService.ts      # WebRTC for video calls
│   ├── components/
│   │   ├── VideoCall.tsx         # Video call UI
│   │   └── IncomingCall.tsx      # Incoming call notification
│   └── pages/
│       └── DoctorChat.tsx        # Doctor chat interface
└── package.json                  # Updated with socket.io-client
```

## 🚀 Setup Instructions

### Step 1: Install Dependencies

#### For well-spring-admin (Doctor Portal)
```bash
cd "c:\Users\Ragul P\well-spring-admin"
npm install
```

This will install the newly added `socket.io-client` dependency.

#### For paper-starter-kit (Patient Portal)
```bash
cd "c:\Users\Ragul P\paper-starter-kit"
npm install
```

### Step 2: Start the WebSocket Server (ONLY ONCE)

The WebSocket server is located in `paper-starter-kit/server/`. You only need to run it once, and both applications will connect to it.

```bash
cd "c:\Users\Ragul P\paper-starter-kit\server"
npm install  # First time only
npm start
```

You should see:
```
🚀 WebSocket server running on http://localhost:3001
📡 Socket.io ready for connections
```

**Keep this terminal window open!**

### Step 3: Start the Doctor Portal (well-spring-admin)

In a **new terminal**:
```bash
cd "c:\Users\Ragul P\well-spring-admin"
npm run dev
```

The doctor portal will run on `http://localhost:5173` (or another port if 5173 is taken).

### Step 4: Start the Patient Portal (paper-starter-kit)

In **another new terminal**:
```bash
cd "c:\Users\Ragul P\paper-starter-kit"
npm run dev
```

The patient portal will run on a different port (e.g., `http://localhost:5174`).

### Step 5: Add Route to well-spring-admin

You need to add the DoctorChat route to your App.tsx in well-spring-admin.

**File: `well-spring-admin/src/App.tsx`**

Add the import:
```typescript
import DoctorChat from "./pages/DoctorChat";
```

Add the route:
```typescript
<Route path="/doctor-chat" element={<DoctorChat />} />
```

## 🎮 How to Use

### For Doctors (well-spring-admin)

1. Navigate to `http://localhost:5173/doctor-chat`
2. Enter your name (e.g., "Smith")
3. Click "Join as Doctor"
4. You'll see a list of online patients on the left
5. Click on a patient to start chatting
6. Click the video icon to start a video consultation

### For Patients (paper-starter-kit)

1. Navigate to `http://localhost:5174/chat` (or whatever port it's running on)
2. Enter your name
3. Click "Join Chat"
4. You'll see doctors in the user list (they'll have "Dr." prefix)
5. Click on a doctor to chat
6. Accept incoming video calls from doctors

## 🔧 Configuration

### Changing the Server Port

If port 3001 is already in use, you can change it:

**1. Update server port:**
Edit `paper-starter-kit/server/server.js`:
```javascript
const PORT = process.env.PORT || 3001; // Change to your preferred port
```

**2. Update client connections:**

In `well-spring-admin/src/services/socketService.ts`:
```typescript
private serverUrl = 'http://localhost:3001'; // Update to match server port
```

In `paper-starter-kit/src/services/socketService.ts`:
```typescript
private serverUrl = 'http://localhost:3001'; // Update to match server port
```

### Running on Different Machines

If you want to run the doctor and patient portals on different computers:

1. Find the IP address of the machine running the WebSocket server
2. Update `serverUrl` in both `socketService.ts` files:
   ```typescript
   private serverUrl = 'http://192.168.1.XXX:3001'; // Replace with actual IP
   ```

## ✨ Features

### Chat Features
- ✅ Real-time messaging between doctors and patients
- ✅ Typing indicators
- ✅ Online status
- ✅ Message timestamps
- ✅ Direct messaging (1-on-1)

### Video Call Features
- ✅ Video consultations
- ✅ Audio-only calls
- ✅ Camera toggle
- ✅ Microphone mute/unmute
- ✅ Screen sharing (for sharing medical reports, etc.)
- ✅ Call duration timer
- ✅ Incoming call notifications

## 🎨 Customization

### Distinguishing Doctors from Patients

The system automatically identifies users by their role:

**Doctors:**
- Join with "Dr." prefix in their name
- Have `role: 'doctor'` in their user object
- See only patients in their sidebar

**Patients:**
- Join without "Dr." prefix
- Have `role: 'patient'` (or undefined) in their user object
- See all users (including doctors)

### Styling

Both portals use Tailwind CSS and shadcn/ui components. You can customize:
- Colors in `tailwind.config.ts`
- Component styles in individual files
- Animations and transitions

## 🐛 Troubleshooting

### "Cannot connect to server"
- Make sure the WebSocket server is running
- Check that the port (3001) is not blocked by firewall
- Verify `serverUrl` matches the server port

### "No patients/doctors showing up"
- Make sure both portals are connected to the same server
- Check browser console for connection errors
- Refresh both applications

### Video call not working
- Grant camera/microphone permissions in browser
- Check if another app is using the camera
- Try using Chrome or Edge (best WebRTC support)

### Different ports for dev servers
- If both apps try to use port 5173, Vite will automatically assign a different port
- Check the terminal output to see which port each app is using
- Update your browser URLs accordingly

## 📊 Testing the Integration

### Test Scenario 1: Basic Chat
1. Open doctor portal in one browser window
2. Open patient portal in another browser window (or different browser)
3. Join as doctor in one, patient in the other
4. Send messages back and forth
5. Verify typing indicators work

### Test Scenario 2: Video Call
1. Have both doctor and patient online
2. Doctor initiates video call to patient
3. Patient accepts the call
4. Test video/audio toggles
5. Test screen sharing
6. End the call

### Test Scenario 3: Multiple Users
1. Open multiple patient windows
2. Open doctor window
3. Doctor should see all patients
4. Doctor can chat with each patient individually

## 🔒 Security Considerations

### Current Implementation
- ✅ WebSocket connection validation
- ✅ Role-based user identification
- ✅ Direct messaging (messages only go to intended recipient)

### For Production
- 🔒 Add user authentication (login system)
- 🔒 Use HTTPS/WSS (required for production WebRTC)
- 🔒 Implement message encryption
- 🔒 Add rate limiting
- 🔒 Store chat history in database
- 🔒 Add HIPAA compliance measures (for medical data)

## 📝 Next Steps

### Recommended Enhancements
1. **Add Authentication**: Implement proper login for doctors and patients
2. **Message History**: Store messages in a database
3. **File Sharing**: Allow sharing of medical reports/images
4. **Appointment Scheduling**: Integrate with calendar
5. **Notifications**: Add push notifications for new messages
6. **Chat History**: Persist conversations
7. **User Profiles**: Add detailed doctor/patient profiles

## 🎉 Summary

You now have a complete doctor-patient communication system with:
- ✅ Real-time chat
- ✅ Video consultations
- ✅ Separate interfaces for doctors and patients
- ✅ Shared WebSocket server
- ✅ Easy to deploy and scale

**Both portals connect to the same WebSocket server, enabling seamless communication!**

---

**Need Help?** Check the browser console for errors or refer to the main `WEBSOCKET_SETUP.md` in paper-starter-kit for more details.
