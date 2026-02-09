import type { Patient, Doctor, Consultation, ChatMessage, AIInsight } from "@/types/healthcare";

export const patients: Patient[] = [
  { id: "P001", name: "Aarav Sharma", email: "aarav@email.com", age: 34, gender: "Male", phone: "+91 98765 43210", consultationStatus: "Active", isActive: true, registeredAt: "2025-08-12", lastVisit: "2026-02-07", conditions: ["Hypertension"] },
  { id: "P002", name: "Priya Nair", email: "priya@email.com", age: 28, gender: "Female", phone: "+91 87654 32109", consultationStatus: "Pending", isActive: true, registeredAt: "2025-10-05", lastVisit: "2026-02-05", conditions: ["Migraine", "Anxiety"] },
  { id: "P003", name: "Ravi Kumar", email: "ravi@email.com", age: 52, gender: "Male", phone: "+91 76543 21098", consultationStatus: "Completed", isActive: false, registeredAt: "2025-06-22", lastVisit: "2026-01-20", conditions: ["Diabetes Type 2"] },
  { id: "P004", name: "Sneha Gupta", email: "sneha@email.com", age: 41, gender: "Female", phone: "+91 65432 10987", consultationStatus: "Active", isActive: true, registeredAt: "2025-11-14", lastVisit: "2026-02-08", conditions: ["Asthma"] },
  { id: "P005", name: "Karthik Reddy", email: "karthik@email.com", age: 29, gender: "Male", phone: "+91 54321 09876", consultationStatus: "Pending", isActive: true, registeredAt: "2026-01-03", lastVisit: "2026-02-06", conditions: ["Back Pain", "Insomnia"] },
  { id: "P006", name: "Divya Iyer", email: "divya@email.com", age: 36, gender: "Female", phone: "+91 43210 98765", consultationStatus: "Completed", isActive: true, registeredAt: "2025-09-18", lastVisit: "2026-01-30", conditions: ["Thyroid"] },
  { id: "P007", name: "Arjun Menon", email: "arjun@email.com", age: 47, gender: "Male", phone: "+91 32109 87654", consultationStatus: "Active", isActive: true, registeredAt: "2025-07-01", lastVisit: "2026-02-09", conditions: ["Cardiac Arrhythmia"] },
  { id: "P008", name: "Meera Joshi", email: "meera@email.com", age: 23, gender: "Female", phone: "+91 21098 76543", consultationStatus: "Pending", isActive: false, registeredAt: "2026-01-20", lastVisit: "2026-02-01", conditions: ["Allergies"] },
];

export const doctors: Doctor[] = [
  { id: "D001", name: "Dr. Rajesh Patel", specialty: "Cardiology", experience: 15, availability: "Available", rating: 4.8, reviewCount: 234, isEnabled: true, avatar: "", email: "rajesh@hospital.com", patients: 48 },
  { id: "D002", name: "Dr. Ananya Das", specialty: "Neurology", experience: 10, availability: "Busy", rating: 4.6, reviewCount: 178, isEnabled: true, avatar: "", email: "ananya@hospital.com", patients: 35 },
  { id: "D003", name: "Dr. Vikram Singh", specialty: "General Medicine", experience: 20, availability: "Available", rating: 4.9, reviewCount: 412, isEnabled: true, avatar: "", email: "vikram@hospital.com", patients: 62 },
  { id: "D004", name: "Dr. Lakshmi Rao", specialty: "Endocrinology", experience: 8, availability: "Offline", rating: 4.5, reviewCount: 96, isEnabled: false, avatar: "", email: "lakshmi@hospital.com", patients: 22 },
  { id: "D005", name: "Dr. Suresh Menon", specialty: "Pulmonology", experience: 12, availability: "Available", rating: 4.7, reviewCount: 185, isEnabled: true, avatar: "", email: "suresh@hospital.com", patients: 40 },
  { id: "D006", name: "Dr. Kavitha Nair", specialty: "Psychiatry", experience: 7, availability: "Busy", rating: 4.4, reviewCount: 122, isEnabled: true, avatar: "", email: "kavitha@hospital.com", patients: 30 },
];

