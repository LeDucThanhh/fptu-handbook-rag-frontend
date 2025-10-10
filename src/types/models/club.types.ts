export interface ClubType {
  id: string;
  typeName: string;
  description: string;
}

export interface Club {
  id: string;
  clubName: string;
  description: string;
  logoUrl?: string;
  bannerUrl?: string;
  clubTypeId: string;
  clubType?: ClubType;
  contactEmail: string;
  contactPhone?: string;
  isRecruiting: boolean;
  isActive: boolean;
  coordinatorId: string;
  memberCount: number;
  foundedDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClubActivity {
  id: string;
  clubId: string;
  club?: Club;
  activityName: string;
  description: string;
  activityDate: string;
  location: string;
  imageUrl?: string;
  maxParticipants?: number;
  currentParticipants: number;
  status: "draft" | "pending" | "published" | "cancelled" | "completed";
  isPublic: boolean;
  createdBy: string;
  approvedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClubMember {
  id: string;
  clubId: string;
  userId: string;
  role: "member" | "leader" | "coordinator";
  joinedAt: string;
}
