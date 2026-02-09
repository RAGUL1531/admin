import { useState } from "react";
import { chatMessages } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot, User, Stethoscope } from "lucide-react";
import type { ChatMessage } from "@/types/healthcare";

const senderConfig = {
  doctor: { icon: Stethoscope, label: "Doctor", bubbleClass: "bg-primary text-primary-foreground ml-auto", align: "justify-end" as const },
  patient: { icon: User, label: "Patient", bubbleClass: "bg-card border", align: "justify-start" as const },
  ai: { icon: Bot, label: "AI Assistant", bubbleClass: "bg-info/10 border border-info/20 text-info", align: "justify-start" as const },
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>(chatMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: ChatMessage = {
      id: `M${messages.length + 1}`,
      sender: "doctor",
      senderName: "Dr. Rajesh Patel",
      message: input,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages(prev => [...prev, newMsg]);
    setInput("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">Chat Console</h1>
        <p className="text-muted-foreground text-sm">Doctor–Patient communication with AI assistance</p>
      </div>

      <div className="bg-card rounded-xl border shadow-card flex flex-col" style={{ height: "calc(100vh - 220px)" }}>
        {/* Chat header */}
        <div className="flex items-center gap-3 p-4 border-b">
          <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold">AS</div>
          <div>
            <p className="font-semibold text-sm">Aarav Sharma</p>
            <p className="text-xs text-muted-foreground">Consultation C001 · Cardiology</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse-soft" />
            <span className="text-xs text-muted-foreground">Active</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m, i) => {
            const config = senderConfig[m.sender];
            const Icon = config.icon;
            return (
              <div key={m.id} className={cn("flex gap-2 max-w-[85%] animate-fade-in", config.align, m.sender === "doctor" && "ml-auto")} style={{ animationDelay: `${i * 40}ms` }}>
                {m.sender !== "doctor" && (
                  <div className={cn("h-7 w-7 rounded-full flex items-center justify-center shrink-0 mt-1", m.sender === "ai" ? "bg-info/10 text-info" : "bg-muted")}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                )}
                <div className={cn("rounded-xl px-3.5 py-2.5 text-sm shadow-sm", config.bubbleClass)}>
                  {m.sender === "ai" && <p className="text-[10px] font-semibold uppercase tracking-wider mb-1 opacity-70">AI Insight</p>}
                  <p className="leading-relaxed">{m.message}</p>
                  <p className={cn("text-[10px] mt-1.5", m.sender === "doctor" ? "opacity-70" : "text-muted-foreground")}>{m.timestamp}</p>
                </div>
                {m.sender === "doctor" && (
                  <div className="h-7 w-7 rounded-full gradient-primary flex items-center justify-center shrink-0 mt-1">
                    <Icon className="h-3.5 w-3.5 text-primary-foreground" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <form onSubmit={e => { e.preventDefault(); handleSend(); }} className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon" className="shrink-0 gradient-primary border-0">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