export const consultations: Consultation[] = [
  { id: "C001", patientName: "Aarav Sharma", doctorName: "Dr. Rajesh Patel", status: "In Progress", symptoms: ["Chest pain", "Shortness of breath"], notes: "Patient reports intermittent chest discomfort for 2 weeks.", scheduledAt: "2026-02-09 10:00 AM", duration: "30 min", aiSuggestion: "Possible cardiac evaluation needed" },
  { id: "C002", patientName: "Priya Nair", doctorName: "Dr. Ananya Das", status: "Scheduled", symptoms: ["Severe headache", "Nausea", "Light sensitivity"], notes: "Recurring migraine episodes, increasing frequency.", scheduledAt: "2026-02-09 02:00 PM", aiSuggestion: "Neurological assessment recommended" },
  { id: "C003", patientName: "Ravi Kumar", doctorName: "Dr. Lakshmi Rao", status: "Completed", symptoms: ["Increased thirst", "Frequent urination", "Fatigue"], notes: "HbA1c levels reviewed. Medication adjusted.", scheduledAt: "2026-02-08 11:00 AM", duration: "25 min" },
  { id: "C004", patientName: "Sneha Gupta", doctorName: "Dr. Suresh Menon", status: "In Progress", symptoms: ["Wheezing", "Coughing at night"], notes: "Asthma flare-up. Reviewing inhaler efficacy.", scheduledAt: "2026-02-09 11:30 AM", duration: "20 min", aiSuggestion: "Pulmonary function test suggested" },
  { id: "C005", patientName: "Karthik Reddy", doctorName: "Dr. Vikram Singh", status: "Scheduled", symptoms: ["Lower back pain", "Sleep difficulty"], notes: "Pain persisting for 3 months. Initial assessment.", scheduledAt: "2026-02-10 09:00 AM" },
  { id: "C006", patientName: "Arjun Menon", doctorName: "Dr. Rajesh Patel", status: "Scheduled", symptoms: ["Irregular heartbeat", "Dizziness"], notes: "Follow-up for arrhythmia monitoring.", scheduledAt: "2026-02-10 03:00 PM", aiSuggestion: "ECG monitoring recommended" },
  { id: "C007", patientName: "Divya Iyer", doctorName: "Dr. Lakshmi Rao", status: "Completed", symptoms: ["Weight gain", "Fatigue", "Cold sensitivity"], notes: "Thyroid levels normalized with medication.", scheduledAt: "2026-02-07 10:30 AM", duration: "20 min" },
  { id: "C008", patientName: "Meera Joshi", doctorName: "Dr. Kavitha Nair", status: "Cancelled", symptoms: ["Sneezing", "Skin rash"], notes: "Patient cancelled due to travel.", scheduledAt: "2026-02-08 04:00 PM" },
];

export const chatMessages: ChatMessage[] = [
  { id: "M001", sender: "patient", senderName: "Aarav Sharma", message: "Doctor, I've been experiencing chest tightness especially in the mornings.", timestamp: "10:02 AM" },
  { id: "M002", sender: "ai", senderName: "AI Assistant", message: "Based on the reported symptom of chest tightness, possible conditions include: Angina, Costochondritis, or Anxiety-related chest pain. Recommended specialty: Cardiology. Confidence: 87%.", timestamp: "10:02 AM" },
  { id: "M003", sender: "doctor", senderName: "Dr. Rajesh Patel", message: "Thank you for sharing that, Aarav. How long has this been going on? Do you feel it more during physical activity or at rest?", timestamp: "10:03 AM" },
  { id: "M004", sender: "patient", senderName: "Aarav Sharma", message: "It's been about 2 weeks now. I notice it more when I climb stairs or walk quickly.", timestamp: "10:04 AM" },
  { id: "M005", sender: "ai", senderName: "AI Assistant", message: "Symptom correlation update: Exertion-related chest tightness for 2 weeks increases probability of cardiac involvement. Recommend ECG and stress test evaluation.", timestamp: "10:04 AM" },
  { id: "M006", sender: "doctor", senderName: "Dr. Rajesh Patel", message: "I see. Given the exertion-related nature, I'd recommend we do an ECG and possibly a stress test. I'll schedule these for you. In the meantime, please avoid strenuous activity.", timestamp: "10:06 AM" },
  { id: "M007", sender: "patient", senderName: "Aarav Sharma", message: "Thank you, Doctor. Should I be concerned about anything specific?", timestamp: "10:07 AM" },
  { id: "M008", sender: "doctor", senderName: "Dr. Rajesh Patel", message: "It's important we investigate thoroughly, but try not to worry. Many causes of chest tightness are very treatable. We'll have a clearer picture after the tests.", timestamp: "10:08 AM" },
];

export const aiInsights: AIInsight[] = [
  { symptom: "Chest pain + Shortness of breath", possibleConditions: ["Angina Pectoris", "Myocardial Infarction", "Pulmonary Embolism"], suggestedSpecialty: "Cardiology", suggestedDoctors: ["Dr. Rajesh Patel"], confidence: 87, urgencyLevel: "High" },
  { symptom: "Severe headache + Nausea + Light sensitivity", possibleConditions: ["Migraine with Aura", "Tension Headache", "Cluster Headache"], suggestedSpecialty: "Neurology", suggestedDoctors: ["Dr. Ananya Das"], confidence: 92, urgencyLevel: "Medium" },
  { symptom: "Wheezing + Nocturnal cough", possibleConditions: ["Bronchial Asthma", "COPD", "Allergic Bronchitis"], suggestedSpecialty: "Pulmonology", suggestedDoctors: ["Dr. Suresh Menon"], confidence: 89, urgencyLevel: "Medium" },
  { symptom: "Irregular heartbeat + Dizziness", possibleConditions: ["Atrial Fibrillation", "Supraventricular Tachycardia", "Vasovagal Syncope"], suggestedSpecialty: "Cardiology", suggestedDoctors: ["Dr. Rajesh Patel"], confidence: 84, urgencyLevel: "High" },
];

export const dashboardStats = {
  totalPatients: 1248,
  activeConsultations: 23,
  availableDoctors: 18,
  pendingRequests: 7,
  weeklyGrowth: { patients: 5.2, consultations: 12.8, satisfaction: 2.1 },
};
