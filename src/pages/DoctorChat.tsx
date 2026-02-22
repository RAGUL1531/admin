import { useState, useEffect, useRef } from 'react';
import { Send, Video, Phone, Users, Stethoscope, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { socketService, type User, type ChatMessage } from '@/services/socketService';
import { webRTCService } from '@/services/webRTCService';
import VideoCall from '@/components/VideoCall';
import IncomingCall from '@/components/IncomingCall';

export default function DoctorChat() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [patients, setPatients] = useState<User[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<User | null>(null);
  const [isTyping, setIsTyping] = useState<{ [key: string]: boolean }>({});
  const [isConnected, setIsConnected] = useState(false);
  const [doctorName, setDoctorName] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  
  // Video call states
  const [inCall, setInCall] = useState(false);
  const [isCallInitiator, setIsCallInitiator] = useState(false);
  const [incomingCall, setIncomingCall] = useState<{
    callerId: string;
    callerName: string;
    callerAvatar?: string;
    callType: 'video' | 'audio';
  } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isJoined && doctorName) {
      initializeSocket();
    }

    return () => {
      socketService.disconnect();
    };
  }, [isJoined, doctorName]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initializeSocket = () => {
    const socket = socketService.connect({
      name: `Dr. ${doctorName}`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=doctor-${doctorName}`,
      role: 'doctor' // Mark as doctor
    });

    setIsConnected(true);

    // Register WebRTC listeners AFTER socket is connected
    webRTCService.setupSocketListeners();

    // Listen for users update
    socketService.onUsersUpdate((updatedUsers) => {
      // Separate doctors and patients
      const allPatients = updatedUsers.filter(u => 
        u.socketId !== socket?.id && u.role !== 'doctor'
      );
      setPatients(allPatients);
      setUsers(updatedUsers);
      
      const current = updatedUsers.find(u => u.socketId === socket?.id);
      if (current) setCurrentUser(current);
    });

    // Listen for messages
    socketService.onMessage((message) => {
      setMessages(prev => [...prev, message]);
    });

    // Listen for typing
    socketService.onTyping(({ userId, userName, isTyping: typing }) => {
      setIsTyping(prev => ({ ...prev, [userId]: typing }));
      
      if (typing) {
        setTimeout(() => {
          setIsTyping(prev => ({ ...prev, [userId]: false }));
        }, 3000);
      }
    });

    // Listen for incoming calls
    socketService.onIncomingCall((callData) => {
      setIncomingCall(callData);
    });

    // Listen for call accepted - caller is already in the call,
    // so we don't need to update state here (selectedPatient was already set)
    socketService.onCallAccepted(() => {
      console.log('✅ Call accepted by recipient');
    });

    // Listen for call rejected
    socketService.onCallRejected(() => {
      alert('Call was rejected');
    });

    // Listen for call ended
    socketService.onCallEnded(() => {
      setInCall(false);
    });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (doctorName.trim()) {
      setIsJoined(true);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    socketService.sendMessage(input, selectedPatient?.socketId);
    setInput('');
    
    // Clear typing indicator
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    socketService.sendTyping(false, selectedPatient?.socketId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);

    // Send typing indicator
    socketService.sendTyping(true, selectedPatient?.socketId);

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Stop typing after 2 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      socketService.sendTyping(false, selectedPatient?.socketId);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVideoCall = (patient: User) => {
    setSelectedPatient(patient);
    socketService.initiateCall(patient.socketId, 'video');
    setIsCallInitiator(true);
    setInCall(true);
  };

  const handleAcceptCall = async () => {
    if (!incomingCall) return;

    try {
      // Initialize with audio-only mode (matching VideoCall default)
      await webRTCService.initializeLocalStream(false, true);
    } catch (error) {
      console.error('Error initializing media:', error);
      // Continue anyway - UI will still show
    }
    
    // Accept the call and show UI regardless of media initialization
    socketService.acceptCall(incomingCall.callerId);
    
    const caller = users.find(u => u.socketId === incomingCall.callerId);
    setSelectedPatient(caller || null);
    setIsCallInitiator(false);
    setInCall(true);
    setIncomingCall(null);
  };

  const handleRejectCall = () => {
    if (incomingCall) {
      socketService.rejectCall(incomingCall.callerId);
      setIncomingCall(null);
    }
  };

  const handleEndCall = () => {
    setInCall(false);
    setSelectedPatient(null);
    setIsCallInitiator(false);
  };

  const filteredMessages = selectedPatient
    ? messages.filter(
        m =>
          (m.sender.socketId === selectedPatient.socketId && m.recipientId === currentUser?.socketId) ||
          (m.sender.socketId === currentUser?.socketId && m.recipientId === selectedPatient.socketId)
      )
    : [];

  // Join screen
  if (!isJoined) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Doctor Portal</h1>
            <p className="text-muted-foreground">Connect with your patients</p>
          </div>
          
          <form onSubmit={handleJoin} className="space-y-4">
            <Input
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              placeholder="Enter your name"
              className="text-center text-lg"
              autoFocus
            />
            <Button type="submit" className="w-full" size="lg">
              Join as Doctor
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  // Video call screen
  if (inCall && selectedPatient) {
    return (
      <VideoCall
        recipientId={selectedPatient.socketId}
        recipientName={selectedPatient.name}
        isInitiator={isCallInitiator}
        onEndCall={handleEndCall}
      />
    );
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Incoming Call Modal */}
      {incomingCall && (
        <IncomingCall
          callerName={incomingCall.callerName}
          callerAvatar={incomingCall.callerAvatar}
          callType={incomingCall.callType}
          onAccept={handleAcceptCall}
          onReject={handleRejectCall}
        />
      )}

      {/* Patients Sidebar */}
      <Card className="w-80 border-r rounded-none">
        <div className="p-4 border-b bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="border-2 border-white">
              <AvatarImage src={currentUser?.avatar} />
              <AvatarFallback className="bg-white text-blue-600">
                {currentUser?.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-white">
              <h2 className="font-semibold">{currentUser?.name}</h2>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-xs">Online</span>
              </div>
            </div>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-180px)]">
          <div className="p-2 space-y-1">
            <div className="px-3 py-2 flex items-center justify-between">
              <p className="text-xs text-muted-foreground font-medium">
                PATIENTS ({patients.length})
              </p>
              <Badge variant="secondary" className="text-xs">
                {patients.filter(p => p.online).length} Online
              </Badge>
            </div>
            
            {patients.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No patients online</p>
              </div>
            ) : (
              patients.map((patient) => (
                <div
                  key={patient.socketId}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedPatient?.socketId === patient.socketId
                      ? 'bg-primary/10 border border-primary/20'
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => setSelectedPatient(patient)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={patient.avatar} />
                        <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{patient.name}</p>
                      {isTyping[patient.socketId] && (
                        <p className="text-xs text-muted-foreground">typing...</p>
                      )}
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVideoCall(patient);
                      }}
                    >
                      <Video className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </Card>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedPatient ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedPatient.avatar} />
                    <AvatarFallback>{selectedPatient.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-xl font-bold">{selectedPatient.name}</h1>
                    <p className="text-sm text-muted-foreground">Patient</p>
                  </div>
                </div>
                <Button
                  size="lg"
                  onClick={() => handleVideoCall(selectedPatient)}
                  className="gap-2"
                >
                  <Video className="w-5 h-5" />
                  Video Consultation
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4 max-w-4xl mx-auto">
                {filteredMessages.map((message) => {
                  const isOwn = message.sender.socketId === currentUser?.socketId;
                  return (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${isOwn ? 'flex-row-reverse' : ''}`}
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={message.sender.avatar} />
                        <AvatarFallback>
                          {message.sender.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`flex-1 ${isOwn ? 'text-right' : ''}`}>
                        <div className="flex items-center gap-2 mb-1">
                          {!isOwn && (
                            <span className="text-sm font-medium">
                              {message.sender.name}
                            </span>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <div
                          className={`inline-block px-4 py-2 rounded-2xl max-w-md ${
                            isOwn
                              ? 'bg-blue-600 text-white'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="whitespace-pre-wrap break-words">
                            {message.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {isTyping[selectedPatient.socketId] && (
                  <div className="flex gap-3 items-center">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={selectedPatient.avatar} />
                      <AvatarFallback>{selectedPatient.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="bg-muted px-4 py-2 rounded-2xl">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t bg-card">
              <div className="flex gap-3 max-w-4xl mx-auto">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder={`Message ${selectedPatient.name}...`}
                  className="flex-1"
                />
                <Button onClick={handleSend} disabled={!input.trim()} size="icon">
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center">
            <div>
              <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h2 className="text-2xl font-bold mb-2">Select a Patient</h2>
              <p className="text-muted-foreground">
                Choose a patient from the sidebar to start chatting
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
