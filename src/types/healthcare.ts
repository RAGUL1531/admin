export interface Patient {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  phone: string;
  consultationStatus: "Active" | "Completed" | "Pending";
  isActive: boolean;
  registeredAt: string;
  lastVisit: string;
  conditions: string[];
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  availability: "Available" | "Busy" | "Offline";
  rating: number;
  reviewCount: number;
  isEnabled: boolean;
  avatar: string;
  email: string;
  patients: number;
}

export interface Consultation {
  id: string;
  patientName: string;
  doctorName: string;
  status: "Scheduled" | "In Progress" | "Completed" | "Cancelled";
  symptoms: string[];
  notes: string;
  scheduledAt: string;
  duration?: string;
  aiSuggestion?: string;
}

export interface ChatMessage {
  id: string;
  sender: "doctor" | "patient" | "ai";
  senderName: string;
  message: string;
  timestamp: string;
}

export interface AIInsight {
  symptom: string;
  possibleConditions: string[];
  suggestedSpecialty: string;
  suggestedDoctors: string[];
  confidence: number;
  urgencyLevel: "Low" | "Medium" | "High";
}
